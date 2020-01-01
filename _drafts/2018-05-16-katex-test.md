---
layout: post
title:  "KaTeX test"
latex_macros:
     \R: \mathbb{R}
     \b: \mathbf
     \u: 0<1
---

$$b$$

kramdown turns `a<v` into `% <![CDATA[\na<v %]]>` (see https://github.com/KaTeX/KaTeX/issues/20 ), so we could strip the comments manually.

```javascript
    var textWithoutComments = text.replace(/([^\\])%.*/g, '$1');
    el.outerHTML = katex.renderToString(textWithoutComments, { displayMode: false, macros: macros_dict });
```

$$a<v$$

inline: $b$, \(a\), asdkjaks, \(b\), $4, $5, \( v _d , a_ b \)

Inline: \( a \)  $b$

$$A = \{x : x \in \RR \} \rightarrow B $$

inline:
$$A = \{x : x \in \RR \}$$, $$A = \{x : x ∈ \RR \} → B $$,

$$\b{x}$$

$$a \indep b$$

$$f(\parm)$$

$$M \proves D$$

$$F = \emptyset $$

$$\Union A$$

$$\Intersect B$$

$$\grad f$$

$$\EE[f]$$

verbatim: `$$abc$$`

inline: $$\Intersect \Union f(\parm) \indep g$$

The katex: tags at the top are for the server-side rendering with `_plugin/katex.rb`

<!-- lalala -->

Test inline, one backslash: (( whoo-waa_i^6 \min_4 ))

Test sub: fawfaw yeah jfawfawk

⁍\min_3V^a⁌

\\[ E=mc^2 \min_4 *b* c_{a_d} \\]

$$
E=mc^2 \min_4 *b* a\\
m \newline
a
$$

$$
second inline
$$

Dollars: $50, $40.

small inline: ⁍E=mc^2⁌, ((a)), ((F=ma))

parentheses: (a)

small inline: \\(a\\), \\(F=ma \\{ \\} \\)

I love my reals \\(\R RR\\).

This is bold: \\(\mathbf{bold}\\).

This is bold too: \\(\bb{bold}\\).