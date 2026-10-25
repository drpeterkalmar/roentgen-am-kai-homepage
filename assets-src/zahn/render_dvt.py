# Blender-Szene „DVT-Volumen“ für die Erklärgrafik A006 (/zahnroentgen-dvt-graz).
# Schematisch, keine Patientendaten: Ober- und Unterkiefer mit je 16 Zähnen (inkl. Weisheitszähne), durchscheinender
# Kieferknochen, Nervenkanal (Markenrot hell), Messfeld als Drahtwürfel.
# Aufruf:  /Applications/Blender.app/Contents/MacOS/Blender -b -P assets-src/zahn/render_dvt.py -- <ausgabe.png> [samples]
# Danach:  npm run images:zahn  (AVIF/WebP für die Website)
import math
import sys

import bmesh
import bpy
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = argv[0] if argv else '/tmp/dvt-volumen.png'
SAMPLES = int(argv[1]) if len(argv) > 1 else 128
RES = (1600, 900)
MM = 0.1  # 1 mm = 0,1 Blender-Einheiten
OPEN = 4.0  # halbe Mundöffnung (mm): Bissblock wie bei der DVT, trennt Ober- und Unterkiefer im Bild

# ───────────────────────────── Zahnmaße (wie dentalArt.js) ─────────────────────────────
TYPES = ['i', 'i', 'c', 'p', 'p', 'm', 'm', 'm']
WIDTH = {'upper': [8.6, 6.6, 7.6, 7, 6.6, 10.2, 9.2, 8.6], 'lower': [5.4, 5.9, 6.9, 7, 7.1, 11.2, 10.5, 10]}
DEPTH = {'i': 6.6, 'c': 8, 'p': 9, 'm': 10.6}
CROWN = {'i': 10, 'c': 10.5, 'p': 8, 'm': 7}
ROOT = {'i': 13, 'c': 16, 'p': 14, 'm': 12.5}
# Kronenform: Okklusalfläche/Schneidekante, Bauch, Hals (Breite, Tiefe relativ)
SHAPE = {
    'i': {'occ': (1.0, 0.36), 'belly': (1.0, 0.85), 'neck': (0.7, 0.72)},
    'c': {'occ': (0.4, 0.45), 'belly': (1.0, 0.95), 'neck': (0.68, 0.78)},
    'p': {'occ': (0.78, 0.8), 'belly': (1.0, 1.0), 'neck': (0.72, 0.78)},
    'm': {'occ': (0.9, 0.88), 'belly': (1.0, 1.0), 'neck': (0.82, 0.84)},
}


def arch_line(W, D, back):
    """Zahnbogen (rechte Hälfte): Ellipsenviertel + gerades Stück nach hinten; Rückgabe at(s) und Länge."""
    p = [(W * math.sin(math.pi / 2 * i / 60), -D * (1 - math.cos(math.pi / 2 * i / 60))) for i in range(61)]
    p += [(W, -D - back * i / 10) for i in range(1, 11)]
    ln = [0.0]
    for i in range(1, len(p)):
        ln.append(ln[-1] + math.dist(p[i], p[i - 1]))

    def at(s):
        i = 1
        while i < len(ln) - 1 and ln[i] < s:
            i += 1
        t = (s - ln[i - 1]) / (ln[i] - ln[i - 1])
        (x0, z0), (x1, z1) = p[i - 1], p[i]
        n = math.hypot(x1 - x0, z1 - z0)
        return x0 + (x1 - x0) * t, z0 + (z1 - z0) * t, (x1 - x0) / n, (z1 - z0) / n

    return at, ln[-1]


ARCH = {'upper': arch_line(25.5, 30, 20), 'lower': arch_line(23.5, 28, 22)}


