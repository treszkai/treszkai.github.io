---
layout: post
title: The value function of partially observable MDPs
categories: ML
tags: RL
description:
katex:
    macros:
        \SS: \mathcal S
        \AA: \mathcal A
starred: true
---

This post explores the properties of the value function of a partially observable Markov decision process (POMDP). It is heavily based on {% cite Kaelbling1998-POMDP %} and {% cite Hauskrecht2000-POMDP-approx %}.

# Problem formulation

A (finite) _partially observable Markov decision process_ is described by a tuple $$\lA \SS, \AA, T, R, \Omega, O \rA$$, where
 - $$\lA \SS, \AA, T, R \rA$$ describes a finite MDP,
 - $$\Omega$$ is a finite set of observations,
 - $$O: \SS \times \AA → Π(Ω)$$ is the _observation function_, which maps a resulting state $$s'$$ and action $$a$$ to a probability distribution over observations.

In a POMDP, the agent doesn't get to observe the current state: instead
(in contrast with a fully observable MDP).

TODO: discount factor.

# The belief state of a POMDP

A belief state $$b ∈ Π(\SS)$$ is a probability distribution over the states: $$b(s)$$ denotes probability that the environment is currently in state $$s$$. As such, $$b(s) ≥ 0$$ for all $$s$$ and $$\sum_s b(s) = 1$$: $$b$$ lies on the standard $$(|\SS|-1)$$-simplex. For example, in an environment with three states ($$s_1$$, $$s_2$$, $$s_3$$), the point $$(b(s_1), b(s_2), b(s_3)) \in \RR^3$$ lies on the equilateral triangle that connects the points $$(1,0,0)$$, $$(0,1,0)$$, $$(0,0,1)$$.

It is a sufficient statistic.

Jumping from one state to another.

# Tiger



This POMDP has the property that the optimal infinite-horizon value function has a finite number of linear segments.

# Relation to an MDP

It is interesting to think about

# Questions

Which policies can be represented by a finite state controller?

Can the value function be estimated efficiently with Monte Carlo methods?

# References

{% bibliography --cited %}
