# SPDX-License-Identifier: MIT
"""Remove archived telemetry and embeds without rewriting article content."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]
ASSETS = next(ROOT.glob('*_files'))
REMOVED = {
    'athena.js', 'google-tag.js', 'cloudflare-beacon.js', 'v1.js',
    'widgets.js', 'widget_iframe.1227a5674072e080ffb1ba14ac0c1079.html',
    'archive-today.blocker.js',
}
UNLOADED = REMOVED | {'bundle-playback.js', 'wombat.js', 'ruffle.js'}

def clean_script(match):
    script = match.group(0)
    source = re.search(r'\bsrc\s*=\s*(["\'])(.*?)\1', script, re.I)
    if source and source.group(2).rsplit('/', 1)[-1] in UNLOADED:
        return ''
    if not source and re.search(r'archive_analytics|\bgtag\s*\(|adsbygoogle|__wm\.|window\.RufflePlayer', script):
        return ''
    return script

def main():
    page = ROOT / 'index.html'
    html = page.read_text(encoding='utf-8')
    html = re.sub(r'<!-- BEGIN WAYBACK TOOLBAR INSERT -->[\s\S]*?<!-- END WAYBACK TOOLBAR INSERT -->', '', html)
    html = re.sub(r'<script\b[^>]*>[\s\S]*?</script\s*>', clean_script, html, flags=re.I)
    html = re.sub(r'<noscript\b[^>]*>[\s\S]*?</noscript\s*>', '', html, flags=re.I)
    html = re.sub(r'<iframe\b[^>]*>[\s\S]*?</iframe\s*>', '', html, flags=re.I)
    html = re.sub(r'<ins\b[^>]*class=["\'][^"\']*adsbygoogle[^"\']*["\'][^>]*>[\s\S]*?</ins\s*>', '', html, flags=re.I)
    html = re.sub(r'<div\b[^>]*data-adring-widget=["\'][^"\']+["\'][^>]*>[\s\S]*?</div\s*>', '', html, flags=re.I)
    # The previous filename migration accidentally changed MIME attributes as well.
    html = html.replace('type="text/google-fonts.css"', 'type="text/css"')
    notice = (
        'これはActive-TK氏のホームページのアーカイブでありliru55とは無関係です。'
        'トラッカーは外してあります。 '
        '<a href="https://github.com/liru55/Active-TK-Not-Todo-Archive" '
        'style="color:#2457a6;text-decoration:underline;">ソースコードはこちら</a> / '
        '<a href="./source-viewer.html" style="color:#2457a6;text-decoration:underline;">ソースコードViewer</a>'
    )
    html, count = re.subn(r'(<header\b[^>]*id="archive-notice"[^>]*>)[\s\S]*?(</header>)', lambda m: m[1] + notice + m[2], html, count=1)
    assert count == 1
    policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'"
    meta = f'<meta http-equiv="Content-Security-Policy" content="{policy}">'
    html = re.sub(r'<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*>', '', html, flags=re.I)
    html = re.sub(r'<meta\b[^>]*name="referrer"[^>]*>', '', html, flags=re.I)
    html = html.replace('<head>', '<head>' + meta + '<meta name="referrer" content="no-referrer">', 1)
    page.write_text(html, encoding='utf-8')
    for name in REMOVED:
        target = ASSETS / name
        assert target.resolve().parent == ASSETS.resolve()
        if target.is_file():
            target.unlink()
    print('Removed telemetry, ads, social embeds and archive replay initialization; restricted automatic requests to this origin.')

if __name__ == '__main__':
    main()
