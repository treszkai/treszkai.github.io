---
layout: post
title:  "To shuffle or not to shuffle?"
date:   2018-02-22 12:05:23+0000
categories: ML
---

Should Keras shuffle the dataset for the user? Should it split the dataset into training/validation/test sets? Should the shuffling be done before or after the split?

In my opinion it doesn't matter, as long as it is _consistent._ I just found out that despite Keras examples claiming that they load the dataset "shuffled and split between train and test sets," the MNIST and CIFAR-10 dataset loaders are completely deterministic.

Furthermore, in the MNIST examples, the pattern is this: train on the training set of 60k examples, calculate model performance on the test set of 10k examples, and then... compare the different models using the same test set? I wonder, is it standard among researchers to not use a validation set, when it is not given by default? Just like how people leave their choice to become organ donors at the default option? _[citation-needed]_

So, opened [a pull request](https://github.com/keras-team/keras/pull/9453) so that _at least_ the examples match reality. Pull request merged, but the inconsistency among datasets remains. I expect people's opinion to be split between shuffling options.
