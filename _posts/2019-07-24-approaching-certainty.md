---
layout: post
title: "Bayesian inference: Approaching certainty through sampling"
categories: math
tags: statistics, Bayes, sampling
description: "Analysis of a slightly incorrect statement from BDA3: if all of the 1000 draws from Bernoulli(p) are 1, what are likely values of p?"
latex: true
---

_Bayesian Data Analysis_ from Gelman et al. (2013), in section 3.7, presents the statistical analysis of a bioassay experiment. The parameters of the model are $$(\alpha, \beta)$$, and we draw samples from the numerically calculated posterior. Then the authors write:

> All of the 1000 simulation draws had positive values of $$\beta$$, so the posterior probability that $$\beta > 0$$ is roughly estimated to exceed 0.999.

I thought this 0.999 figure is an overestimate; I analyze this question in this post.

<!--more-->

## Analysis

The event “$$\beta > 0$$” is a Bernoulli-distributed random variable; let's denote it with $$x \sim \text{Bernoulli}(\theta)$$. If we draw $$S$$ samples from $$x$$ (and denote the results with $$x_i$$), the conditional probability distribution of $$p(\theta \given \{x_i\})$$ is described by the following directed graphical model:

![Bayes net for x_i and theta](dgm-theta.svg)

The node for $$x_i$$ is filled because it's observed, and the plate represents $$S$$ copies of this node (with $$i$$ ranging from $$1$$ to $$S$$).

If $$n_1$$ (resp. $$n_0$$) denote the number of samples where $$x_i$$ is true (resp. false), the likelihood is described by:

$$p(\{x_i\} \given \theta) = \text{Binomial}(n_1 \given n = S, p = \theta).$$

We can assume a noninformative uniform prior on the probability $$\theta$$ on the unit interval. A Beta prior is conjugate to the Bernoulli likelihood, and $$p(\theta) = \text{Beta}(\theta \given \alpha_0 = 1, \beta_0 = 1) = \text{Uniform}(\theta \given a = 0, b = 1)$$, and this results in the following posterior:

$$p(\theta \given \{x_i\}) = \text{Beta}(\theta \given \alpha_0 + n_0, \beta_0 + n_1).$$

