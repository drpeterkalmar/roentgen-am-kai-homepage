
import re
import html

html_path = r'd:\AI\Homepage\Bilder\Werbung\Webseite komplett-Röntgen & Radiologie in Graz - Röntgen am Kai in Graz (17.1.2026 11：14：50).html'

# Read with utf-8-sig or catch errors
try:
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
except UnicodeDecodeError:
    with open(html_path, 'r', encoding='latin-1') as f:
        content = f.read()

# Normalize content: unescape HTML entities and replace special chars
content = html.unescape(content)

# Get all base64 images
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

print(f"Total base64 images: {len(all_base64_imgs)}")

for title, key in services.items():
    # Search for the title, ignoring some characters like &nbsp; if they were there
    # or just looking for the main word
    main_word = title.split()[0]
    match = re.search(re.escape(main_word), content, re.IGNORECASE)
    
    if match:
        # Search for images in a large window around the title
        # In this specific Herold/SingleFile layout, the image often comes 
        # BEFORE the text in the same module
        start = max(0, match.start() - 3000)
        end = min(len(content), match.end() + 3000)
        context = content[start:end]
        
        # Check for image data
        img_matches = re.findall(r'data:image/[^;]+;base64,[^\"\s\)\',]+', context)
        found_indices = []
        for img_data in img_matches:
            try:
                idx = all_base64_imgs.index(img_data)
                found_indices.append(idx)
            except ValueError:
                pass
        
        # Also look for alt text near the title
        alts = re.findall(r'alt=\"([^\"]+)\"', context)
        
        print(f"Service: {title} -> Word '{main_word}' found. Indices near: {found_indices}. Alts: {alts}")
    else:
        print(f"Service: {title} -> Word '{main_word}' NOT found.")

# Let's also look for any LARGE images and their context
print("\nLargest images check:")
img_sizes = [(i, len(data)) for i, data in enumerate(all_base64_imgs)]
img_sizes.sort(key=lambda x: x[1], reverse=True)

for idx, size in img_sizes[:10]:
    img_data = all_base64_imgs[idx]
    pos = content.find(img_data)
    if pos != -1:
        # Get context
        start = max(0, pos - 500)
        end = min(len(content), pos + 500)
        context = content[start:end]
        text = re.sub(r'<[^>]+>', ' ', context)
        text = ' '.join(text.split())
        print(f"Img {idx} (Size {size}): Context: {text[:200]}...")
