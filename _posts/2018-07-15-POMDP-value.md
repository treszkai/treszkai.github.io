---
layout: post
title: "(Coming soon!) The value function of partially observable MDPs"
categories: ML
tags: RL
description:
latex_macros:
        \SS: \mathcal S
        \AA: \mathcal A
        '#': '^{(#1)}'
        '*': '^{\star}'
---

This post explores the properties of the value function of a partially observable Markov decision process (POMDP). It is heavily based on {% cite Kaelbling1998-POMDP %} and {% cite Hauskrecht2000-POMDP-approx %}.

# Problem formulation

A _partially observable Markov decision process_ is described by a tuple $$⟨ \SS, \AA, T, R, γ, \Omega, O, b_0⟩$$, where
 - $$⟨ \SS, \AA, T, R, γ, ⟩$$ describes an MDP (where $$\SS$$ is a set of states, $$\AA$$ a set of actions, $$T: SS \times \AA → Π(\SS)$$ is the transition function, $$R: \SS → \RR$$ is the reward function and $$γ$$ the discount factor, and $$Π(X)$$ denotes the set of probability distributions over a set $$X$$);
 - $$\Omega$$ is a set of observations;
 - $$O: \SS \times \AA → Π(Ω)$$ is the observation function;
 - $$b#0 \in Π(\SS)$$ is the initial belief distribution (described in the next section).

As in a fully observable MDP, when the environment is in state $$s$$, executing action $$a$$ will bring the environment to a state $$s'$$ sampled from $$T(s,a)$$. (If the MDP is discrete, then the probability of the next state being $$s'$$, given the current state $$s$$ and action $$a$$ is $$Pr(s' \vert s, a) = T(s,a)$$.) On every step, the agent is rewarded $$R(s)$$ according to the current state $$s$$. Future rewards are discounted exponentially: a reward $$r\in \RR$$ that's given $$k ≥ 0$$ timesteps later is worth $$γ^k r$$ right now.

The goal of the agent is to maximize the expected cumulative discounted reward, either for a finite horizon up until time $$M$$, or for an infinite horizon.

However, in a POMDP the agent doesn't have full information about the current state of the environment. Instead, when the environment is in state $$s$$, the agent executes action $$a$$, and as a result the environment arrives in state $$s'$$, the agent receives observation $$o' ∼ O(s', a)$$.[^1] (Where $$∼$$ denotes the sampling operator.)

[^1]: The fact that the observation depends on the last action makes it easy to observe the effect of only the last action: e.g. after rolling a sequence of dice, you usually observe only the result of the last one. (Even though you might keep the sum of all in memory, describing the state with an integer.)

Some examples are:
 - navigating in a maze where there are multiple places that look the same;
 - playing poker, where you can only observe your own cards, but the next state is prescribed by your own cards, your own strategy, and your opponents' cards and their strategy [^3];
 - driving a car, where the intent of the other driver makes a big difference in the next state but it can't be observed.

[^2]: The order of the deck is also part of the environment, but you can't infer anything about that through your actions, so the next dealt card is better modeled as a random variable as part of the value of $$T$$.

# Coming soon...

(Last update: 2018-07-15. Check back around 2018-07-22.)

### The belief state of a POMDP
### The value function
### An example POMDP: Tiger
### Discussion

# References

{% bibliography --cited %}

# Footnotes
