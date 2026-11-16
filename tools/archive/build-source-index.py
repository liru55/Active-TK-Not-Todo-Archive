# SPDX-License-Identifier: MIT
"""Build a same-origin allowlist for the read-only source viewer."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[2]
TOP = ['index.html', 'source-viewer.html', 'source-viewer.css', 'source-viewer.js',
       'README.md', 'LICENSE', 'THIRD_PARTY_NOTICES.md', '.gitignore']
paths = [ROOT / p for p in TOP]
for folder in [next(ROOT.glob('*_files')), ROOT / 'LICENSES', ROOT / 'tools/archive']:
    paths.extend(p for p in folder.iterdir() if p.is_file() and p.suffix in
                 {'.html', '.css', '.js', '.mjs', '.py', '.json', '.md', '.txt'})
files = [{'path': p.relative_to(ROOT).as_posix(), 'size': p.stat().st_size}
         for p in sorted(set(paths), key=lambda p: (p.name != 'index.html', p.as_posix()))]
(ROOT / 'source-files.json').write_text(json.dumps({'files': files}, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Indexed {len(files)} text files')
