---
layout: post
title:  "Probabilistically interesting planning problems"
categories: AI
description: This post briefly describes the problem of probabilistic planning, and explains what makes a planning problem “probabilistically interesting”.

---

This post briefly describes the problem of _probabilistic planning_, and explains what makes a planning problem _probabilistically interesting_, along with some examples.

# Primer on probabilistic planning

In a nutshell, planning is about _finding a way to win_, and as such, the field of research on planners is vast. However, there is no single textbook definition of “planning”, so in this post I'll try to be as general as possible. One description of a planning problem could be: given a description of an environment, find a sequence of actions that brings the environment from the initial state of the environment to a goal state. There are multiple ways to describe the environment: for example in formal logic with the [situation calculus](https://en.wikipedia.org/wiki/Situation_calculus), or more commonly as a [Markov decision process (MDP)](https://en.wikipedia.org/wiki/Markov_decision_process). In probabilistic planning problems, the functions describing the MDP are not necessarily deterministic: executing action $$a$$ in state $$s$$ will bring the environment to state $$s'$$ with a probability of $$T(s,a,s')$$. In contrast with the _control problem_ of reinforcement learning, where the goal is to find an optimal _policy_ (i.e. a mapping from states to actions), in planning one is interested only in a partial policy that brings the agent closer to a goal state, or frequently only a single action that brings the agent closer to a goal state from the current state. An example planning problem is thus: “Siri, show me a way to the library.” Then Siri responds either with a plan that I can follow from the first step to the last (i.e. a route from start to finish), or only an action that I can take right now (“go forward 100 meters”).

Graphical representation of an example MDP:

![Graphical representation of an example MDP](/files/probabilistically-interesting/MDP-env.jpg)

An example policy for the same MDP:

![An example policy for the same MDP](/files/probabilistically-interesting/MDP-policy.jpg)

An example plan for the same MDP:

![An example plan for the same MDP](/files/probabilistically-interesting/MDP-plan.jpg)

The approach taken by a planner differs based on the discounting factor \\( \gamma \\) and the distribution of rewards. In a _shortest path problem_ the future rewards are discounted (\\( 0 < \gamma < 1 \\)), and there might be a constant negative reward for every step taken. Together with a positive reward in goal states, an agent with the goal of maximizing return – i.e. the sum of discounted expected future rewards – has incentives to minimize the length of the path to the goal. However, if there is no discounting (\\(\gamma = 1 \\)) and there's a positive reward only in the goal states, it is sufficient for the agent to find _any_ way to the goal. (Some call these _goal-based problems_ <a href="#Yoon2008-probabilistic-planning">(Yoon, Fern, Givan, &amp; Kambhampati, 2008)</a>.) In the next section we'll see that not all plans are created equal, so even in the non-discounted case we want one that ends up in a goal state with the highest probability.

In an _offline_ approach to deterministic planning problems, a planner is given an environment, initial state and goal state, and it needs to return a sequence of actions that brings the environment to the goal state. However, this offline approach does not work for probabilistic problems, where the outcome of an action is not always in our control. Hence a probabilistic planner is usually executed _online_: it makes an observation (e.g. the current state of the environment, in the fully observable case), does some magic, and outputs a single action that brings the agent closer to a goal state. Nature brings the agent to a new state, not necessarily the one you desired, and these steps are repeated, until you run out of time or end up at a goal.

Since the fourth [International Planning Competition](http://icaps-conference.org/index.php/Main/Competitions) in 2004 hosted by the ICAPS (International Conference on Automated Planning and Scheduling), this event featured a probabilistic track. The winner of IPPC 2004 was FF-Replan, a planner that simplifies the probabilistic planning problem into a deterministic one by not considering the multiple potential effects of an action <a href="#Yoon2007-FF-replan">(Yoon, Fern, &amp; Givan, 2007)</a> – hence the title of the paper, “FF-Replan: A Baseline for Probabilistic Planning.”

# Probabilistically interesting planning problems

Iain Little and Sylvie Thiébaux analyzed the common characteristics of planning problems that can and cannot be optimally solved by a planner like FF-Replan <a href="#Little2007-probabilistic-planning">(Little &amp; Thiébaux, 2007)</a>. They gave necessary and sufficient conditions for a probabilistic planning problem to be _probabilistically interesting_: on a problem fulfilling these conditions, a planner that determinizes the problem will lose crucial information, and will do worse than a probabilistic planner. In this section I'll summarize these conditions using natural language, slightly diverging from the vocabulary of the paper. For formal definitions and more examples, see the [original paper](http://users.cecs.anu.edu.au/~iain/icaps07.pdf); it is an interesting read.

_Criterion 1:_ there are multiple paths from the start to the goal. If there is only a single path, then any planner that finds _a_ path will do equally good, as this will be the only one.

Counterexample:

![Graphical description of an MDP with a single goal trajectory](/files/probabilistically-interesting/counter-1.png)

_Criterion 2:_ where the above two paths diverge, there is a choice about which way to go, i.e. a state \\(s_{crossroads}\\) from which action \\(a_1\\) leads to one road with a different probability than action \\(a_2\\) does. (Yes, this is a sufficient condition for the first criterion.) If it's only luck that separates the two paths, then the agent doesn't have much of a choice to do better.

Counterexample:

![MDP with skill doesn't help](/files/probabilistically-interesting/counter-2.png)

_Criterion 3:_ there must be a non-trivially avoidable dead end in the environment. A _dead end_ is an absorbing state that is not a goal state, i.e. a state from which there is no path to any goal state. For a dead end to be _avoidable_, there must be a state \\(s_{crossroads}\\) with at least two possible actions \\(a_{deadly}\\) and \\(a_{winning}\\), such that executing \\(a_{deadly}\\) brings the agent to the dead end with a higher probability than executing \\(a_{winning}\\). A dead end is _non-trivially avoidable_ if \\(s_{crossroads}\\) is on a path from the initial state to a goal state, and there is a non-zero chance of reaching a goal state after executing either \\(a_{winning}\\) or \\(a_{deadly}\\).

Counterexample: the probabilistic version of Blocksworld, where the worst case scenario is that a block is dropped accidentally, does not contain dead ends; the environment is irreducible. (This was an actual problem of IPPC 2004.)

![Probabilistic Blocks world](/files/probabilistically-interesting/blocksworld.png)

Counterexample: all dead ends are unavoidable.

![MDP with no avoidable dead end](/files/probabilistically-interesting/counter-3b.png)

Counterexample: all dead ends are trivially avoidable.

![MDP with only trivially avoidable dead ends](/files/probabilistically-interesting/counter-3c.png)


# A simple yet “interesting” planning problem

A very simple problem that is probabilistically interesting is what the authors call `climber`, described by the following story:

> You are stuck on a roof because the ladder you climbed up on fell down. There are plenty of people around; if you call out for help someone will certainly lift the ladder up again. Or you can try to climb down without it. You aren’t a very good climber though, so there is a 40% chance that you will fall and break your neck if you do it alone. What do you do?

Graphical representation of the `climber` problem:
![Graphical representation of the climber problem](/files/probabilistically-interesting/climber-orig.jpg)

Despite the simplicity of this problem, most methods to turn it into a deterministic problem fail. Little and Thiébaux described 3 ways to determinize a problem, and they called a resulting deteministic problem a “compilation”.

The _REPLAN1_ approach simply drops all but the most likely outcome of every action, and finds the shortest goal trajectory. (This was the approach used by FF-Replan.) Compilation of the climber problem according to REPLAN1:

![Compilation of the climber problem according to REPLAN1](/files/probabilistically-interesting/climber-det1.jpg)

_REPLAN2(shortest)_ turns every possible probabilistic outcome of an action into the outcome of a deterministic action, each with a cost of 1. Optimizing for smallest cost thus finds the _shortest_ goal trajectory, but this might not be the one with the highest success probability. Compilation of the climber problem according to REPLAN2(shortest):

![Compilation of the climber problem according to REPLAN2(shortest)](/files/probabilistically-interesting/climber-det2.jpg)

_REPLAN2(most-likely)_ also turns every outcome into a separate deterministic action, but the new action costs are the negative log probability of the relevant outcome. This is the only compilation of the problem that finds the optimal path for `climber`, but for many other problems even this one will be suboptimal. The resulting compilation is as follows:

![Compilation of the climber problem according to REPLAN2(most-likely)](/files/probabilistically-interesting/climber-det3.jpg)

# Summary

Finding the optimal goal trajectory in a probabilistic planning problem is computationally expensive, so most planners use some heuristics. One way to plan in a stochastic environment is to change the probabilistic planning problem into a deterministic shortest path problem and replan after (almost) every step, which is computationally efficient, but in many cases suboptimal. This article outlined the attributes of probabilistically interesting problems, where the deterministic replanning approach often fails. As such, recent probabilistic planners use more complicated methods (or often a portfolio of probabilistic planners), but replanners remain a good baseline to compare against.

# References


<ol class="bibliography"><li><span id="Little2007-probabilistic-planning">Little, I., &amp; Thiébaux, S. (2007). Probabilistic planning vs. replanning. <i>Workshop, ICAPS 2007</i>. Retrieved from http://users.cecs.anu.edu.au/ iain/icaps07.pdf</span></li>
<li><span id="Yoon2007-FF-replan">Yoon, S. W., Fern, A., &amp; Givan, R. (2007). FF-Replan: A Baseline for Probabilistic Planning. In M. S. Boddy, M. Fox, &amp; S. Thiébaux (Eds.), <i>Proceedings of the Seventeenth International Conference on Automated
               Planning and Scheduling, ICAPS 2007, Providence, Rhode Island, USA,
               September 22-26, 2007</i> (p. 352). AAAI. Retrieved from http://www.aaai.org/Library/ICAPS/2007/icaps07-045.php</span></li>
<li><span id="Yoon2008-probabilistic-planning">Yoon, S. W., Fern, A., Givan, R., &amp; Kambhampati, S. (2008). Probabilistic Planning via Determinization in Hindsight. In D. Fox &amp; C. P. Gomes (Eds.), <i>Proceedings of the Twenty-Third AAAI Conference on Artificial Intelligence,
               AAAI 2008, Chicago, Illinois, USA, July 13-17, 2008</i> (pp. 1010–1016). AAAI Press. Retrieved from http://www.aaai.org/Library/AAAI/2008/aaai08-160.php</span></li></ol>
