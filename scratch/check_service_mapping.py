
import re

html_path = r'd:\AI\Homepage\Bilder\Werbung\Webseite komplett-Röntgen & Radiologie in Graz - Röntgen am Kai in Graz (17.1.2026 11：14：50).html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Get all base64 images to keep track of their index
all_base64_imgs = re.findall(r'data:image/[^;]+;base64,[^\"\s\)\',]+', content)

services = {
    'Digitales Röntgen': 'roentgen',
    'Ultraschall': 'ultraschall',
    'Mammographie': 'mammographie',
    'Knochendichte': 'knochendichte',
    'Körperfettmessung': 'koerperfett',
    'Phlebographie': 'phlebographie',
    'DVT': 'dvt'
}

print("Searching for images inside service containers:")

for title, key in services.items():
    # Find the title first
    match = re.search(f'<{re.escape(title)}', content) # Many titles might be inside tags
    if not match:
        # Try finding as text
        match = re.search(re.escape(title), content)
    
    if match:
        # Search for the image inside the nearest parent container or specifically AFTER the title
        # In many designs, the image follows or precedes the heading in the same div
        start = max(0, match.start() - 2000)
        end = min(len(content), match.end() + 2000)
        context = content[start:end]
        
        # Find all images in this context
        img_matches = re.findall(r'data:image/[^;]+;base64,[^\"\s\)\',]+', context)
        found_indices = []
        for img_data in img_matches:
            try:
                idx = all_base64_imgs.index(img_data)
                found_indices.append(idx)
            except ValueError:
                pass
        print(f"Service: {title} ({key}) -> Likely indices: {found_indices}")

# Also check for specific alt texts if they exist
imgs_with_alt = re.findall(r'<img[^>]+alt=\"([^\"]+)\"[^>]+>', content)
print("\nImages with ALT text:")
for alt in imgs_with_alt:
    print(f"Alt: {alt}")
