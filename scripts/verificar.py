#!/usr/bin/env python3
"""Verificações estáticas sem instalar dependências. Não substitui teste em navegador."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import re

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.ids = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if 'id' in attrs:
            self.ids.append(attrs['id'])

def verify(root=ROOT):
    errors = []
    count = 0
    for file in root.glob('*.html'):
        html = file.read_text()
        page = Page(); page.feed(html)
        if len(page.ids) != len(set(page.ids)):
            errors.append(f'{file.name}: IDs duplicados')
        if sum(tag == 'h1' for tag, _ in page.tags) != 1:
            errors.append(f'{file.name}: esperado um h1')
        for tag, attrs in page.tags:
            if tag == 'img' and not all(k in attrs for k in ['alt','width','height']):
                errors.append(f'{file.name}: imagem sem alt/dimensões')
            if attrs.get('target') == '_blank' and not {'noopener','noreferrer'}.issubset(set(attrs.get('rel','').split())):
                errors.append(f'{file.name}: link externo sem proteção')
            for key in ['href','src']:
                if key not in attrs:
                    continue
                value = attrs[key]; parsed = urlsplit(value)
                if parsed.scheme or parsed.netloc:
                    continue
                target = root / unquote(parsed.path) if parsed.path else file
                if not target.exists():
                    errors.append(f'{file.name}: arquivo ausente {value}')
                if parsed.fragment and target.suffix == '.html':
                    other = Page(); other.feed(target.read_text())
                    if parsed.fragment not in other.ids:
                        errors.append(f'{file.name}: âncora ausente {value}')
                count += 1
        if re.search(r'(?:C:\\|/workspace/|localhost|data:image)', html):
            errors.append(f'{file.name}: caminho de ambiente local ou Base64')
        for data in re.findall(r'<script type="application/ld\+json">(.*?)</script>',html,re.S):
            json.loads(data)
    html = (root/'index.html').read_text()
    page = Page(); page.feed(html)
    before_offer = re.split(r'<section(?=[^>]*\bid="oferta")[^>]*>', html, maxsplit=1)[0]
    if re.search(r'R\$|147,00|47,00', before_offer):
        errors.append('Preço do produto antes do pitch')
    for tag, attrs in page.tags:
        if attrs.get('data-track') == 'cta_offer' and attrs.get('href') != '#oferta':
            errors.append('CTA intermediário fora da oferta')
    if '<iframe' in before_offer:
        errors.append('Iframe carregado antes do clique')
    css = (root/'styles.css').read_text()
    if css.count('{') != css.count('}'):
        errors.append('Chaves CSS inconsistentes')
    for value in re.findall(r'url\([\'"]?([^\)\'\"]+)',css):
        if not (root/value).is_file():
            errors.append(f'Recurso CSS ausente: {value}')
        count += 1
    if 'prefers-reduced-motion' not in css:
        errors.append('Falta reduced-motion')
    print(f'{count} referências/âncoras locais verificadas; 3 documentos HTML; CSS e JSON-LD verificados.')
    if errors:
        raise SystemExit('\n'.join(errors))
    print('OK. Esta verificação é estática, sem renderização em navegador.')

if __name__ == '__main__':
    verify()
