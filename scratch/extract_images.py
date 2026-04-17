
import base64
import os
import re

html_path = r'd:\AI\Homepage\Bilder\Werbung\Webseite komplett-Röntgen & Radiologie in Graz - Röntgen am Kai in Graz (17.1.2026 11：14：50).html'
output_dir = r'd:\AI\Homepage\src\assets\extracted'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

print("Opening original HTML file...")
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern for data:image/... base64
# SingleFile embeds images like: src="data:image/png;base64,..." or url("data:image/jpeg;base64,...")
pattern = re.compile(r'data:image/(?P<ext>png|jpeg|jpg|webp|gif|svg\+xml);base64,(?P<data>[^\"\'\)\s,]+)')

matches = list(pattern.finditer(content))
print(f"Found {len(matches)} images.")

for i, match in enumerate(matches):
    ext = match.group('ext')
    if ext == 'svg+xml':
        ext = 'svg'
    elif ext == 'jpeg':
        ext = 'jpg'
    
    data = match.group('data')
    try:
        binary_data = base64.b64decode(data)
        filename = f'img_{i}.{ext}'
        filepath = os.path.join(output_dir, filename)
        with open(filepath, 'wb') as out_f:
            out_f.write(binary_data)
        # print(f'Saved {filename}')
    except Exception as e:
        print(f'Error saving image {i}: {e}')

print(f"Extraction complete. Assets saved to {output_dir}")
