---
layout: post
title: The value function of partially observable MDPs
categories: ML
tags: RL
description:
latex_macros:
        \SS: \mathcal S
        \AA: \mathcal A
        '#': '^{(#1)}'
        '*': '^{\star}'
starred: true
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

# The belief state of a POMDP

A belief state $$b ∈ Π(\SS)$$ is a probability distribution over the states: $$b(s)$$ denotes the probability that the environment is currently in state $$s$$. As such, $$b(s) ≥ 0$$ for all $$s$$ and $$\sum_s b(s) = 1$$: $$b$$ lies on the standard $$(\vert\SS\vert-1)$$-simplex. For example, in an environment with three states ($$s_1$$, $$s_2$$, $$s_3$$), the point $$⟨ b(s_1), b(s_2), b(s_3) ⟩ \in \RR^3$$ lies on the equilateral triangle that connects the points $$⟨ 1,0,0 ⟩$$, $$⟨ 0,1,0 ⟩$$, $$⟨ 0,0,1 ⟩$$, or in a 2-state environment $$⟨b(s_1), b(s_2)⟩$$ lies on the closed line segment that connects $$⟨0,1⟩$$ and $$⟨1,0⟩$$ in the real plane.

Belief space of an environment with three states:

![Belief space of an environment with three states](/files/pomdp-value/belief3d.png)

The belief state at timestep $$t$$ ($$b^{(t)}$$ from now on) is a sufficient statistic of the history of observations and actions: knowing all of $$⟨ b#0, a#0, o#0, a#1, o#1, …, a#{t-1}, o#{t} ⟩$$ doesn't provide more information about the current state of the environment than knowing simply $$b#t$$.

This also means

Jumping from one state to another.

policy: belief -> action mapping

# The value function

The optimal value function of a POMDP fulfills the Bellman equation {% cite todo %}, for the same reasons that an MDP does: it is the fixpoint of the  operator.

$$V*$$ is always convex: for any two belief states $$b$$ and $$b'$$, any convex combination of $$b$$ and $$b'$$ has less value than the same convex combination of $$V*(b)$$ and $$V*(b')$$; in other words, the following holds for any $$α ∈ [0,1]$$:

$$ V*(α b + (1-α) b') ≤ αV*(b) + (1-α)V*(b'). $$

This property can be exploited for more efficient calculation of the optimal value function. (See {% cite Smith2004-HSVI %} for how exactly one can do this, or for other methods in their Fig. 8 that also make use of this property.) It also means that you cannot ever get more value by knowing less.[^3] (Of course, not _any_ value function is convex: take for example the policy that's optimal everywhere but in a single belief state $$b$$, where it does something “stupid”.)

[^3]: Although the original paper {% cite Kaelbling1998-POMDP %} used a finite POMDP, the proof only needs minor modifications to apply for infinite POMDPs.

For finite horizon _finite_ POMDPs, the $$V*$$ is piecewise linear.[^4] Sometimes, as we'll see in the example in the next section, $$V*$$ can be piecewise linear even with an infinite horizon. In either case, $$V*$$ can be approximated by a piecewise linear function arbitrarily closely.

[^4]: The proof follows from the same argument as that of convexity in {% cite Kaelbling1998-POMDP %}. I believe the requirement is that the observation and action spaces are finite -- the state space need not be.

# Tiger

The _Tiger_ problem was introduced in {% cite Kaelbling1998-POMDP %} for demonstration purposes.

- facing two rooms, behind one there's a tiger and behind the other a prize[^2], and sometimes you hear tiger noise; goal is to pick the prize;

[^3]: _The prize can be modeled as a goat because it's easier to tame._

Some actions change the

This POMDP has the property that the optimal infinite-horizon value function has a finite number of linear segments.

# Relation to an MDP

It is interesting to think

# Questions

Which policies can be represented by a finite state controller?

Can the value function be estimated efficiently with Monte Carlo methods? In many problems – e.g. in planning – we're interested in the value function only for a single belief state at every time step.

We've got universal function estimators in the form of deep neural networks, which functions are piecewise linear if the activation functions are ReLUs everywhere. Convexity could be ensured by changing $$λ \cdot $$.

# References

{% bibliography --cited %}

# Footnotes