With $$n_1 = 1000$$ and $$n_0 = 0$$, this amounts to a $$\text{Beta}(1001, 1)$$ distribution, whose [pdf](https://en.wikipedia.org/wiki/Beta_distribution#Probability_density_function) is as such:

![Pdf of Beta(1001,1)](beta-1000-pdf-big.svg)

As expected, most of the probability mass is close to 1.0. But that graph is not very legible, so let's zoom in on the right end of the _x_ axis:

![Pdf of Beta(1001,1) in \[.99,1.0\] interval](beta-1000-pdf-zoomed.svg)

The red line marks the mean of the distribution, which is approximately $$0.999$$, but not nearly all of the probability mass is on the right side of $$0.999$$. Using the [cdf](https://en.wikipedia.org/wiki/Cumulative_distribution_function) of the posterior, we have that

$$P(\theta > 0.999) = 0.63,$$

meaning there's still a 1 in 3 chance that the posterior probability that $$\beta > 0$$ does _not_ exceed $$0.999$$. To be fair, **$$0.999$$ is still good for a “rough estimate”**, unless one has a strong prior for $$\beta < 0$$. (Given the nature of the experiment and the meaning of the parameter $$\beta$$ -- the toxicity of a compound --, a flat prior on “$$\beta > 0$$” is reasonable.)

### Presidential elections

A similar statement was made for 1988 pre-election polls, on page 70:

> All of the 1000 simulations $$\theta_1 > \theta_2$$; thus, the estimated posterior probability that Bush had more support than Dukakis in the survey population is over 99.9%.

When a presidential election is won “by a landslide”, that rarely means more than a 60-40% results; so in this case, I would rather use a prior that puts more mass on results close to 50-50%, for example $$\text{Beta}(10,10)$$:

![Pdf of Beta(10,10)](beta-10-pdf.svg)

This results in the following posterior:

![Pdf of Beta(1010,10)](beta-1010-pdf.svg)

So in this case, the crude estimate does does not suffice, and we should rather be only 98% certain. (This is a 20-fold difference, $$(1-.98)/(1-0.999)$$, and a well-calibrated [superforecaster](https://goodjudgment.com/philip-tetlocks-10-commandments-of-superforecasting/) could tell them apart.) If the stakes are high, then refine your model, and draw more samples.

## Conclusion

The meaning of 1000 true + 0 false simulations depends on your prior beliefs: the posterior mean could be 0.999 (with a uniform prior), or anything less than 0.99 (with a prior weighted more towards the center or zero).

I love BDA3; I'm nowhere near finished, but even the first chapters have taught me new ideas and proofs (e.g. the Bayesian cookbook in section 3.8, or modeling normal data with unknown mean _and_ variance). The examples and exercises are a great combination of applications and theory. As you can see from this post, all I can do is nitpick some tiny details. A quick intro to practical Bayesian modeling is a [presentation from Andrew Gelman](https://www.youtube.com/watch?v=T1gYvX5c2sM).

Did you like this post, did I make a mistake, or do you know a BDA3 discussion group? Let me know in the comments below!

## Code

```python
import math
import numpy as np
import scipy.stats as st
import matplotlib.pyplot as plt
from IPython.display import set_matplotlib_formats

%matplotlib inline
set_matplotlib_formats('svg')
```


```python
posterior = st.beta(1001,1)
```


```python
def plot_beta(xs, rv, alpha=1001, beta=1, **plot_kwargs):
    plt.plot(xs, rv.pdf(xs), label='pdf', **plot_kwargs)
    plt.gca().set_xlim(xs[[0,-1]])
    plt.gca().set_ylim(0)
    plt.xlabel("θ")
    plt.ylabel("Probability density function")
    plt.title(f"Pdf of Beta(θ | α = {alpha}, β = {beta})")
    plt.grid(True, alpha=0.5)
```


```python
plot_beta(np.linspace(0,1,1000), posterior)
plt.gca().set_ylim(-10)
plt.gca().set_xlim(-0.01, 1.01)
plt.savefig("beta-1000-pdf-big.svg")
plt.show()
```


![svg](beta-1000-pdf-big.svg)



```python
def ramanujan(n):
    """Series that converges to 1/π at an exponential rate,
    by Srinivasa Ramanujan"""
    return 8**.5 / 9801 * sum(math.factorial(4*k)
                               / math.factorial(k)**4
                               / 396**(4*k)
                               * (1103 + 26390*k)
                              for k in range(0, n))

for i in range(1,4):
    print(f"1/ramanujan({i}) - π ≈ {1/ramanujan(i) - math.pi:.2e}")

# Easter egg. Thanks for reading!
```

> 1/ramanujan(1) - π ≈ 7.64e-08
>
> 1/ramanujan(2) - π ≈ 4.44e-16
>
> 1/ramanujan(3) - π ≈ 0.00e+00



```python
plot_beta(np.linspace(0.990,1.0,1000), posterior)
plt.vlines(posterior.mean(), 0, plt.gca().get_ylim()[1], color='r', lw=1, label='mean')
plt.gca().legend(loc='upper left')
plt.savefig("beta-1000-pdf-zoomed.svg")
plt.show()
```


![svg](beta-1000-pdf-zoomed.svg)



```python
posterior.mean()
```




> 0.999001996007984




```python
print('P(θ > 0.999) = {:d}%'.format(int(100*(1-posterior.cdf(0.999)))))
```




> P(θ > 0.999) = 63%




```python
print('P(θ > 0.998) = {:d}%'.format(int(100*(1-posterior.cdf(0.998)))))
```




> P(θ > 0.998) = 86%



## References

Andrew Gelman, John Carlin, Hal Stern, David Dunson, Aki Vehtari, and Donald Rubin. 2013. _Bayesian Data Analysis: Third Edition_. [Official webpage](http://www.stat.columbia.edu/~gelman/book/)
