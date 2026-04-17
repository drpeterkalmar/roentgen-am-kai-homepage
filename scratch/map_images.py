
import re

html_path = r'd:\AI\Homepage\Bilder\Werbung\Webseite komplett-Röntgen & Radiologie in Graz - Röntgen am Kai in Graz (17.1.2026 11：14：50).html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find img tags and some context
# Since it might be one huge line, we search for img tags specifically
img_tags = re.finditer(r'<img[^>]+>', content)

print("Mapping Image tags to their attributes:")
for i, match in enumerate(img_tags):
    tag = match.group(0)
    alt = re.search(r'alt=\"([^\"]*)\"', tag)
    alt_text = alt.group(1) if alt else 'no-alt'
    
    # Get a bit of context around the tag (e.g. 100 chars before and after)
    start = max(0, match.start() - 200)
    end = min(len(content), match.end() + 200)
    context = content[start:end].replace('\n', ' ')
    
    print(f"Index {i}: Alt='{alt_text}', Tag={tag[:50]}...")
    # Optional: Look for class names or parent div ids in context
    if 'id=' in context:
        print(f"  Context ID check: {re.findall(r'id=\"([^\"]+)\"', context)}")
    print("-" * 20)
