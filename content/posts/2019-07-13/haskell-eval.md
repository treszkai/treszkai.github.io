---
title: Evaluation of function calls in Haskell
summary: Analyzing why point-free definitions in Haskell allow sharing the result of an inner function application, whereas pointful definitions do not.
tags: Haskell
category: programming
---

_(This post is discussed in [episode 15](https://haskellweekly.news/episode/15.html) of the_ Haskell Weekly Podcast._)_

Chapter 27 of [_Haskell Programming from first principles_](http://haskellbook.com/) (by Christopher Allen and Julie Moronuki) is about the evaluation system of Haskell, with a focus on non-strictness. In the section _Preventing sharing on purpose_, they write you want to prevent sharing the result of a function call when it would mean storing some big data just to calculate a small result. Two examples are provided to demonstrate the alternatives. In the first, the result of `g _` is not shared but calculated twice:

```haskell
Prelude> f x = (x 3) + (x 10)
Prelude> g' = \_ -> trace "hi g'" 2
Prelude> f g'
hi g'
hi g'
4
```

In the second, the result of `g _` _is_ shared, i.e. calculated only once and the result is stored:

```haskell
Prelude> g = const (trace "hi g" 2)
Prelude> f g
hi g
4
```

(Edited to add:) In practice, sharing is usually achieved with a `let` expression or a `where` construct.

(Note that this latter is called a [“point-free” definition](https://wiki.haskell.org/Pointfree).)

The authors conclude that
> functions aren’t shared when there are named arguments but are when the arguments are elided, as in pointfree. So, one way to prevent sharing is adding named arguments.

(Quoted from version 1.0RC4 of the book.)

In this post I analyze the runtime differences between point-free and pointful definitions.

## Behind the scenes

As [Tom Ellis describes](#Further-resources), the definitions of `g` and `f` translate to the following (in a close approximation to the “Core” language used during compilation):

```haskell
f = \x -> let {x3 = x 3; x10 = x 10} in (+) x3 x10
g = let {tg = trace "hi g" 2} in \y -> const tg y
g' = \_ -> trace "hi g'" 2
```

(Calling `f g` with these definitions does _not_ result in the same trace in GHCi 8.6.5 as with the original definitions. However, the code has the expected behavior if loaded into GHCi from a source file like [that below](#Sharing).)

Two things to point out here. First, every function definition is a lambda. Second, `g` was turned into a _let_ expression because we can only apply functions to variables or literals (in Core), not to function calls. _Edited to add:_ It would be reasonable to ask why `g = const (trace "hi g" 2)`  doesn't translate to `\y -> let {tg = trace "hi g" 2} in const tg y` (similar to `f`), to which the pragmatic answer is that _apparently_ the order is the following:
 1. not-fully-applied functions are turned into lambdas,
 2. parameters that are function calls are turned into named variables, and
 3. named function arguments from the left-hand side of `=` are moved to the right as a lambda.

## Evaluation with sharing

This is what happens during the evaluation of `f g`:
```haskell
ans = f g
```

`ans` is a function call, so its evaluation proceeds with substituting `g` for the argument of `f`:
```haskell
ans = let {x3 = g 3; x10 = g 10} in (+) x3 x10
```

`ans` is a _let_ expression, so we put the following _thunks_ for `x3` and `x10` on the heap under some unique name:
```haskell
-- Heap:
ans_x3 = g 3
ans_x10 = g 10
```

...and then proceed with evaluating the _in_ part:

```haskell
ans = (+) ans_x3 ans_x10
```
During the evaluation of this function call, `ans_x3` will be evaluated (or potentially `ans_x10` first, or both in parallel). `ans_x3` is a function call, so first we evaluate `g` to a lambda. As `g` is a _let_ expression, we create a closure for `trace "hi g" 2` on the heap, and then continue with the _in_ part of `g` (`\y -> const tg y`). This is a lambda now, meaning it's in weak head normal form, so the heap contents for `g` is overwritten with that:
```haskell
-- Heap:
g_tg = trace "hi g" 2
g = \y -> const g_tg y
```

Back to `ans_x3`, now the argument `3` is substituted in the definition of `g`:
```haskell
ans_x3 = const g_tg 3
```

This is a function call, with `const` already a lambda `\x _ -> x`, so the arguments can now be substituted in the body, leaving us with

```haskell
-- Heap:
ans_x3 = g_tg  -- (Pointer to the same address as g_tg.)
```

During the evaluation of `g_tg`, the magic printout happens (`hi g` on stdout), and its value is resolved to be `2`, so the heap is updated as such:

```haskell
-- Heap:
g_tg = 2
```

And `ans_x3` is a pointer to the same memory content `2`.

Analogously, the evaluation of `ans_x10` proceeds as such:

```haskell
ans_x10 = const g_tg 10
ans_x10 = g_tg
-- let ans_x10 points to the memory location of g_tg:
ans_x10 = 2
```

Finally, `ans = (+) ans_x3 ans_x10`, which evaluates to `ans = 4`.


## Evaluation without sharing

In contrast, the evaluation of `f g'` proceeds as follows:
```haskell
ans' = f g'
ans' = let {x3 = g' 3; x10 = g' 10} in (+) x3 x10
```

```haskell
-- Heap:
ans_x3'  = g' 3
ans_x10' = g' 10
```

```haskell
ans' = (+) ans_x3' ans_x10'
ans_x3' = trace "hi g'" 2
```

Now `hi g'` is printed, and the heap is updated:
```haskell
-- Heap:
ans_x3' = 2
```

When evaluating `ans_x10'`, we **again print** `hi g'`, and store the result of the trace under a different thunk:

```haskell
-- Heap:
ans_x10' = 2
```

Now `ans'` evaluates to `(+) 2 2`, i.e. `4`.

## Attempt at verifying my translated definitions

I attempted to verify what I was saying above about the definitions of `f`, `g`, `g'` in Core, using the `-ddump-simpl` compiler flag of GHCi, but it didn't fulfil my expectations.

<a name="Sharing"></a>Sharing.hs:
```haskell
module Sharing where

import Debug.Trace

f x = (x (3::Int)) + (x 10) :: Int
g   = const (trace "hi g" (2::Int))  -- share
g'  = \_ -> trace "hi g'" (2::Int)   -- don't share
g'' = let {tg = trace "hi g" (2::Int)} in \y -> const tg y  -- share (equivalent to g)
```

In GHCi:
```
Prelude> :set -ddump-simpl -dsuppress-all -Wno-missing-signatures
Prelude> :l Sharing
[1 of 1] Compiling Sharing          ( Sharing.hs, interpreted )

==================== Tidy Core ====================
Result size of Tidy Core
  = {terms: 52, types: 39, coercions: 0, joins: 0/0}

f = \ x_a1Fl -> + $fNumInt (x_a1Fl (I# 3#)) (x_a1Fl (I# 10#))
g = \ @ b_a1Gi -> const (trace (unpackCString# "hi g"#) (I# 2#))
g' = \ @ p_a1G6 -> \ _ -> trace (unpackCString# "hi g'"#) (I# 2#)
tg_r1F4 = trace (unpackCString# "hi g"#) (I# 2#)
g'' = \ @ b_a1FJ -> \ y_a1Fn -> const tg_r1F4 y_a1Fn

... and some more stuff
```

Nonetheless, as [a SO answer describes](https://stackoverflow.com/a/6121495/8424390), we can see that a function application in Core is defined as `Expr Atom`, where _Atom_ is `var | Literal`. I attempted to install [ghc-core](http://hackage.haskell.org/package/ghc-core) but the build failed, so further analysis is put on the shelf.

## Conclusions

So, what's the essential difference between `g` and `g'`?

`g = const (trace "hi g" 2)` is a function application where the argument is a function application, which is treated as a _let_ expression. When you evaluate `g ()`, the auxiliary variable introduced by the _let_ – i.e.,`tg = trace "hi g" 2` – is evaluated to a literal and its value is stored on the heap. On subsequent calls, some other argument can be applied to the `const tg` function, but its first argument `tg` is already evaluated.

In contrast, `g' = \_ -> trace "hi g'" 2` is a lambda, so it is already fully evaluated, and nothing in it can be simplified further. If we apply `g'` first to the argument `()`, the expression `g' ()` will evaluate to the body of `g'` with the unused parameter discarded, i.e. `trace "hi g'" 2`. If we later evaluate `g' []`, then it again results in the (same) body after the (dummy) function application. Nowhere during this process did we store the value of `trace "hi g'" 2`: in particular, we didn't update the definition of `g'` to `\_ -> 2`, simply because that is not the definition of `g'`. (But could we have updated it? Even though functions are always pure, I think the answer is generally _no_: sometimes the result of a function is bigger than the definition, and the result is not needed often enough to warrant this speed–memory tradeoff.)

Recall the original wording:
> functions aren’t shared when there are named arguments but are when the arguments are elided, as in pointfree.

As we saw, _functions_ themselves are never shared. Rather, if `g` is a partially applied function whose argument is a function application `fun arg`, then `g` is equivalent to a _let_ expression, and after its first evaluation `g` will _change_ to a lambda with `fun arg` already evaluated.

As a generally-okay heuristic, point-free definitions allow sharing inner function calls, whereas nothing in a lambda (or a function with all arguments on the left-hand side) is shared.

## Further resources

More details on similar behavior are given by Tom Ellis in his talk [_Haskell programs: how do they run?_](https://skillsmatter.com/skillscasts/8726-haskell-programs-how-do-they-run) (free registration required to watch the talk).

The [talk of David Luposchainsky (a.k.a. `quchen`)](https://skillsmatter.com/skillscasts/8800-functional-and-low-level-watching-the-stg-execute) goes into more depth – down to the Core –, in which he uses his own implementation of the spineless tagless graph reduction machine (STG), to visualize the evaluation of any given Haskell code ([link to repo](https://github.com/quchen/stgi)).
