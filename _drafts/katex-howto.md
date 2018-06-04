---
layout: post
title: "Browser-side KaTeX rendering with Jekyll"
---

Math bloggers, you need not waste another minute on setting up LaTeX for your markdown posts.

I use the free hosting services of GitHub Pages, which can either serve your files as-is, or do the rendering for you in case you use Jekyll to give your site a unified look with minimal fuss.

The markdown engine _kramdown_ comes with built-in support for MathJax. That's neat, but quite slow in comparison with [KaTeX](https://khan.github.io/KaTeX/). Furthermore,

## Setting up browser-side KaTeX with Kramdown

If you use kramdown, i.e. your `_config.yml` contains a `markdown: kramdown` line, then add these lines:

```
kramdown:
  math_engine: nil
```

This turns off the pre-processing for MathJax.


KaTeX Auto-render extension:
https://github.com/Khan/KaTeX/blob/master/contrib/auto-render/README.md

{% raw %}
```
<script src="https://cdn.jsdelivr.net/npm/katex@0.10.0-alpha/dist/katex.min.js" integrity="sha384-y6SGsNt7yZECc4Pf86XmQhC4hG2wxL6Upkt9N1efhFxfh6wlxBH0mJiTE8XYclC1" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.10.0-alpha/dist/contrib/auto-render.min.js" integrity="sha384-IiI65aU9ZYub2MY9zhtKd1H2ps7xxf+eb2YFG9lX6uRqpXCvBTOidPRCXCrQ++Uc" crossorigin="anonymous"></script>

<script>
  document.addEventListener("DOMContentLoaded", function() {
      var macros_dict = {};
      var macros_list = [
        {% for x in page.katex.macros %}
           '{{x}}' {% if forloop.last == false %} , {% endif %}
        {% endfor %}
      ];
      for (var x of macros_list) {
          macros_dict[x.replace(/{"(.*)"=>"(.*)"}/, "$1")] =
                      x.replace(/{"(.*)"=>"(.*)"}/, "$2");
      }
      renderMathInElement(document.body, {
          colorIsTextColor: true,
          macros: macros_dict,
          delimiters: [
            {left: "((", right: "))", display: false},
            {left: "\\(", right: "\\)", display: false},
            {left: "$$", right: "$$", display: true},
            {left: "\\[", right: "\\]", display: true}
          ]
      });
</script>
```
{% endraw %}

## Optionally: Reducing the number of backslashes

Wrapping small inline blocks with `\\(` and `\\)` is quite annoying.

```ruby
require 'execjs'

# Original source: https://gist.github.com/jackwillis/e4842a6d6fbc6ed438e813d2d2753eb8

module Katex
  class << self
    JS_FILENAME = 'vendor/katex/katex.min.js'

    JS_CTX = ::ExecJS.compile(File.read(JS_FILENAME))

    INLINE_REGEX = /\\\((.*?)\\\)/m.freeze
    INLINE_REGEX_2 = /\$([\S]+)\$/m.freeze
    DISPLAY_REGEX = /\\\[(.*?)\\\]/m.freeze

    def process(url, text, macros)
      puts "Processing " + url

      text
        .gsub(INLINE_REGEX) { render_inline($1, macros) }
        .gsub(INLINE_REGEX_2) { render_inline($1, macros) }
        .gsub(DISPLAY_REGEX) { render_display($1, macros) }
    end

    def render_inline(text, macros)
      JS_CTX.call('katex.renderToString', text, macros: macros)
    end

    def render_display(text, macros)
      JS_CTX.call('katex.renderToString', text, macros: macros, displayMode: true)
    end

  end
end

pre_render_task = lambda { |doc, _|
  if !doc.data['katex_disabled'] || (doc.data['katex'] && !doc.data['katex']['disabled'])
    doc.content = Katex.process(doc.url, doc.content, (doc.data['katex'] && doc.data['katex']['macros']) || [])
  end
}

Jekyll::Hooks.register(:posts, :pre_render, &pre_render_task)
Jekyll::Hooks.register(:pages, :pre_render, &pre_render_task)
```

## Alternatively: Setting up server-side KaTeX with Kramdown

Kramdown supports server-side rendering with KaTeX out of the box; [link](https://kramdown.gettalong.org/math_engine/katex.html) to how to set it up.

https://docs.mathjax.org/en/latest/tex.html