def on_arch(jaw, side, s, o=0.0):
    """Punkt + Tangente + Außennormale in Blender-Koordinaten (X rechts, Y nach hinten, Z oben), in mm."""
    at, _ = ARCH[jaw]
    x, z, tx, tz = at(s)
    px, pz = side * (x - tz * o), z + tx * o
    t = Vector((side * tx, -tz, 0)).normalized()
    nout = Vector((side * -tz, -tx, 0)).normalized()  # nach außen (bukkal)
    return Vector((px, -pz, 0)), t, nout


# ───────────────────────────── Szene leeren ─────────────────────────────
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene


def link(obj):
    scene.collection.objects.link(obj)
    return obj


def mesh_from_rings(name, rings, cap_start=True, cap_end=True, start_center=None):
    """Ringe gleicher Punktzahl zu einem geschlossenen Schlauch verbinden (Kontrollkäfig für Subdivision).
    start_center: Mittelpunkt der Startkappe (Fächer statt N-Eck, z. B. Fissur einer Molarenkrone)."""
    bm = bmesh.new()
    vs = [[bm.verts.new(p) for p in ring] for ring in rings]
    n = len(rings[0])
    for a, b in zip(vs, vs[1:]):
        for i in range(n):
            bm.faces.new((a[i], a[(i + 1) % n], b[(i + 1) % n], b[i]))
    if cap_start and start_center is not None:
        cv = bm.verts.new(start_center)
        for i in range(n):
            bm.faces.new((vs[0][(i + 1) % n], vs[0][i], cv))
    elif cap_start:
        bm.faces.new(list(reversed(vs[0])))
    if cap_end:
        bm.faces.new(vs[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    obj = link(bpy.data.objects.new(name, me))
    for poly in me.polygons:
        poly.use_smooth = True
    return obj


def subdivide(obj, levels=2):
    m = obj.modifiers.new('sub', 'SUBSURF')
    m.levels = levels
    m.render_levels = levels
    return obj


RING = [(1, 0.45), (0.5, 1), (-0.5, 1), (-1, 0.45), (-1, -0.45), (-0.5, -1), (0.5, -1), (1, -0.45)]


def ring(c, t, n, w, d, z, lift=None):
    """8-Punkte-Ring (abgerundetes Rechteck) um c, Breite w entlang t, Tiefe d entlang n, Höhe z (mm).
    lift: je Punkt zusätzliche Höhe (Höcker)."""
    lift = lift or [0] * 8
    return [(c + t * (a * w / 2) + n * (b * d / 2) + Vector((0, 0, z + lift[k]))) * MM for k, (a, b) in enumerate(RING)]


# Höcker je Zahntyp (Hebung der Punkte des Okklusalrings, mm) und Lage der Fissur (Mitte, relativ)
CUSPS = {
    'i': [0] * 8,
    'c': [0] * 8,
    'p': [0, 1.4, 1.4, 0, 0, 1.0, 1.0, 0],
    'm': [1.6, 0.3, 0.3, 1.6, 1.5, 0.3, 0.3, 1.5],
}
FISSURE = {'i': 0.0, 'c': 1.8, 'p': -1.0, 'm': -1.4}


# ───────────────────────────── Materialien ─────────────────────────────
def mat_tooth(name, color, root=False):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    bsdf = nt.nodes['Principled BSDF']
    bsdf.inputs['Base Color'].default_value = (*color, 1)
    bsdf.inputs['Roughness'].default_value = 0.55 if not root else 0.65
    bsdf.inputs['Subsurface Weight'].default_value = 0.15
    bsdf.inputs['Coat Weight'].default_value = 0.0
    if root:
        # Wurzeln durchscheinend (liegen im Knochen)
        out = nt.nodes['Material Output']
        tr = nt.nodes.new('ShaderNodeBsdfTransparent')
        mix = nt.nodes.new('ShaderNodeMixShader')
        mix.inputs['Fac'].default_value = 0.55
        nt.links.new(tr.outputs[0], mix.inputs[1])
        nt.links.new(bsdf.outputs[0], mix.inputs[2])
        nt.links.new(mix.outputs[0], out.inputs['Surface'])
    return m


def mat_xray(name, color, base=0.04, rim=0.55, strength=1.0):
    """Röntgen-/Volumen-Look: Kanten leuchten, Flächen zur Kamera hin fast durchsichtig."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    lw = nt.nodes.new('ShaderNodeLayerWeight')
    lw.inputs['Blend'].default_value = 0.3
    pw = nt.nodes.new('ShaderNodeMath')
    pw.operation = 'POWER'
    pw.inputs[1].default_value = 2.2
    mul = nt.nodes.new('ShaderNodeMath')
    mul.operation = 'MULTIPLY_ADD'
    mul.inputs[1].default_value = rim
    mul.inputs[2].default_value = base
    em = nt.nodes.new('ShaderNodeEmission')
    em.inputs['Color'].default_value = (*color, 1)
    em.inputs['Strength'].default_value = strength
    tr = nt.nodes.new('ShaderNodeBsdfTransparent')
    mix = nt.nodes.new('ShaderNodeMixShader')
    geo = nt.nodes.new('ShaderNodeNewGeometry')
    inv = nt.nodes.new('ShaderNodeMath')
    inv.operation = 'SUBTRACT'
    inv.inputs[0].default_value = 1.0
    front = nt.nodes.new('ShaderNodeMath')
    front.operation = 'MULTIPLY'
    nt.links.new(geo.outputs['Backfacing'], inv.inputs[1])
    nt.links.new(lw.outputs['Facing'], pw.inputs[0])
    nt.links.new(pw.outputs[0], mul.inputs[0])
    nt.links.new(mul.outputs[0], front.inputs[0])
    nt.links.new(inv.outputs[0], front.inputs[1])  # Rückseiten unsichtbar: keine Doppelwände
    nt.links.new(front.outputs[0], mix.inputs['Fac'])
    nt.links.new(tr.outputs[0], mix.inputs[1])
    nt.links.new(em.outputs[0], mix.inputs[2])
    nt.links.new(mix.outputs[0], out.inputs['Surface'])
    return m


def mat_emit(name, color, strength):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    em = nt.nodes.new('ShaderNodeEmission')
    em.inputs['Color'].default_value = (*color, 1)
    em.inputs['Strength'].default_value = strength
    nt.links.new(em.outputs[0], out.inputs['Surface'])
    return m


def srgb(h):
    h = h.lstrip('#')
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)


# Oberkiefer als „Geist“ im Röntgen-Look: der Unterkiefer mit Nervenkanal steht im Vordergrund, der Oberkiefer bleibt
# sichtbar, verdeckt aber nichts (sonst überlagern sich die beiden Zahnbögen in der Schrägansicht zu einem Knäuel)
M_CROWN_U = mat_xray('crown_upper', srgb('#f1f5f9'), base=0.1, rim=0.75, strength=1.3)
M_ROOT_U = mat_xray('root_upper', srgb('#cbd5e1'), base=0.04, rim=0.45, strength=1.0)
M_CROWN_L = mat_tooth('crown_lower', srgb('#f4efe6'))
M_ROOT = mat_tooth('root', srgb('#d9d2c3'), root=True)
M_BONE = mat_xray('bone', srgb('#dbe4ee'), base=0.09, rim=0.85, strength=1.5)
# Äste sind flache Platten: ohne etwas Grundhelligkeit wären sie von vorn fast unsichtbar (dunkle Fläche)
M_RAMUS = mat_xray('ramus', srgb('#dbe4ee'), base=0.14, rim=0.85, strength=1.5)
M_BONE_U = mat_xray('bone_upper', srgb('#cbd5e1'), base=0.0, rim=0.35, strength=0.8)
M_NERVE = mat_emit('nerve', srgb('#ef4444'), 1.3)
M_BOX = mat_emit('box', srgb('#64748b'), 0.35)


# ───────────────────────────── Zähne ─────────────────────────────
def build_teeth(jaw):
    s = 1 if jaw == 'upper' else -1  # Oberkiefer: Wurzeln nach oben
    _, total = ARCH[jaw]
    widths = WIDTH[jaw]
    gap = 0.45
    k = min(1.0, (total - 1) / (sum(widths) + gap * 8))
    for side in (-1, 1):
        pos = gap / 2
        for i, wmm in enumerate(widths):
            w = wmm * k
            c, t, n = on_arch(jaw, side, pos + w / 2)
            pos += w + gap
            ty = TYPES[i]
            d = DEPTH[ty] * (0.92 if jaw == 'lower' else 1)
            sh = SHAPE[ty]
            y0 = s * (OPEN + (1.0 if i == 7 else 0))
            hc = CROWN[ty] * 0.9
            yb = y0 + s * hc * 0.4
            yc = y0 + s * hc
            lift = [-s * v for v in CUSPS[ty]]  # Höcker zeigen zur Kauebene
            rings = [
                ring(c, t, n, w * sh['occ'][0], d * sh['occ'][1], y0, lift),
                ring(c, t, n, w * (sh['occ'][0] + sh['belly'][0]) / 2, d * (sh['occ'][1] + sh['belly'][1]) / 2, y0 + s * hc * 0.15),
                ring(c, t, n, w * sh['belly'][0], d * sh['belly'][1], yb),
                ring(c, t, n, w * (sh['belly'][0] + sh['neck'][0]) / 2, d * (sh['belly'][1] + sh['neck'][1]) / 2, y0 + s * hc * 0.72),
                ring(c, t, n, w * sh['neck'][0], d * sh['neck'][1], yc),
            ]
            center = (c + Vector((0, 0, y0 - s * FISSURE[ty]))) * MM
            crown = subdivide(mesh_from_rings(f'crown_{jaw}_{side}_{i}', rings, start_center=center), 1)
            crown.data.materials.append(M_CROWN_U if jaw == 'upper' else M_CROWN_L)
            # Wurzeln
            rl = ROOT[ty] * (0.72 if jaw == 'lower' else 0.78)
            if ty == 'm':
                offs = [(-0.27, 0.0, 0.92), (0.27, 0.0, 0.86)] + ([(0.0, -0.28, 1.0)] if jaw == 'upper' else [])
                rw, rd = w * 0.4, d * 0.5
            elif jaw == 'upper' and i == 3:
                offs = [(0.0, 0.2, 0.9), (0.0, -0.2, 0.9)]
                rw, rd = w * 0.55, d * 0.42
            else:
                offs = [(0.0, 0.0, 1.0)]
                rw, rd = w * sh['neck'][0] * 0.95, d * sh['neck'][1] * 0.95
            for j, (ot, on, lf) in enumerate(offs):
                cc = c + t * (ot * w) + n * (on * d)
                L = rl * lf
                rr = [
                    ring(cc, t, n, rw, rd, yc - s * 1.5),
                    ring(cc, t, n, rw * 0.9, rd * 0.92, yc + s * L * 0.35),
                    ring(cc, t, n, rw * 0.55, rd * 0.6, yc + s * L * 0.8),
                    ring(cc, t, n, rw * 0.2, rd * 0.22, yc + s * L),
                ]
                root = subdivide(mesh_from_rings(f'root_{jaw}_{side}_{i}_{j}', rr), 2)
                root.data.materials.append(M_ROOT_U if jaw == 'upper' else M_ROOT)


# Nur der Unterkiefer (häufigste DVT-Frage: Weisheitszahn und Nervenkanal); in der Schrägansicht würden sich die
# beiden Zahnbögen sonst überlagern. Ober- und Unterkiefer zusammen zeigt die 2D-Panoramagrafik daneben.
build_teeth('lower')


# ───────────────────────────── Knochen ─────────────────────────────
def sweep(name, jaw, profile, s_end, mat, levels=2):
    """Querschnitt (o = außen, y = Höhe in mm) entlang des Bogens von hinten links über vorn nach hinten rechts."""
    _, total = ARCH[jaw]
    rings = []
    samples = 26
    for side in (-1, 1):
        rng = range(samples, -1, -1) if side < 0 else range(1, samples + 1)
        for i in rng:
            sl = s_end * i / samples
            c, t, n = on_arch(jaw, side, sl)
            rings.append([(c + n * o + Vector((0, 0, y))) * MM for o, y in profile])
    obj = subdivide(mesh_from_rings(name, rings), levels)
    obj.data.materials.append(mat)
    return obj


_, LT = ARCH['lower']
_, UT = ARCH['upper']
# Unterkiefer-Körper: schmaler Alveolarkamm oben, breiter abgerundeter Unterrand
MAND_PROFILE = [(o, y - OPEN + 1) for o, y in [(4.6, -1.5), (6.6, -13), (6.9, -25), (5.0, -32.5), (-3.0, -32), (-5.2, -24), (-4.6, -11), (-3.0, -1.5)]]
sweep('mandible', 'lower', MAND_PROFILE, LT + 1, M_BONE)
MAX_PROFILE = [(o, y + OPEN - 1) for o, y in [(4.5, 1.5), (7.0, 10), (7.5, 19), (3.5, 22), (-3.0, 21), (-5.0, 13), (-4.5, 6), (-3.0, 1.5)]]


# Äste des Unterkiefers: Umriss als gefüllte 2D-Kurve, 7 mm dick extrudiert, Kanten abgerundet (Bevel) – so bleiben
# Gelenkkopf, Incisura, Coronoid und Kieferwinkel auch bei konkavem Umriss sauber
def ramus(side):
    from mathutils import Matrix

    c, t, n = on_arch('lower', side, LT, 1.0)
    # (Tiefe dz: positiv = nach vorn, y = Höhe) – Unterrand, Kieferwinkel, Hinterrand, Gelenkhals und -kopf,
    # Incisura, Processus coronoideus, Vorderrand
    outline = [(2, -31), (-2, -33.5), (-9, -34), (-16, -32.5), (-21, -29.5), (-23.5, -25), (-24, -17), (-23.5, -7),
               (-22.5, 3), (-22, 10), (-21.5, 14), (-24, 16.5), (-24.5, 19.5), (-22, 21.8), (-18.5, 21.8), (-16.5, 19.2),
               (-17, 16), (-16, 13), (-13, 10.5), (-10, 10), (-7.5, 12), (-5.5, 16), (-4, 18.8), (-2.5, 18.8),
               (-1.5, 16), (-0.5, 10), (0.5, 2), (1.5, -8), (2, -18)]
    cu = bpy.data.curves.new(f'ramus{side}', 'CURVE')
    cu.dimensions = '2D'
    cu.fill_mode = 'BOTH'
    cu.extrude = 1.4 * MM
    cu.bevel_depth = 2.1 * MM
    cu.bevel_resolution = 4
    sp = cu.splines.new('NURBS')  # glatter Umriss statt Ecken
    sp.points.add(len(outline) - 1)
    for i, (dz, y) in enumerate(outline):
        sp.points[i].co = (-dz * MM, (y - OPEN + 1) * MM, 0, 1)  # lokal: x = nach hinten, y = Höhe
    sp.use_cyclic_u = True
    sp.order_u = 3
    sp.resolution_u = 8
    obj = link(bpy.data.objects.new(f'ramus{side}', cu))
    # lokal x → Welt +Y (hinten), lokal y → Welt Z, lokal z (Dicke) → Welt X; leicht nach außen gekippt
    m = Matrix(((0, 0, 1, 0), (1, 0, 0, 0), (0, 1, 0, 0), (0, 0, 0, 1)))
    flare = Matrix.Rotation(math.radians(-7 * side), 4, 'Y')
    obj.matrix_world = Matrix.Translation(c * MM) @ flare @ m
    obj.data.materials.append(M_RAMUS)
    # in ein Netz umwandeln und Normalen nach außen richten (sonst greift der Rückseiten-Filter des Glasmaterials falsch)
    bpy.context.view_layer.objects.active = obj
    for o in bpy.context.view_layer.objects:
        o.select_set(o is obj)
    bpy.ops.object.convert(target='MESH')
    obj = bpy.context.active_object
    bm = bmesh.new()
    bm.from_mesh(obj.data)
    bmesh.ops.remove_doubles(bm, verts=bm.verts[:], dist=0.0001)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.to_mesh(obj.data)
    bm.free()
    for poly in obj.data.polygons:
        poly.use_smooth = True


ramus(-1)
ramus(1)


# ───────────────────────────── Nervenkanal ─────────────────────────────
def nerve(side):
    """Nervus alveolaris inferior: Foramen im Ast → unter den Wurzeln nach vorn → Austritt am Foramen mentale."""
    dy = -OPEN + 1
    c_end, _, _ = on_arch('lower', side, LT + 1.5, 0.0)
    pts = []
    for i in range(7):
        tt = i / 7
        pts.append(c_end + Vector((0, 1, 0)) * (14 - 14 * tt) + Vector((0, 0, dy - 6 - 18 * tt * tt)))
    for i in range(0, 17):
        tt = i / 16
        sl = LT - (LT - 33) * tt
        c, _, _ = on_arch('lower', side, sl, 0.3)
        pts.append(c + Vector((0, 0, dy - 24 - 2.0 * math.sin(math.pi * tt))))
    for sl, o, y in [(31.5, 1.2, -24.5), (30.0, 3.0, -22.4), (29.0, 4.8, -21.2), (28.5, 6.4, -20.8)]:
        c, _, _ = on_arch('lower', side, sl, o)
        pts.append(c + Vector((0, 0, dy + y)))
    cu = bpy.data.curves.new(f'nerve{side}', 'CURVE')
    cu.dimensions = '3D'
    cu.bevel_depth = 1.0 * MM
    cu.bevel_resolution = 4
    cu.use_fill_caps = True
    sp = cu.splines.new('NURBS')
    sp.points.add(len(pts) - 1)
    for i, p in enumerate(pts):
        sp.points[i].co = (*(p * MM), 1)
        # zum Foramen mentale hin dünner werdend
        sp.points[i].radius = 1.0 if i < len(pts) - 4 else 1.0 - 0.15 * (i - (len(pts) - 4))
    sp.use_endpoint_u = True
    sp.order_u = 4
    obj = link(bpy.data.objects.new(f'nerve{side}', cu))
    obj.data.materials.append(M_NERVE)
    # leuchtet, beleuchtet aber nichts (kein rosa Schimmer auf den Wurzeln)
    obj.visible_diffuse = False
    obj.visible_glossy = False
    obj.visible_transmission = False
    return obj


nerve(-1)
nerve(1)

# ───────────────────────────── Messfeld (Zylinder, wie das Aufnahmefeld einer DVT) ─────────────────────────────
FOV = {'r': 48, 'cy': 33, 'z0': -40, 'z1': 27}  # mm; cy = Mitte nach hinten (Blender +Y)
M_FOV = mat_xray('fov', srgb('#94a3b8'), base=0.0, rim=0.32, strength=0.8)
bpy.ops.mesh.primitive_cylinder_add(vertices=128, radius=FOV['r'] * MM, depth=(FOV['z1'] - FOV['z0']) * MM,
                                    location=(0, FOV['cy'] * MM, (FOV['z0'] + FOV['z1']) / 2 * MM), end_fill_type='NOTHING')
fov = bpy.context.active_object
for poly in fov.data.polygons:
    poly.use_smooth = True
fov.data.materials.append(M_FOV)
# oberer Rand nur zart (liegt in der Ansicht vor den Zahnkronen), unterer etwas deutlicher
for z, color, strength in ((FOV['z0'], '#64748b', 0.3), (FOV['z1'], '#cbd5e1', 0.22)):
    bpy.ops.curve.primitive_bezier_circle_add(radius=FOV['r'] * MM, location=(0, FOV['cy'] * MM, z * MM))
    circ = bpy.context.active_object
    circ.data.bevel_depth = 0.12 * MM
    circ.data.resolution_u = 32
    circ.data.materials.append(mat_emit(f'rim{z}', srgb(color), strength))

# ───────────────────────────── Licht, Kamera, Render ─────────────────────────────
world = bpy.data.worlds.new('w')
scene.world = world
world.use_nodes = True
world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.004, 0.006, 0.012, 1)
world.node_tree.nodes['Background'].inputs['Strength'].default_value = 1.0


def area(name, loc, energy, size, color=(1, 1, 1)):
    ld = bpy.data.lights.new(name, 'AREA')
    ld.energy = energy
    ld.size = size
    ld.color = color
    ob = link(bpy.data.objects.new(name, ld))
    ob.location = loc
    tc = ob.constraints.new('TRACK_TO')
    tc.target = target
    return ob


target = link(bpy.data.objects.new('target', None))
target.location = (0, 3.3, -0.8)
area('key', (-6, -7, 8), 900, 6)
area('fill', (8, -6, 1), 250, 8, (0.85, 0.9, 1))
area('rim', (4, 9, 6), 700, 5, (0.9, 0.95, 1))

cam_data = bpy.data.cameras.new('cam')
cam_data.lens = 50
cam_data.sensor_fit = 'HORIZONTAL'
cam = link(bpy.data.objects.new('cam', cam_data))
tc = cam.constraints.new('TRACK_TO')
tc.target = target
scene.camera = cam
scene.render.resolution_x, scene.render.resolution_y = RES

# Kamera auf einer Kugel um das Ziel: Azimut (von vorn nach rechts), Höhe; Abstand so, dass der Würfel mit Rand passt
from bpy_extras.object_utils import world_to_camera_view  # noqa: E402

AZ, EL = math.radians(40), math.radians(34)
corners = [Vector((FOV['r'] * math.cos(a), FOV['cy'] + FOV['r'] * math.sin(a), z)) * MM
           for a in [k * math.pi / 18 for k in range(36)] for z in (FOV['z0'], FOV['z1'])]


def place(dist):
    d = Vector((math.sin(AZ) * math.cos(EL), -math.cos(AZ) * math.cos(EL), math.sin(EL)))
    cam.location = target.location + d * dist
    bpy.context.view_layer.update()
    vs = [world_to_camera_view(scene, cam, c) for c in corners]
    return min(min(v.x, v.y, 1 - v.x, 1 - v.y) for v in vs), vs


lo, hi = 5.0, 60.0
for _ in range(40):  # Abstand halbieren, bis der knappste Würfelpunkt 5 % vom Rand liegt
    mid = (lo + hi) / 2
    m, _ = place(mid)
    lo, hi = (lo, mid) if m > 0.05 else (mid, hi)
m, vs = place(hi)
# Ziel so verschieben, dass der Würfel mittig sitzt
cx = (min(v.x for v in vs) + max(v.x for v in vs)) / 2
cy = (min(v.y for v in vs) + max(v.y for v in vs)) / 2
print('fit', round(hi, 2), round(m, 3), round(cx, 3), round(cy, 3))
cam_data.shift_x = (cx - 0.5)
cam_data.shift_y = (cy - 0.5) * RES[1] / RES[0]

scene.render.engine = 'CYCLES'
prefs = bpy.context.preferences.addons['cycles'].preferences
try:
    prefs.compute_device_type = 'METAL'
    prefs.get_devices()
    for dev in prefs.devices:
        dev.use = True
    scene.cycles.device = 'GPU'
except Exception as exc:  # CPU als Rückfall
    print('GPU nicht verfügbar:', exc)
scene.cycles.samples = SAMPLES
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 6
scene.cycles.transparent_max_bounces = 24
scene.render.film_transparent = True
scene.render.resolution_percentage = 100
scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = 'AgX - Medium High Contrast'
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
scene.render.filepath = OUT
bpy.ops.render.render(write_still=True)
print('OK', OUT)
