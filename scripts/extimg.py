import re, shutil, base64, pathlib, sys
from urllib.parse import unquote

md_path = pathlib.Path(sys.argv[1])
attach = pathlib.Path(
    sys.argv[2] if len(sys.argv) > 2 else "~/Documents/obsidian/attachments"
).expanduser()

out = pathlib.Path("extracted_images")
out.mkdir(exist_ok=True)

text = md_path.read_text(encoding="utf-8")

# Matches ![[file.png]], ![[file.png|caption]], and ![caption](file.png)
pattern = re.compile(r'!\[\[([^\]|]+)(?:\|([^\]]*))?\]\]|!\[([^\]]*)\]\(([^)]+)\)')

def slug(s):
    return re.sub(r'[^a-zA-Z0-9]+', '-', s).strip('-').lower() or "image"

def find_file(ref):
    ref = unquote(ref)
    for base in (md_path.parent, attach):
        p = base / ref
        if p.exists():
            return p
    hits = list(attach.rglob(pathlib.Path(ref).name)) if attach.exists() else []
    return hits[0] if hits else None

if not attach.exists():
    print(f"WARNING: attachments folder not found: {attach}")

for i, m in enumerate(pattern.finditer(text), 1):
    if m.group(1):  # wikilink
        src, alt = m.group(1).strip(), (m.group(2) or "")
        if alt.isdigit():  # Obsidian uses |300 for width, not a caption
            alt = ""
    else:
        src, alt = m.group(4).split(' "')[0].strip(), m.group(3)
    alt = alt or pathlib.Path(src).stem
    name = f"{i:02d}_{slug(alt)}"

    if src.startswith("data:image"):
        header, data = src.split(",", 1)
        ext = header.split("/")[1].split(";")[0]
        (out / f"{name}.{ext}").write_bytes(base64.b64decode(data))
        print(f"{i:02d}: {alt} -> {name}.{ext}")
    elif src.startswith("http"):
        print(f"{i:02d}: SKIPPED (web URL) {src}")
    else:
        p = find_file(src)
        if p:
            shutil.copy(p, out / f"{name}{p.suffix}")
            print(f"{i:02d}: {alt} -> {name}{p.suffix}")
        else:
            print(f"{i:02d}: NOT FOUND {src}")