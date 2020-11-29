# What is this?

This is the repository of my website, [www.treszkai.com](www.treszkai.com).

The `source` branch contains the source files, and the `master` branch contains the generated site.

## How to use it

 - Generate (dev) website: `pelican content -t theme`
 - Generate production website: `inv preview`
 - Start a development webserver: `pelican --listen -p 8000`
 - ...with auto-reload: `pelican --listen -p 8000 -r`
 - Publish production website to GitHub: `inv publish`

## Thanks goes to

 - GitHub, for hosting it for free;
 - [Pelican](https://github.com/getpelican/pelican) developers, for the static site generator;
 - the Pelican theme developer.
