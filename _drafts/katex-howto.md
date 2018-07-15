---
layout: post
title: "Browser-side KaTeX rendering with Jekyll"
latex_macros:
    → : \leftarrow
    '#': '^{(#1)}'
---

# Extra

$$\phi \proves \Godel{\phi}$$

            /* Removing comments is important because kramdown adds a
            TeX-commented CDATA wrapper to any math including the
            characters < and &. KaTeX unfortunately doesn't respect
            TeX-style comments (as MathJax does), so we need to help it
            out here.  The reason that kramdown needs to add a CDATA
            wrapper is that for some reason (idky) XHTML doesn't like '<'
            and '&' in a script tag unless there's a CDATA wrapper.  XHTML
            will see the wrapper because it doesn't respect TeX-style
            comments.  For more information see
            https://github.com/gettalong/kramdown/issues/292 and follow
            the links.
            Source: https://github.com/Khan/KaTeX/issues/681
            */

Dunno if I need innerHTML or textContent, tbh.

# TODO

Automatically Test if Katex runs okay, by either checking no javascript errors, or by putting a $$test$$ at the end of the document for testing.

# Main

Math bloggers, you need not waste another minute on setting up LaTeX for your markdown posts.

I use the free hosting services of GitHub Pages, which can either serve your files as-is, or do the rendering for you in case you use Jekyll to give your site a unified look with minimal fuss.

## Main problem

The markdown engine _kramdown_ comes with built-in support for MathJax. That's neat, but quite slow in comparison with [KaTeX](https://khan.github.io/KaTeX/).

## First: Setting up browser-side KaTeX with Kramdown

If you use kramdown, i.e. your `_config.yml` contains a `markdown: kramdown` line, then add these lines:

```
kramdown:
  math_engine: nil
```

This prevents wrapping the math blocks in a `<script type="math/tex">...</script>` block and instead wraps them in `<span class="kdmath">$...$</span>`.

## Problem with Kramdown + KaTeX

Kramdown treats only the text between $$ and $$ as math. ⇒ In Javascript, first replace every "$$" in a div-something with a "££", and use the auto-renderer accordingly. `#todo`


KaTeX Auto-render extension:
https://github.com/Khan/KaTeX/blob/master/contrib/auto-render/README.md

{% raw %}
```
<script src="https://cdn.jsdelivr.net/npm/katex@0.10.0-alpha/dist/katex.min.js" integrity="sha384-y6SGsNt7yZECc4Pf86XmQhC4hG2wxL6Upkt9N1efhFxfh6wlxBH0mJiTE8XYclC1" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.10.0-alpha/dist/contrib/auto-render.min.js" integrity="sha384-IiI65aU9ZYub2MY9zhtKd1H2ps7xxf+eb2YFG9lX6uRqpXCvBTOidPRCXCrQ++Uc" crossorigin="anonymous"></script>

<script>
  document.addEventListener("DOMContentLoaded", function() {
      var macros_dict = { {% for x in site.latex_macros %}
          "{{ x[0] | replace: '\', '\\\\' }}": "{{ x[1] | replace: '\', '\\\\' }}" {% if forloop.last == false %} , {% endif %} {% endfor %}
          {% for x in page.latex_macros %} {% if forloop.first == true %} , {% endif %}
          "{{ x[0] | replace: '\', '\\\\' }}": "{{ x[1] | replace: '\', '\\\\' }}" {% if forloop.last == false %} , {% endif %} {% endfor %}
      };

      for (var x of document.getElementsByClassName("kdmath")) {
          x.innerHTML = x.innerText.replace(/\$\$/g, "✣✣");
          x.innerHTML = x.innerText.replace(/\$/g, "✬✬");
      }

      renderMathInElement(document.body, {
          colorIsTextColor: true,
          macros: macros_dict,
          delimiters: [
            {left: "((", right: "))", display: false},
            {left: "\\(", right: "\\)", display: false},
            {left: "⁍", right: "⁌", display: false},
            {left: "✬✬", right: "✬✬", display: false},
            {left: "✣✣", right: "✣✣", display: true},
            {left: "\\[", right: "\\]", display: true}
          ]
      });
  });
</script>
```
{% endraw %}

## Parsing options for MathJax

```
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['((','))'], ["\\(","\\)"] ],
      processEscapes: true
    },
  });
</script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
```

[Source: MathJax doc](https://docs.mathjax.org/en/latest/configuration.html).

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

## Notes

\t, \n are not a tab and newline for kramdown, so one can freely use them as KaTeX macros. (And one is free to redefine standard LaTeX commands.)

Wide range of supported functions:
https://khan.github.io/KaTeX/function-support.html#environments

##

Black center white star: ✬ 0x272C
Four balloon-spoked asterisk ✣ 0x2723

## How to do it without jQuery

```
document.querySelectorAll("script[type='math/tex']").forEach(function(el) {
  el.outerHTML = katex.renderToString(el.textContent, { displayMode: false });
});

document.querySelectorAll("script[type='math/tex; mode=display']").forEach(function(el) {
  el.outerHTML = katex.renderToString(el.textContent.replace(/%.*/g, ''), { displayMode: true });
});
```

[Source.](https://github.com/gettalong/kramdown/issues/292#issuecomment-313266061)


## Notes

Including UTF-8 characters $$→$$ $$α$$ (although some of them look differently in text mode: →, α, ∈) – note the lines with "Direct input:" on the [Function Support](https://khan.github.io/KaTeX/function-support.html) page of KaTeX.

Curly braces in math mode: $$x = \{A, B\}\ ⇒\  y∈x → (y=A \vee y=B)$$

N.B. in fake math mode: ⁍\\{a,b\\}⁌, whereas either ⁍\mathbf{bold}⁌ or ⁍\\mathbf{bold}⁌ results in a single backslash, because braces are one of the [characters that can be escaped in kramdown](https://kramdown.gettalong.org/syntax.html#automatic-and-manual-escaping).


The vertical bar `|` defines tables in kramdown, unfortunately even in math mode. (Bug?) Use `\vert` instead.

Newlines `\\` or `\newline` are ignored after a non-alphanumeric character (bug?), so instead of this:

```
(a+b)+c = \\
   = a+(b+c)
```

one should write this:

```
(a+b)+c = \phantom. \\
   = a+(b+c)
```

or this:

```
\begin{aligned}
(a+b)+c &= \\
   &= a+(b+c)
\end{aligned}
```

(And note that both newline commands are ignored in "strict" mode of KaTeX by design, because it's not a standard feature in LaTeX. See [the documentation](https://khan.github.io/KaTeX/function-support.html#line-breaks).)
