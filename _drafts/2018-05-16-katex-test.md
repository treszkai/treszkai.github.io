---
layout: post
title:  "KaTeX test"
katex:
  enabled: true
  macros:
    \RR: \mathbb R
---

The katex: tags at the top are for the server-side rendering with `_plugin/katex.rb`

Test inline: \( whoo-waa_i^6 \min_4 \)

\\[E=mc^2 \min_4 \\]

Not inline.
$ E=mc^2 $

$$E=mc^2$$
