
import re

html_path = r'd:\AI\Homepage\Bilder\Werbung\Webseite komplett-Röntgen & Radiologie in Graz - Röntgen am Kai in Graz (17.1.2026 11：14：50).html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Get all base64 images to keep track of their index
all_base64_imgs = re.findall(r'data:image/[^;]+;base64,[^\"\s\)\',]+', content)

keywords = ['Röntgen', 'Ultraschall', 'Mammographie', 'Knochendichte', 'Phlebographie', 'Körperfettmessung', 'DVT']

print("Mapping keywords to image indices:")
for kw in keywords:
    # Use re.finditer to get all occurrences
    matches = list(re.finditer(kw, content))
    found_any = False
    for match in matches:
        # Search in a range around the keyword
        start = max(0, match.start() - 1000)
        end = min(len(content), match.end() + 1000)
        context = content[start:end]
        
        # Look for the data:image pattern in the context
        img_matches = re.findall(r'data:image/[^;]+;base64,[^\"\s\)\',]+', context)
        for img_data in img_matches:
            try:
                idx = all_base64_imgs.index(img_data)
                print(f"Keyword '{kw}' found near image index {idx}")
                found_any = True
            except ValueError:
                pass
    if not found_any:
        print(f"Keyword '{kw}' had no images nearby.")

# Special case for the hero section
hero_keywords = ['Herzlich willkommen', 'Fachinstitut']
for kw in hero_keywords:
    matches = list(re.finditer(kw, content))
    for match in matches:
        start = max(0, match.start() - 1500)
        end = min(len(content), match.end() + 1500)
        context = content[start:end]
        img_matches = re.findall(r'data:image/[^;]+;base64,[^\"\s\)\',]+', context)
        for img_data in img_matches:
            try:
                idx = all_base64_imgs.index(img_data)
                print(f"Hero Keyword '{kw}' found near image index {idx}")
            except ValueError:
                pass
