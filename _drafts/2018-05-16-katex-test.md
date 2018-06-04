---
layout: post
title:  "KaTeX test"
katex:
  macros:
    - \t: \mathbb{R}
    - \bb: \mathbf
---

The katex: tags at the top are for the server-side rendering with `_plugin/katex.rb`

<!-- lalala -->

Test inline, one backslash: (( whoo-waa_i^6 \min_4 ))

Test sub: fawfaw yeah jfawfawk

(( V^* ))

\\[ E=mc^2 \min_4 * b * c_{a_d} \\]

$$ E=mc^2 \min_4 *b* $$

Dollars: $50, $40.

small inline: ((a)), ((F=ma))

parentheses: (a)

small inline: \\(a\\), \\(F=ma \\{ \\} \\)

I love my reals \\(\t RR\\).

This is bold: \\(\mathbf{bold}\\).

This is bold too: \\(\bb{bold}\\).
