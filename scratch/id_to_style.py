
import re
import html

html_path = r'd:\AI\Homepage\Bilder\Werbung\Webseite komplett-Röntgen & Radiologie in Graz - Röntgen am Kai in Graz (17.1.2026 11：14：50).html'

with open(html_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

services = [
    'Digitales Röntgen',
    'Ultraschall',
    'Mammographie',
    'Knochendichte',
    'Körperfettmessung',
    'Phlebographie',
    'DVT'
]

# Get all base64 images
all_base64_imgs = re.findall(r'data:image/[^;]+;base64,[^\"\s\)\',]+', content)

for service in services:
    print(f"--- Investigating {service} ---")
    match = re.search(re.escape(service), content, re.IGNORECASE)
    if match:
        # Search backwards for the nearest ID
        # Modules usually look like: <div id="c7314" ...
        # and images are often in a sibling or parent.
        # Let's find IDs within 2000 chars before
        context_before = content[max(0, match.start() - 2000):match.start()]
        ids = re.findall(r'id=\"([cp]\d+)\"', context_before)
        if ids:
            # We take the most recent IDs
            unique_ids = list(dict.fromkeys(reversed(ids)))[:5]
            print(f"Potential Container IDs: {unique_ids}")
            
            for cid in unique_ids:
                # Search for this ID in style blocks or tags
                # Pattern: #cid{...background-image:url(...)
                style_match = re.search(f'#{cid}\s*{{[^}}]+background-image\s*:\s*url\((data:image/[^;]+;base64,[^\"\s\)\',]+)\)', content)
                if style_match:
                    img_data = style_match.group(1)
                    try:
                        idx = all_base64_imgs.index(img_data)
                        print(f"FOUND Image for {cid}: Index {idx}")
                    except ValueError:
                        print(f"FOUND Image for {cid} but not in main list.")
        else:
            print("No container IDs found nearby.")
    else:
        print("Service name not found.")
    print("\n")
