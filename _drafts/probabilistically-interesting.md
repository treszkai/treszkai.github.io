---
layout: post
title:  "Probabilistically interesting planning problems"
categories: AI
---

This post briefly describes the problem of _probabilistic planning_, and explains what makes a planning problem _probabilistically interesting_, along with some examples. I'm writing my master's thesis on this topic, but I haven't done any research yet in this area.

# Primer on probabilistic planning

In a nutshell, planning is about _finding a way to win_, and as such, the field of research on planners is vast. However, there is no single textbook definition of “planning”, so I'll try to be as general as possible. Planning is about finding a path from a given initial state of the environment to a goal state. There are multiple approaches to describe the environment; for example with the situation calculus, or more commonly as a [Markov decision process (MDP)](https://en.wikipedia.org/wiki/Markov_decision_process). In probabilistic planning problems the functions describing the MDP are not necessarily deterministic (usually it is only the transition function that is stochastic). In contrast with the _control problem_ of [reinforcement learning](http://www.scholarpedia.org/article/Reinforcement_learning) which seeks to find an optimal _policy_ (i.e. a mapping from states to actions), in planning one is interested only in a partial policy that brings the agent closer to a goal state, or frequently only a single action from the current state that brings the agent closer to a goal state. An example planning problem: “Siri, show me a way to the library.” Then Siri responds either with a plan that I can follow from start to finish, or only an action that I can take right now (“go forward 100 meters”).

Graphical representation of an example MDP:
![Graphical representation of an example MDP](/files/evnkGXGH-MDP-env.jpg)

An example policy for the same MDP:
![An example policy for the same MDP](/files/evnkGXGH-MDP-policy.jpg)

An example plan for the same MDP:
![An example plan for the same MDP](/files/evnkGXGH-MDP-plan.jpg)

The approach taken by a planner differs based on the discounting factor \\( \gamma \\) and the distribution of rewards. In a _shortest path problem_ the future rewards are discounted (\\( 0 < \gamma < 1 \\)), and there might be a constant negative reward for every step taken. Together with a positive reward in goal states, an agent with the goal of maximizing return – i.e. the sum of discounted expected future rewards – has incentives to minimize the length of the path to the goal. However, if there is no discounting (\\(\gamma = 1 \\)) and there's a positive reward only in the goal states, it is sufficient for the agent to find _any_ way to the goal. (Some call these _goal-based problems_ [[Yook et al., 2008]](https://engineering.purdue.edu/~givan/papers/aaai08-sy.pdf).) In the next section we'll see that not all plans are created equal, so even in the non-discounted case we want one that ends up in a goal state with the highest probability.

In an _offline_ approach to deterministic planning problems, a planner is given an environment, initial state and goal state, and it needs to return a sequence of actions that brings the environment to the goal state. However, this offline approach does not work for probabilistic problems, where the outcome of an action is not always in our control. Hence a probabilistic planner is usually executed _online_: it makes an observation (e.g. the current state of the environment, in the fully observable case), does some magic, and outputs a single action that brings the agent closer to a goal state. Nature brings the agent to a new state, not necessarily the one you desired, and these steps are repeated, until you run out of time or end up at a goal.

The IPPC organized planning competitions since XX, Probabilistic planning is
IPPC2004, and why a replanner could win. TODO
FF-replan simplifies the probabilistic planning problem into a deterministic one

# Probabilistically interesting planning problems

Iain Little and Sylvie Thiébaux defined the notion of “probabilistically interesting” planning problems [[Little and Thiébaux, 2007]](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.144.1163). They gave necessary and sufficient conditions for a probabilistic planning problem to be _probabilistically interesting_: if a planning problem fulfills these conditions, then a planner that determinizes the problem will lose crucial information, and will do worse than a probabilistic planner. In this section I'll summarize these conditions in natural language, slightly diverging from the vocabulary of the paper. For formal definitions and more examples, please refer to the [original paper](http://users.cecs.anu.edu.au/~iain/icaps07.pdf), it is an interesting read.

Criterion 1: there are multiple paths from the start to the goal. If there is only a single path, then any planner that finds _a_ path will do equally good, as this will be the only one.

TODO: examples of problems that fail crit. 1/2/3a/b/c

Criterion 2: where the above two paths diverge, there is a choice about which way to go, i.e. a state \\(s_{crossroads}\\) from which action \\(a_1\\) leads to one road with a different probability than action \\(a_2\\) does. (Yes, this is a sufficient condition for the first criterion.) If it's only luck that separates the two paths, then the agent doesn't have much of a choice to do better.

Criterion 3: there must be a non-trivially avoidable dead end in the environment. A _dead end_ is an absorbing state that is not a goal state, i.e. a state from which there is no path to any goal state. For a dead end to be _avoidable_, there must be a state \\(s_{crossroads}\\) with at least two possible actions \\(a_{deadly}\\) and \\(a_{winning}\\), such that executing \\(a_{deadly}\\) brings the agent to the dead end with a higher probability than executing \\(a_{winning}\\). A dead end is _non-trivially avoidable_ if \\(s_{crossroads}\\) is on a path from the initial state to a goal state, and there is a non-zero chance of reaching a goal state after executing either \\(a_{winning}\\) or \\(a_{deadly}\\).



# Example planning problems

A very simple problem that is probabilistically interesting is what the authors call `climber`, described by the following story:

> You are stuck on a roof because the ladder you climbed up on fell down. There are plenty of people around; if you call out for help someone will certainly lift the ladder up again. Or you can try to climb down without it. You aren’t a very good climber though, so there is a 40% chance that you will fall and break your neck if you do it alone. What do you do?

Graphical representation of the `climber` problem:
![Graphical representation of the climber problem](/files/evnkGXGH-climber-orig.jpg)

Compilation of the climber problem according to REPLAN1:
![Compilation of the climber problem according to REPLAN1](/files/evnkGXGH-climber-det1.jpg)

Compilation of the climber problem according to REPLAN2(shortest):
![Compilation of the climber problem according to REPLAN2(shortest)](/files/evnkGXGH-climber-det2.jpg)

Compilation of the climber problem according to REPLAN2(most-likely):
![Compilation of the climber problem according to REPLAN2(most-likely)](/files/evnkGXGH-climber-det3.jpg)

# Summary

TODO
