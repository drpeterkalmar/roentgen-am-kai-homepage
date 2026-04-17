
import re
import html

html_path = r'd:\AI\Homepage\Bilder\Werbung\Webseite komplett-Röntgen & Radiologie in Graz - Röntgen am Kai in Graz (17.1.2026 11：14：50).html'

try:
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
except UnicodeDecodeError:
    with open(html_path, 'r', encoding='latin-1') as f:
        content = f.read()

content = html.unescape(content)

# All base64 images
all_base64_imgs = re.findall(r'data:image/[^;]+;base64,[^\"\s\)\',]+', content)

services = [
    'Digitales Röntgen',
    'Ultraschall',
    'Mammographie',
    'Knochendichte',
    'Körperfettmessung',
    'Phlebographie',
    'DVT'
]

print(f"Mapping Services to Images via Container tracking:")

for service in services:
    # 1. Find the service title text
    # It might have <span> or <a> around it
    # We look for the exact string
    service_match = re.search(re.escape(service), content)
    if not service_match:
        # Try finding partial name (e.g. Roentgen instead of Röntgen)
        service_match = re.search(service.split()[0], content, re.IGNORECASE)
    
    if service_match:
        # 2. Look backwards for the nearest container ID
        # In this type of HTML (Herold), modules often have id="cXXXX" or id="rXXXX"
        # and images are often in a sibling or parent div
        # We search a large window BEFORE the title
        window_start = max(0, service_match.start() - 3000)
        window_end = service_match.end() + 500
        window = content[window_start:window_end]
        
        # Look for the last background image URL before the title
        # Pattern: url(data:image/...)
        bg_imgs = re.findall(r'url\((data:image/[^;]+;base64,[^\"\s\)\',]+)\)', window)
        
        if bg_imgs:
            last_img = bg_imgs[-1]
            try:
                idx = all_base64_imgs.index(last_img)
                print(f"Service: {service} -> Found Background Image Index {idx}")
            except ValueError:
                print(f"Service: {service} -> Found Background Image but not in all_base64_imgs?")
        else:
            # Maybe it's an <img> tag?
            img_tags = re.findall(r'src=\"(data:image/[^;]+;base64,[^\"\s\)\',]+)\"', window)
            if img_tags:
                last_img = img_tags[-1]
                try:
                    idx = all_base64_imgs.index(last_img)
                    print(f"Service: {service} -> Found <img> Tag Index {idx}")
                except ValueError:
                    pass
            else:
                print(f"Service: {service} -> NO IMAGE FOUND in window.")
    else:
        print(f"Service: {service} -> TEXT NOT FOUND.")
