import glob, pathlib

# Verify the built Impressum chunk carries the new section
hits = []
for f in glob.glob('/Users/wohnzimmer/dev/roentgen-am-kai-homepage/dist/assets/ImpressumPage-*.js'):
    t = pathlib.Path(f).read_text(encoding='utf-8', errors='replace')
    hits.append((pathlib.Path(f).name, {
        'Offener Quellcode': t.count('Offener Quellcode'),
        'github.com/drpeterkalmar/roentgen-am-kai-homepage': t.count('github.com/drpeterkalmar/roentgen-am-kai-homepage'),
        'Baukasten': t.count('Baukasten'),
    }))
for name, counts in hits:
    print(name, counts)

# And confirm NO Apps-Script leftovers in the current build
bad = 0
for f in glob.glob('/Users/wohnzimmer/dev/roentgen-am-kai-homepage/dist/assets/*.js') + glob.glob('/Users/wohnzimmer/dev/roentgen-am-kai-homepage/dist/*.html'):
    t = pathlib.Path(f).read_text(encoding='utf-8', errors='replace')
    if 'script.google.com' in t:
        bad += 1
        print('LEFTOVER in', f)
print('script.google.com leftovers in dist:', bad)