
import re

html_path = r'd:\AI\Homepage\Bilder\Werbung\Webseite komplett-Röntgen & Radiologie in Graz - Röntgen am Kai in Graz (17.1.2026 11：14：50).html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Social Links
social_patterns = [
    r'https?://(?:www\.)?instagram\.com/[^\s\"\'\>]+',
    r'https?://(?:www\.)?facebook\.com/[^\s\"\'\>]+',
    r'https?://(?:www\.)?linkedin\.com/[^\s\"\'\>]+'
]

print("--- Social Links ---")
for p in social_patterns:
    links = re.findall(p, content)
    if links:
        print(f"Found: {list(set(links))}")
    else:
        print(f"No links found for pattern: {p}")

# Impressum / Datenschutz hints
print("\n--- Legal Links ---")
legal = re.findall(r'href=\"([^\"]*(?:impressum|datenschutz|legal)[^\"]*)\"', content, re.I)
print(f"Found legal-ish links: {list(set(legal))}")

# Contact Info check
print("\n--- Contact Info ---")
emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', content)
print(f"Emails: {list(set(emails))}")
phones = re.findall(r'(?:\+43|0)[0-9\s/-/]{7,}', content)
print(f"Likely phones: {list(set(phones))[:5]}") # Limit to avoid noise
