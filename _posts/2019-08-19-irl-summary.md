---
layout: post
title: "Paper summary: Abbeel, Ng: Inverse Reinforcement Learning (2004)"
categories: ML
description: "Summary of the seminal paper on inverse reinforcement learning."
latex: true
---

This post is a summary of the seminal paper on inverse reinforcement learning: Pieter Abbeel, Andrew Y. Ng: _Apprenticeship Learning via Inverse Reinforcement Learning_ (2004) [[link](http://ai.stanford.edu/~pabbeel/irl/)].

Traditional [reinforcement learning](http://www0.cs.ucl.ac.uk/staff/D.Silver/web/Teaching.html) (RL) starts with specifying a reward function, and during training we search for policies that maximize this reward function[^1]. In contrast, inverse reinforcement learning (IRL) starts with expert demonstrations of the desired behavior, infers a reward function that the expert likely followed, and trains a policy to maximize that.

<!-- more -->

[^1]: Or, more accurately, a policy that maximizes the expected utility derived from this reward function and some method of temporal discounting.

IRL is useful for learning complex tasks where it is hard to manually specify a reward function that makes desirable trade-offs between desiderata; such tasks include driving a car or teaching a robot to do a backflip, where we want the car to reach to the destination promptly but also safely, or the robot to flip with its arms straight and [sticking the landing](https://youtu.be/xet3KDUfS_U?t=50).

In contrast with previous attempts at apprenticeship learning (i.e. learning from an expert), which tried to mimic the expert demonstrations directly, IRL assumes that the expert follows a reward function that is a linear combination of the feature vectors ($$R = w^T φ(s)$$), and finds a reward function that maximizes the received reward under the set of demonstrations. The hand-specified function $$φ: S→ℝ^k$$ maps a state of the Markov decision process (MDP) to a feature vector, which vector includes parameters for the different desiderata of the task, such as the distances to objects surrounding the car, the speed of the car, or the current lane.

IRL assumes knowledge of an expert policy $$π_E$$, or at least samples from it. Using these, we only care about the estimated "accumulated feature values", $$μ(π_E) ∈ ℝ^k$$, which is the expected discounted sum of the feature vectors if sampled from the policy, because then the value of a policy (parametrised by $$w$$) can be calculated from it directly: $$R = w^T μ(π_E)$$.

The goal is then to find a policy whose performance is close to that of the expert's on the unknown reward function $$R_{\star} = w^T_{\star} φ$$. This is done by finding a policy whose feature vector is close to the expert's feature vector, which assures that the value of these policies is close too.

The algorithm for IRL is the following:
 1. Pick a random initial policy, and calculate its $$μ$$.
 2. Find the vector of weights w that lies within the unit ball and _maximizes_ the difference between the expert feature expectations and the feature expectations of our best policy thus far.
 3. If this maximum is small, then go to step 7.
 4. Otherwise $$w$$ is our new weights for $$R$$.
 5. Calculate optimal policy for this $$R$$.
 6. Repeat from step 2.
 7. Let the agent designer pick a policy from any of those found in step 5 in the different iterations; or find the policy in the convex closure of these policies that is closest to the expert policy.

The maximization in step 2 allows us to find a policy that is close to the expert's, regardless of the choice of a reward function. After all, we are interested in the policy, not the reward function, and so the estimated $$R$$ is not necessarily correct.

This algorithm is proved to terminate within $$O(k \log(k))$$ steps, using at least $$O(k \log(k))$$ number of samples from the expert policy.

Experiments are done in a gridworld environment, where IRL learns the expert policy in approximately 100 times less sample trajectories than simply mimicking the expert. Another experiment is a car driving simulator with 3 lanes viewed from the top, where IRL is capable of learning multiple driving styles, such as "prefer the right lane but avoid collisions". Video demonstrations of the latter show that the sentiment of the expert policy is indeed followed, although sometimes with unnecessary lane switches (most modern RL algorithms also exhibit this undesired property).

#### Footnotes
