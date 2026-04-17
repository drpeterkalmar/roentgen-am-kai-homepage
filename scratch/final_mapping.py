
import re
import html

html_path = r'd:\AI\Homepage\Bilder\Werbung\Webseite komplett-Röntgen & Radiologie in Graz - Röntgen am Kai in Graz (17.1.2026 11：14：50).html'

with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

services = {
    'Digitales Röntgen': 'roentgen',
    'Ultraschall': 'ultraschall',
    'Mammographie': 'mammographie',
    'Knochendichte': 'knochendichte',
    'Körperfettmessung': 'koerperfett',
    'Phlebographie': 'phlebographie',
    'DVT': 'dvt'
}

all_base64_imgs = re.findall(r'data:image/[^;]+;base64,[^\"\s\)\',]+', content)

print("Mapping results:")

for title, key in services.items():
    # Find title
    match = re.search(re.escape(title), content, re.IGNORECASE)
    if not match:
        # Try finding a fragment
        match = re.search(title.split()[0], content, re.IGNORECASE)
    
    if match:
        # Looking for the module container ID. Usually follows #rXXXX or #cXXXX
        # In Herold templates, the text is inside a module. 
        # Let's search a window around it for #cXXXX or #rXXXX strings in the style block
        # Actually, let's just find ALL background-images and see which one is closest to the title in the HTML structure
        
        # We find all occurrences of 'id="' near the title
        nearby_ids = re.findall(r'id=\"([cp]\d+)\"', content[max(0, match.start()-2000):match.end()+500])
        
        found = False
        for cid in reversed(nearby_ids):
            # Check if this ID has an image in the style block
            style_m = re.search(f'#{cid}\s*{{[^}}]*background-image\s*:\s*url\((data:image/[^;]+;base64,[^\"\s\)\',]+)\)', content)
            if style_m:
                img_data = style_m.group(1)
                try:
                    idx = all_base64_imgs.index(img_data)
                    print(f"{title} -> ID: {cid} -> Image Index: {idx}")
                    found = True
                    break
                except ValueError:
                    pass
        if not found:
            # Maybe it's an <img> tag?
            img_m = re.search(r'<img[^>]+src=\"(data:image/[^;]+;base64,[^\"\s\)\',]+)\"', content[max(0, match.start()-2000):match.end()+500])
            if img_m:
                img_data = img_m.group(1)
                try:
                    idx = all_base64_imgs.index(img_data)
                    print(f"{title} -> <img> Tag -> Image Index: {idx}")
                    found = True
                except ValueError:
                    pass
            else:
                print(f"{title} -> NO IMAGE DETECTED")
    else:
         print(f"{title} -> TITLE NOT FOUND")
