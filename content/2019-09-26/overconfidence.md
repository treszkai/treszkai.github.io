---
title: On the overconfidence of modern neural networks
category: AI
summary: Evaluating various methods to improve the calibration of deep neural networks.
---

*On the overconfidence of modern neural networks*. This is the title of the coursework I did with a fellow student at the University of Edinburgh. (PDF: [Part 1](mlp-cw3.pdf), [Part 2](mlp-cw4.pdf).)

Our topic was influenced by a previous study, titled _On Calibration of Modern Neural Networks_ <!-- {% cite Guo2017-calibration %} --> <a class="citation" href="#Guo2017-calibration">(Guo, Pleiss, Sun, &amp; Weinberger, 2017)</a>.

Applications of uncertainty estimation include threshold-based outlier detection, active learning, uncertainty-driven exploration of reinforcement learning, or certain safety-critical applications.

## What is uncertainty?

No computer vision system is perfect, so an image classification algorithm sometimes identifies people as not-people, or not-people as people.
While we usually care about the class with the highest output (the “most likely” class), we can treat the softmax outputs of a classifier as uncertainty estimates.
(After all, that is how we trained a model when treating the softmax outputs of a classifier as a probability distribution, and minimizing the negative log likelihood of the model given the data.)
For example, out of 1000 classifications made with an output of 0.8, approximately 800 should be correct _if the system is well-calibrated_.

![Example output of a YOLO object detection network]({attach}yolo.png)

(Example output of a YOLO object detection network, with the probability estimates. Image source: [Analytics Vidhya](https://www.analyticsvidhya.com/blog/2018/12/practical-guide-object-detection-yolo-framewor-python/).)

Ideally, we want our system to be 100% correct, but we rarely have access to an all-knowing Oracle. In cases where it is hard to distinguish between two categories (like on the cat-dog below) we want the uncertainties to be well-calibrated, so that predictions are neither overly confident nor insufficiently confident.

![Image of a cat that could be mistaken for a dog]({attach}catdog.jpeg)

(Image source: Google Brain)



## Our results

### Interim report

[Link to report (PDF)](mlp-cw3.pdf)

Our initial experiments showed that our baseline model is already well-calibrated when trained on the EMNIST By-Class dataset.
Calibration worsened when we used only a subset of the training set.
We found that increasing regularization increases calibration, but too much regularization leads to a decrease in both accuracy and calibration. (See figure below.)
This contradicts the findings of <!-- {% cite Guo2017-calibration -L section -l 3 %} --> <a class="citation" href="#Guo2017-calibration">(Guo, Pleiss, Sun, &amp; Weinberger, 2017, sec. 3)</a>, who found that model calibration can improve by increasing the weight decay constant, well after the model achieves minimum classification accuracy.
One of our main findings is that cross-entropy error is not a good indicator of model calibration.

![Figure 5 of our interim report.]({attach}mlp-cw3-fig5.png)

(ECE: expected calibration error. The lower the better.)

### Final report

[Link to report (PDF)](mlp-cw4.pdf)

We replicate the findings of <!-- {% cite Guo2017-calibration %} --> <a class="citation" href="#Guo2017-calibration">(Guo, Pleiss, Sun, &amp; Weinberger, 2017)</a>£ that deep neural networks achieve higher accuracy but worse calibration than shallow nets, and compare different approaches for improving the calibration of neural networks (see figure below). As the baseline approach, we consider the calibration of the softmax outputs from a single network; this is compared to _deep ensembles_, _MC dropout_, and _concrete dropout_. Through experiments on the CIFAR-100 data set, we find that a large neural network can be significantly over-confident about its predictions. We show on a classification problem that an ensemble of deep networks has better classification accuracy and calibration compared to a single network, and that MC dropout and concrete dropout significantly improve the calibration of a large network.

![Confidence and calibration plots for BigNet. (Figure 2 of our report)]({attach}mlp-cw4-fig2.png)

(_Top row:_ confidence plots for a deep neural net. The more skewed to the right, the better. _Bottom row:_ corresponding calibration plots. The more close to the diagonal, the better.)

## Things I would do differently

With a little more experience behind my back now, I would make the following changes in experiment design and writing the report:
 - _Use a validation set._ We only used a training set because we trained for minimum error, and we expected _calibration_ to be independent from _accuracy_, but that is a strong assumption (and likely incorrect, seeing our results in the interim report).
 - _Use better biblography sources._ Instead of Google Scholar, I would search [DBLP](https://dblp.uni-trier.de/), where the information is more correct and consistent.
 - _Use pastel colors._ I let my collaborator have it his way, but ever since this submission I’m having nightmares in purple and glowing green :D

In future work, I would like to test the calibration of a Bayesian neural network, where the weights of the network have a probability distribution instead of a point estimate.

## References

<!-- {% bibliography --cited %} -->
<ol class="bibliography"><li><span id="Guo2017-calibration">Guo, C., Pleiss, G., Sun, Y., &amp; Weinberger, K. Q. (2017). On Calibration of Modern Neural Networks. In D. Precup &amp; Y. W. Teh (Eds.), <i>Proceedings of the 34th International Conference on Machine Learning</i> (Vol. 70, pp. 1321–1330). International Convention Centre, Sydney, Australia: PMLR. Retrieved from http://proceedings.mlr.press/v70/guo17a.html</span></li></ol>

