---
layout: post
title: "IWSGL, Tutorial 3: Multilinear Algebra – Solutions (Exercise 1)"
categories: Math
description: Solutions for exercise 1 of tutorial 3 of the International Winter School on Gravity and Light.
starred: true
latex_macros:
    \linmap: \stackrel{\sim}{→}
    \v: \mathbf{v}
    \e: \mathbf{e}
---

Solutions for exercise 1 of [tutorial 3](https://www.youtube.com/watch?v=5oeWX3NUhMA) of the [International Winter School on Gravity and Light](https://gravity-and-light.herokuapp.com). ([Link to video of lecture 3](https://www.youtube.com/watch?v=mbv3T15nWq0).)

## Notation

On this solution sheet, I'll speak of a vector space $$(V,+,\cdot)$$ over a field $$K$$, where $$+: V\times V \rightarrow V$$ is the addition and $$\cdot: K \times V \rightarrow V$$ is called (scalar) multiplication or S-multiplication. The field $$(K, \textcolor{red}{+}, \textcolor{red}{\cdot})$$ has $$\textcolor{red}{+}:K\times K \rightarrow K$$ as addition and $$\textcolor{red}{\cdot}:K\times K \rightarrow K$$ as multiplication operations. The dot is often omitted, i.e. $$a \mathbf v$$ is short for $$a \cdot \mathbf v$$, $$a b$$ is short for $$a \textcolor{red}{\cdot} b$$. (Note that the lecture dealt with real vector spaces, i.e. the field $$K$$ was always the set of reals $$\mathbb R$$.)
The scalars, i.e. the elements of $$K$$, are denoted with normal letters $$a,b$$, and the vectors, i.e. the elements of $$V$$, are denoted with boldface letters $$\mathbf u, \mathbf v, \mathbf w$$.

<script type="text/javascript">
function showById(id, btn) {
    document.getElementById(id).style.display = 'block';
    btn.style.display = 'none';
}
function showByClass(cls, btn) {
    for (var x of document.getElementsByClassName(cls))
        x.style.display = 'block';
    btn.style.display = 'none';
}
function hideByClass(cls) {
    for (var x of document.getElementsByClassName(cls))
        x.style.display = 'none';
}
</script>

# Exercise 1: True or false?

_Tick the correct statements, but not the incorrect ones._ <a href="#" onclick="showByClass('answer', this); hideByClass('show-answer'); return false;">Show all answers</a>

_a) Which statements on vector spaces are correct?_

**?.** _Commutativity of multiplication is a vector space axiom._ <a href="#" onclick="showById('answer1', this); return false;" class="show-answer">Show answer</a>

<div id="answer1" class="answer" style="display: none;" markdown="1">
_Answer:_ false.

Clarification:
 - The scalar multiplication $$\cdot: K \times V \rightarrow V$$ doesn't even have the same sets in its two arguments, i.e. $$\mathbf v \cdot a$$ is not even defined.
 - The vector space has the commutativity of _addition_ as an axiom: for any $$\mathbf u,\mathbf v \in V$$, $${\mathbf u+\mathbf v} = {\mathbf v + \mathbf u}$$.
 - The underlying field $$K$$ _does_ have the commutativity of multiplication as a field axiom: for any $$a,b \in K$$, $$a \textcolor{red}{\cdot} b = b \textcolor{red}{\cdot} a$$.
 - As a consequence, for any $$\mathbf v \in V$$ and $$a, b \in K$$,

$$
 a (b \mathbf v) = (a\textcolor{red}{\cdot} b)\mathbf v = (b \textcolor{red}{\cdot} a)\mathbf v = b(a \mathbf v).
$$
</div>

**?.** _Every vector is a matrix with only one column._ <a href="#" onclick="showById('answer2', this); return false;" class="show-answer">Show answer</a>

<div id="answer2" class="answer" style="display: none;" markdown="1">
_Answer:_ false.

