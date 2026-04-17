
import re

html_path = r'd:\AI\Homepage\Bilder\Werbung\Webseite komplett-Röntgen & Radiologie in Graz - Röntgen am Kai in Graz (17.1.2026 11：14：50).html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Get all base64 images to keep track of their index
all_base64_imgs = re.findall(r'data:image/[^;]+;base64,[^\"\s\)\',]+', content)

print(f"Total base64 images found: {len(all_base64_imgs)}")

indices_to_check = range(len(all_base64_imgs))
for idx in indices_to_check:
    img_data = all_base64_imgs[idx]
    # Find the position of this image data in the content
    # We use a literal search since img_data is a large base64 string
    pos = content.find(img_data)
    if pos != -1:
        start = max(0, pos - 1000)
        end = min(len(content), pos + 1000)
        context = content[start:end]
        # Remove the base64 data themselves to clean up the context
        clean_context = re.sub(r'data:image/[^;]+;base64,[^\"\s\)\',]+', '[IMAGE_DATA]', context)
        # Remove other HTML tags for readability
        text_context = re.sub(r'<[^>]+>', ' ', clean_context)
        # Collapse whitespace
        text_context = ' '.join(text_context.split())
        
        print(f"--- IMAGE {idx} CONTEXT ---")
        print(text_context[:400])
        print("\n")
