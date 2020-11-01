#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from pathlib import Path

AUTHOR = 'Laszlo Treszkai'
SITENAME = 'Laszlo Treszkai'
SITEURL = ''

THEME = 'theme'

PATH_METADATA = r'posts/(?P<date>\d\d\d\d-\d\d-\d\d)/(?P<slug>.*)'

PATH = 'content'
ARTICLE_PATHS = ['posts']
ARTICLE_SAVE_AS = '{date:%Y/%m/%d}/{slug}.html'
ARTICLE_URL = '{date:%Y/%m/%d}/{slug}.html'
PAGE_PATHS = ['pages', 'legacy_redirects']

EXTRA_PATHS = ['extra']

STATIC_PATHS = ['posts', 'extra/CNAME']
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'}}

for path in Path(PATH).iterdir():
    content_path = str(path.relative_to(path))
    if content_path not in ARTICLE_PATHS + PAGE_PATHS + EXTRA_PATHS:
        STATIC_PATHS.append(content_path)

TIMEZONE = 'Europe/Paris'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (  # ('Pelican', 'https://getpelican.com/'),
    # ('Python.org', 'https://www.python.org/'),
    # ('Jinja2', 'https://palletsprojects.com/p/jinja/'),
    # ('You can modify those links in your config file', '#'),
)

# Social widget
SOCIAL = (
    ('github', 'https://github.com/treszkai'),
    ('twitter', 'https://twitter.com/ltreszkai'),
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True

LATEX_MACROS = {
    r'\RR': r'\mathbb{R}',
    r'\EE': r'\mathbb{E}',
    r'\parm': r'\textcolor{grey}{\bullet}',
    r'\indep': r'\perp\!\!\!\perp',
    r'\emptyset': r'\varnothing',
    r'\proves': r'\vdash',
    r'\Union': r'\bigcup',
    r'\Intersect': r'\bigcap',
    r'\grad': r'\nabla',
    r'\given': r'\,\vert\,',
    r'\Godel': r'\ulcorner #1 \urcorner',
}