Clarification:
 - By definition, a vector is an element of a vector space. If we fix a basis for the vector space, then any vector can be represented by an ordered set of numbers, which could be treated as a column vector, i.e. a matrix with one column. However, this representation depends on the choice of basis.
 - The [official answer](https://youtu.be/5oeWX3NUhMA?t=1m09s) brings up as a counterexample the vector space of polynomials up to some finite degree. However, here again we could represent the vectors as a column vector with any choice of a basis. E.g. using the standard basis, $$p(x) = 0x^2 + 4x + 5 $$ could be represented as $$\mathbf p = [0, 4, 5]^T$$.
</div>

**?.** _Every linear map between vector spaces can be represented by a unique quadratic matrix._ <a href="#" onclick="showById('answer3', this); return false;" class="show-answer">Show answer</a>

<div id="answer3" class="answer" style="display: none;" markdown="1">
_Answer:_ false.

Clarification:
 - As above, a linear map $$f: V \rightarrow W $$ can be represented as a unique matrix only once bases are chosen for its domain $$V$$ and codomain $$W$$.
 - This matrix is quadratic only if the dimensions of $$V$$ and $$W$$ are equal.
</div>

**?.** _Every vector space has a corresponding dual vector space._ <a href="#" onclick="showById('answer4', this); return false;" class="show-answer">Show answer</a>

<div id="answer4" class="answer" style="display: none;" markdown="1">
_Answer:_ true.

Clarification:
 - The dual space of a vector space $$V$$ is defined as the set of linear maps from $$V$$ to $$K$$: $$V^* \coloneqq Hom(V,K) \coloneqq \{φ\ \vert \ φ: V \linmap K\} $$.
</div>

**?.** _The set of everywhere positive functions on $$\mathbb R$$ with pointwise addition and S-multiplication is a vector space._ <a href="#" onclick="showById('answer5', this); return false;" class="show-answer">Show answer</a>

<div id="answer5" class="answer" style="display: none;" markdown="1">
_Answer:_ false.

Clarification:
 - This set doesn't have a commutative identity element: by the field axioms of $$\mathbb R$$, it could only be the constant zero function, but that's not an element of the set.
 - This set doesn't have a commutative inverse for any element.
 - For the scalar multiplication we'd need to know the underlying field. Usually it would be $$\mathbb R$$, but then S-multiplication with a negative number wouldn't result in an everywhere positive function. (Although one can construct a field from $$\mathbb R^+$$, I wonder how well that would combine with the above attempt at a vector space.)
</div>

b) What is true about tensors and their components?

**?.** _The tensor product of two tensors is a tensor._ <a href="#" onclick="showById('answer6', this); return false;" class="show-answer">Show answer</a>

<div id="answer6" class="answer" style="display: none;" markdown="1">
_Answer:_ true.

Clarification:
 - The lecture didn't mention tensor products, so a definition is in order. The product of an $$ (l,k) $$-tensor $$S$$ and an $$ (n,m) $$-tensor $$T$$ is an $$ (l+n,k+m) $$-tensor $$ S \otimes T $$, whose $$ (i_1, \ldots, i_{l+n}, j_1, \ldots, j_{k+m}) $$-th component is the product of the relevant components of $$S$$ and $$T$$:

$$
 (S \otimes T)^{i_1, \ldots, i_l, i_{l+1}, \ldots, i_{l+n}}_ {j_1, \ldots, j_k, j_{k+1}, \ldots, j_{k+m} } =
   S^{i_1, \ldots, i_l}_ {j_1, \ldots, j_k}
   T^{i_{1}, \ldots, i_{n}}_ {j_{1}, \ldots, j_{m}}.
$$

