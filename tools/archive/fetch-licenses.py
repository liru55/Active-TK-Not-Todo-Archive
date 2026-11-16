# SPDX-License-Identifier: MIT
"""Fetch verbatim upstream notices without relicensing archived content."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import urlopen
import hashlib
import json

ROOT = Path(__file__).resolve().parents[2]
SOURCES = {
    "AGPL-3.0.txt": "https://www.gnu.org/licenses/agpl-3.0.txt",
    "Apache-2.0.txt": "https://www.apache.org/licenses/LICENSE-2.0.txt",
    "tailwindcss-3.4.3-MIT.txt": "https://raw.githubusercontent.com/tailwindlabs/tailwindcss/v3.4.3/LICENSE",
    "highlightjs-11.6.0-BSD-3-Clause.txt": "https://raw.githubusercontent.com/highlightjs/highlight.js/11.6.0/LICENSE",
    "marked-8.0.1-MIT.md": "https://raw.githubusercontent.com/markedjs/marked/v8.0.1/LICENSE.md",
    "glightbox-MIT.txt": "https://raw.githubusercontent.com/biati-digital/glightbox/master/LICENSE.md",
    "fontawesome-6.3.0.txt": "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.3.0/LICENSE.txt",
    "ruffle-MIT-OR-Apache-2.0.md": "https://raw.githubusercontent.com/ruffle-rs/ruffle/master/LICENSE.md",
    "es6-promise-MIT.txt": "https://raw.githubusercontent.com/stefanpenner/es6-promise/v4.2.5/LICENSE",
    "platformjs-1.3.6-MIT.txt": "https://raw.githubusercontent.com/bestiejs/platform.js/1.3.6/LICENSE",
    "jquery-cookie-1.4.1-MIT.txt": "https://raw.githubusercontent.com/carhartl/jquery-cookie/v1.4.1/MIT-LICENSE.txt",
}

def fetch(item):
    name, url = item
    try:
        with urlopen(url, timeout=25) as response:
            data = response.read()
        assert len(data) > 100 and b"<html" not in data[:100].lower()
        folder = ROOT / "LICENSES"
        folder.mkdir(exist_ok=True)
        (folder / name).write_bytes(data)
        return name, {"source": url, "sha256": hashlib.sha256(data).hexdigest()}
    except Exception as exc:
        print(f"FAILED {name}: {exc}")
        return name, {"source": url, "error": str(exc)}

if __name__ == "__main__":
    with ThreadPoolExecutor(max_workers=5) as pool:
        results = dict(pool.map(fetch, SOURCES.items()))
    (ROOT / "LICENSES" / "sources.json").write_text(
        json.dumps(results, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Downloaded {sum('sha256' in v for v in results.values())}/{len(results)} notices")
