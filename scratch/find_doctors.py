
import re

html_path = r'd:\AI\Homepage\Bilder\Werbung\Webseite komplett-Röntgen & Radiologie in Graz - Röntgen am Kai in Graz (17.1.2026 11：14：50).html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Get all base64 images to keep track of their index
all_base64_imgs = re.findall(r'data:image/[^;]+;base64,[^\"\s\)\',]+', content)

doctors = ['Kalmar', 'Riegler']

for doc in doctors:
    matches = list(re.finditer(doc, content))
    for match in matches:
        # Search in a range around the name
        start = max(0, match.start() - 1000)
        end = min(len(content), match.end() + 1000)
        context = content[start:end]
        
        img_matches = re.findall(r'data:image/[^;]+;base64,[^\"\s\)\',]+', context)
        for img_data in img_matches:
            try:
                idx = all_base64_imgs.index(img_data)
                print(f"Doctor '{doc}' found near image index {idx}")
            except ValueError:
                pass
