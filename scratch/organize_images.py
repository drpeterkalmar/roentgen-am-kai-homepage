
import os
import shutil

src_dir = r'd:\AI\Homepage\src\assets\extracted'
dst_dir = r'd:\AI\Homepage\public\assets\images'

if not os.path.exists(dst_dir):
    os.makedirs(dst_dir)

mapping = {
    'img_0.png': 'logo.png',
    'img_1.jpg': 'hero-clinic.jpg',
    'img_2.jpg': 'about-team.jpg',
    'img_10.jpg': 'roentgen.jpg',
    'img_11.jpg': 'ultraschall.jpg',
    'img_12.webp': 'mammographie.webp',
    'img_13.webp': 'knochendichte.webp',
    'img_14.webp': 'dvt.webp',
    'img_15.webp': 'phlebographie.webp',
    'img_3.png': 'koerperfett.png'
}

for src_name, dst_name in mapping.items():
    src_path = os.path.join(src_dir, src_name)
    dst_path = os.path.join(dst_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, dst_path)
        print(f'Copied {src_name} to {dst_name}')
    else:
        print(f'Warning: {src_path} not found')
