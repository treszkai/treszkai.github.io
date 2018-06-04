---
layout: post
title: "IWSGL, Tutorial 3: Multilinear Algebra (Exercise 1)"
categories: math
tags: IWSGL
---

Solutions for [tutorial 3](https://www.youtube.com/watch?v=5oeWX3NUhMA) of the [International Winter School on Gravity and Light](link). [Link to video of lecture 3](https://www.youtube.com/watch?v=mbv3T15nWq0).

# Exercise 1: True or false?

_Tick the correct statements, but not the incorrect ones._

## Notation

In this exercise, I'll speak of a vector space \\((V,+,\cdot)\\) over a field \\(K\\), where \\(+: V\times V \rightarrow V\\) is the addition and \\(\cdot: K \times V \rightarrow V\\) is called (scalar) multiplication or S-multiplication, and the field \\((K, \color{red}{+}, \color{red}{\cdot})\\) has \\(\color{red}{+}:K\times K \rightarrow K\\) as addition and \\(\color{red}{\cdot}:K\times K \rightarrow K\\) as multiplication operations. The dot is often omitted, i.e. \\(a \mathbf v\\) is short for \\(a \cdot \mathbf v\\), \\(a b\\) is short for \\(a \color{red}{\cdot} b\\). (Note that the lecture dealt with real vector spaces, i.e. the field \\(K\\) was always the set of reals \\(\mathbb R\\).)
The scalars, i.e. the elements of \\(K\\), are denoted with normal letters \\(a,b\\), and the vectors, i.e. the elements of \\(V\\), are denoted with boldface letters \\(\mathbf u, \mathbf v, \mathbf w\\).

_a) Which statements on vector spaces are correct?_

_Commutativity of multiplication is a vector space axiom._

_Answer:_ false.

Clarification:
 - The scalar multiplication \\(\cdot: K \times V \rightarrow V\\) doesn't even have the same sets in its two arguments, i.e. \\(\mathbf v \cdot a\\) is not even defined.

Possible sources of confusion:
 - The vector space has the commutativity of _addition_ as an axiom: for any \\(\mathbf u,\mathbf v \in V\\), \\(\mathbf u+\mathbf v = \mathbf v + \mathbf u\\).
 - The underlying field \\(K\\) _does_ have the commutativity of multiplication as a field axiom: for any \\(a,b \in K\\), \\(a \color{red}{\cdot} b = b \color{red}{\cdot} a\\).
 - As a consequence, for any \\(\mathbf v \in V\\) and \\(a, b \in K\\),
 \\(
 a (b \mathbf v) = (a\color{red}{\cdot} b)\mathbf v = (b \color{red}{\cdot} a)\mathbf v = b(a \mathbf v).
 \\)

_Every vector is a matrix with only one column._

_Answer:_ false.

Clarification:
 - By definition, a vector is an element of a vector space. If we fix a basis for the vector space, then any vector can be represented by an ordered set of numbers, which could be treated as a column vector, i.e. a matrix with one column. However, this representation depends on the choice of basis.
 - The [official answer](https://youtu.be/5oeWX3NUhMA?t=1m10s) brings up as a counterexample the vector space of polynomials up to some finite degree. However, here again we could represent the vectors as a column vector with any choice of a basis. E.g. using the standard basis, \\(p(x) = 0x^2 + 4x + 5 \\) could be represented as \\(\mathbf p = [0, 4, 5]^T\\).

<!-- TODO: 1:09 For 1aii the video brings up as the vector space of polynomials up to some finite degree a counterexample. However, we could represent the vectors as a column vector with any choice of a basis. E.g. using the standard basis, \\(p(x) = 0x^2 + 4x + 5 \\) could be represented as \\(\mathbf p = [0, 4, 5]^T\\).

Am I missing something, or is the counterexample wrong?

My reason for why it's false: -->

_Every linear map between vector spaces can be represented by a unique quadratic matrix._

_Answer:_ false.

Clarification:
 - As above, a linear map \\(f: V \rightarrow W \\) can be represented as a unique matrix only once bases are chosen for its domain \\(V\\) and codomain \\(W\\).
 - This matrix is quadratic only if the dimensions of \\(V\\) and \\(W\\) are equal.

_Every vector space has a corresponding dual vector space._

_Answer:_ true.

Clarification:
 - The dual space of a vector space \\(V\\) is defined as the set of linear maps from \\(V\\) to \\(K\\): \\(V^* := Hom(V,K) := \\{f\ \|\ f: V \rightarrow K\\}\\).

_The set of everywhere positive functions on \\(\mathbb R\\) with pointwise addition and S-multiplication is a vector space._

_Answer:_ false.

Clarification:
 - This set doesn't have a commutative identity element: by the field axioms of \\(\mathbb R\\), it could only be the constant zero function, but that's not an element of the set.
 - This set doesn't have a commutative inverse for any element.
 - For the scalar multiplication we'd need to know the underlying field. Usually it would be \\(\mathbb R\\), but then S-multiplication with a negative number wouldn't result in an everywhere positive function. (Although one can construct a field from \\(\mathbb R^+\\), I wonder how well that would combine with the above attempt at a vector space.)

b) What is true about tensors and their components?

_The tensor product of two tensors is a tensor._

https://en.wikipedia.org/wiki/Tensor#Tensor_product

_You can always reconstruct a tensor from its components and the corresponding basis._

_The number of indices of the tensor components depends on dimension._

_The Einstein summation convention does not apply to tensor components._

_A change of basis does not change the tensor components._

c) Given a basis for a \\(d\\)-dimensional vector space \\(V\\),􏲽

one can find exactly \\(d^2\\)-different dual bases for the corresponding dual vector space \\(V^*\\).

by removing one basis vector of the basis of \\(V\\), a basis for a \\((d - 1)\\)-dimensional vector space \\(V_1\\) is obtained.

the continuity of a map \\(f : V \rightarrow W\\) depends on the choice of basis for the vector space \\(W\\).

one can extract the components of the elements of the dual vector space \\(V^*\\).

each vector of \\(V\\) can be reconstructed from its components.
