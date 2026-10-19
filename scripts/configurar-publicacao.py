#!/usr/bin/env python3
"""Configura metadados absolutos. Apenas biblioteca padrão do Python."""
import argparse
import re
from pathlib import Path
from urllib.parse import urlsplit

PLACEHOLDER = 'https://example.invalid/cocriando-em-7/'

def configure(root, base):
    parts = urlsplit(base)
    if parts.scheme != 'https' or not parts.netloc or parts.query or parts.fragment:
        raise ValueError('Informe a URL HTTPS completa da página, sem query ou fragmento.')
    if parts.hostname.endswith('.invalid') or parts.username or parts.password:
        raise ValueError('Informe um domínio público válido.')
    base = base.rstrip('/') + '/'
    index = root / 'index.html'
    current = re.search(r'<link rel="canonical" href="([^"]+)"', index.read_text()).group(1)
    for name in ['index.html', 'politica-de-privacidade.html', 'termos-de-uso.html', 'sitemap.xml', 'robots.txt']:
        path = root / name
        text = path.read_text()
        text = text.replace(current, base).replace(PLACEHOLDER, base)
        text = text.replace('content="noindex, follow"', 'content="index, follow"')
        if name == 'robots.txt':
            text = f'User-agent: *\nAllow: /\nSitemap: {base}sitemap.xml\n'
        path.write_text(text)
    print('Metadados configurados para:', base)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('url', help='Ex.: https://sua-conta.github.io/cocriando-em-7/')
    parser.add_argument('--root', default=str(Path(__file__).resolve().parents[1]))
    args = parser.parse_args()
    configure(Path(args.root), args.url)
