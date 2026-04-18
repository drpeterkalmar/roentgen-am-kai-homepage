import os
from PIL import Image

def convert_to_webp(directory):
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            if filename.lower().endswith('.webp'):
                continue
                
            file_path = os.path.join(directory, filename)
            base_name = os.path.splitext(filename)[0]
            webp_path = os.path.join(directory, base_name + '.webp')
            
            # Skip if webp already exists and is not smaller
            # Actually, let's just convert and overwrite if it helps
            try:
                with Image.open(file_path) as img:
                    # Convert to RGB if PNG with alpha or CMYK
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGBA")
                    else:
                        img = img.convert("RGB")
                    
                    img.save(webp_path, "WEBP", quality=85, method=6)
                    size_old = os.path.getsize(file_path)
                    size_new = os.path.getsize(webp_path)
                    print(f"Converted {filename}: {size_old/1024:.1f}KB -> {size_new/1024:.1f}KB (WebP)")
            except Exception as e:
                print(f"Failed to convert {filename}: {e}")

if __name__ == "__main__":
    target_dir = r"d:\AI\Homepage\public\assets\images"
    print(f"Starting conversion in {target_dir}...")
    convert_to_webp(target_dir)
    print("Done.")
