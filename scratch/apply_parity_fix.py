
import os
import shutil

source_dir = r'd:\AI\Homepage\src\assets\extracted'
target_dir = r'd:\AI\Homepage\public\assets\images'

mapping = {
    'logo.png': 'img_0.png',
    'hero-clinic.jpg': 'img_15.webp',
    'about-team.jpg': 'img_6.jpg',
    'roentgen.jpg': 'img_4.jpg',
    'ultraschall.jpg': 'img_5.jpg',
    'mammographie.webp': 'img_13.webp',
    'knochendichte.webp': 'img_8.jpg',
    'koerperfett.png': 'img_9.jpg',
    'phlebographie.webp': 'img_10.jpg',
    'dvt.webp': 'img_7.jpg'
}

for target_name, source_name in mapping.items():
    source_path = os.path.join(source_dir, source_name)
    target_path = os.path.join(target_dir, target_name)
    
    if os.path.exists(source_path):
        print(f"Moving {source_name} to {target_name}...")
        shutil.copy2(source_path, target_path)
    else:
        print(f"ERROR: Source file {source_name} not found!")

print("Parity correction complete.")