[Source: Wikipedia](https://en.wikipedia.org/wiki/Tensor#Tensor_product)

This means that if the arguments of $$ S \otimes T $$ are
 - the $$l+n$$ linear maps $$φ^{(p)} = \sum^{dim V}_{i=1} \varphi^{(p)}_i \epsilon^i$$ for $$1 \le p \le l+n$$, and
 - the $$k+m$$ vectors $$ \v_{(q)} = \sum^{dim V}_{j=1} v_{(q)}^j \e_j $$ for $$1 \le q \le k+m$$

(with some particular choice of basis vectors $$\{\e_i\}_i$$ and basis covectors $$\{\epsilon^i\}_i$$ ), then

$$
\begin{aligned}
(S\otimes T) &(φ^{(1)}, \ldots, φ^{(l+n)}, \v_{(1)}, \ldots, \v_{(k+m)}) = \\
  &= S (φ^{(1)}, \ldots, φ^{(l)}, \v_{(1)}, \ldots, \v_{(k)})\,\cdot\,
  T (φ^{(l+1)}, \ldots, φ^{(l+n)}, \v_{(k+1)}, \ldots, \v_{(k+m)})\\
  &= \Bigg(
      \sum_{i_1}^{\dim V} \cdots \sum_{i_l}^{\dim V}
      \sum_{j_1}^{\dim V} \cdots \sum_{j_k}^{\dim V}
      \varphi^{(1)}_{i_1} \ldots \varphi^{(l)}_{i_l}
      v_{(1)}^{j_1} \ldots v_{(k)}^{j_k}
      S^{i_1, \ldots, i_l}_{j_1, \ldots, j_k}
  \Bigg) \cdot \phantom.\\
  &\phantom{=} \Bigg(
      \sum_{i_{l+1}}^{\dim V} \cdots \sum_{i_{l+n}}^{\dim V}
      \sum_{j_{k+1}}^{\dim V} \cdots \sum_{j_{k+m}}^{\dim V}
      \varphi^{(l+1)}_{i_{l+1}} \ldots \varphi^{(l+n)}_{i_{l+n}}
      v_{(k+1)}^{j_{k+1}} \ldots v_{(k+m)}^{j_{k+m}}
      T^{i_{l+1}, \ldots, i_{l+n}}_{j_{k+1}, \ldots, j_{k+n}}
  \Bigg) \\
  &=  \sum_{i_1}^{\dim V} \cdots \sum_{i_{l+n}}^{\dim V}
      \sum_{j_1}^{\dim V} \cdots \sum_{j_{k+m}}^{\dim V}
      \varphi^{(1)}_{i_1} \ldots \varphi^{(l+n)}_{i_{l+n}}
      v_{(1)}^{j_1} \ldots v_{(k+m)}^{j_{k+m}}
      S^{i_1, \ldots, i_l}_{j_1, \ldots, j_k}
      T^{i_{l+1}, \ldots, i_{l+n}}_{j_{k+1}, \ldots, j_{k+n}}.
\end{aligned}
$$

These $$ (l+n+k+m) $$ summations are quite a mess, but the above derivation shows that the [Einstein summation convention](http://mathworld.wolfram.com/EinsteinSummation.html) works for tensor products as well:

$$
\begin{aligned}
(S\otimes T) &(φ^{(1)}, \ldots, φ^{(l+n)}, v_{(1)}, \ldots, v_{(k+m)}) =\\
  &= S (φ^{(1)}, \ldots, φ^{(l)}, v_{(1)}, \ldots, v_{(k)})\,\cdot\,
  T (φ^{(l+1)}, \ldots, φ^{(l+n)}, v_{(k+1)}, \ldots, v_{(k+m)})\\
  &= \Big(
      \varphi^{(1)}_{i_1} \ldots \varphi^{(l)}_{i_l}
      v_{(1)}^{j_1} \ldots v_{(k)}^{j_k}
      S^{i_1, \ldots, i_l}_{j_1, \ldots, j_k}
  \Big)
  \Big(
      \varphi^{(l+1)}_{i_{l+1}} \ldots \varphi^{(l+n)}_{i_{l+n}}
      v_{(k+1)}^{j_{k+1}} \ldots v_{(k+m)}^{j_{k+m}}
      T^{i_{l+1}, \ldots, i_{l+n}}_{j_{k+1}, \ldots, j_{k+n}}
  \Big) \\
 &=  \varphi^{(1)}_{i_1} \ldots \varphi^{(l+n)}_{i_{l+n}}
      v_{(1)}^{j_1} \ldots v_{(k+m)}^{j_{k+m}}
      S^{i_1, \ldots, i_l}_{j_1, \ldots, j_k}
      T^{i_{l+1}, \ldots, i_{l+n}}_{j_{k+1}, \ldots, j_{k+n}}.
\end{aligned}
$$
</div>

**?.** _You can always reconstruct a tensor from its components and the corresponding basis._ <a href="#" onclick="showById('answer7', this); return false;" class="show-answer">Show answer</a>

<div id="answer7" class="answer" style="display: none;" markdown="1">
_Answer:_ true.

Clarification:
 - If we know the basis vectors for the vector space and the dual vector space, then the components of the vector and covector arguments are uniquely determined, and we can apply the tensor to the arguments using the components of the tensor (or some relevant finite subset in case $$V$$ is not finite dimensional).
</div>

**?.** _The number of indices of the tensor components depends on dimension._ <a href="#" onclick="showById('answer8', this); return false;" class="show-answer">Show answer</a>

<div id="answer8" class="answer" style="display: none;" markdown="1">
_Answer:_ false.

Clarification:
 - A tensor component usually has one index for each argument, e.g. for a $$(2,1)$$-tensor $$T$$, the components are $$T^{i_1,i_2}_{j_1}$$.
 - The _range_ of these indices does depend on the dimension: each index ranges from $$1$$ to $$\dim V$$. Therefore an $$ (n,m) $$-tensor $$T$$ has $$ (\dim V)^{n+m} $$ many components.
</div>

**?.** _The Einstein summation convention does not apply to tensor components._ <a href="#" onclick="showById('answer9', this); return false;" class="show-answer">Show answer</a>

<div id="answer9" class="answer" style="display: none;" markdown="1">
_Answer:_ false.

Clarification: see above.
</div>

**?.** _A change of basis does not change the tensor components._ <a href="#" onclick="showById('answer10', this); return false;" class="show-answer">Show answer</a>

<div id="answer10" class="answer" style="display: none;" markdown="1">
_Answer:_ false.

Clarification:
 - the tensor components are defined with respect to a given basis.
</div>

c) Given a basis for a $$d$$-dimensional vector space $$V$$, ...

**?.** ..._one can find exactly $$d^2$$-different dual bases for the corresponding dual vector space $$ V^* $$._ <a href="#" onclick="showById('answer11', this); return false;" class="show-answer">Show answer</a>

<div id="answer11" class="answer" style="display: none;" markdown="1">
_Answer:_ false.

Clarification:
 - Given a basis of $$V$$, $$E = \{\mathbf{e}_i\}_{i=1}^d \subset V$$, there is a _unique_ dual basis of $$V^* $$, namely $$E^* = \{\epsilon_i\}_{i=1}^d$$, where $$\epsilon_i(\e_i) = 1$$ and $$\epsilon_i(\e_j) = 0$$ for $$i ≠ j$$.
</div>

**?.** ..._by removing one basis vector of the basis of $$V$$, a basis for a $$(d - 1)$$-dimensional vector space $$V_1$$ is obtained._ <a href="#" onclick="showById('answer12', this); return false;" class="show-answer">Show answer</a>

<div id="answer12" class="answer" style="display: none;" markdown="1">
_Answer:_ true.

Clarification:
 - The resulting set of $$(d-1)$$ vectors are still linearly independent, and their span is a $$(d-1)$$-dimensional subspace of $$V$$.
</div>

**?.** ..._the continuity of a map $$f : V → W$$ depends on the choice of basis for the vector space $$W$$._ <a href="#" onclick="showById('answer13', this); return false;" class="show-answer">Show answer</a>

<div id="answer13" class="answer" style="display: none;" markdown="1">
_Answer:_ false.

Clarification:
 - The continuity of a map is defined for _topological spaces_, not for vector spaces.
 - $$f$$ is continuous _iff_ the preimage of every open set in $$W$$ is open in $$V$$. Note that no term in this definition depends on the choice of basis for either $$V$$ or $$W$$.
 - Assuming that $$V$$ and $$W$$ are real vector spaces, it is customary to equip them with the standard topology. A set $$A$$ is open in $$V$$ _iff_ either it is the union of open $$ε$$-balls, or of Cartesian products of open intervals. While these definitions assume a basis for $$V$$, they all result in the exact same topologies. (Meaning a set can be covered with open balls _iff_ it can be covered with open cuboids _iff_ it can be covered with open cubes – an interesting but easy-to-prove result.)
 - It's easy to see that every _linear_ map between real vector spaces (equipped with the standard topology) is continuous.
</div>

**?.** ..._one can extract the components of the elements of the dual vector space $$V^*$$._ <a href="#" onclick="showById('answer14', this); return false;" class="show-answer">Show answer</a>

<div id="answer14" class="answer" style="display: none;" markdown="1">
_Answer:_ true.

Clarification:
 - a basis for $$V$$ uniquely determines a dual basis for $$V^* $$, which uniquely determines the components of any covector.
</div>

**?.** ..._each vector of $$V$$ can be reconstructed from its components._ <a href="#" onclick="showById('answer15', this); return false;" class="show-answer">Show answer</a>

<div id="answer15" class="answer" style="display: none;" markdown="1">
_Answer:_ true.

Clarification:
 - Given the basis vectors $$\mathbf{e}_i$$ and components $$v^i$$ for $$1 \leq i \leq d$$, $$\mathbf{v} = \sum_{i=1}^d v^i \mathbf{e}_i$$.
</div>
