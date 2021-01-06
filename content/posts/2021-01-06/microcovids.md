---
title: Estimating chance of COVID transmission from population-level data
summary: If N people get infected per day in a country with susceptible population size S, then doing "average" activities has approximately an N/S risk of contracting it daily.
---

Caveat: these are all back-of-the-envelope calculations.

## Introduction

The [microCOVID tool](https://www.microcovid.org) is great for estimating the chances of contracting COVID during a given activity.[^1] It does so by estimating the risk of transmission of various activities from literature data, combining this with an estimate of a met person being COVID+.

[^1]: It also introduces a COVID budget that you can allocate as you wish: if you target a 1% chance of contracting COVID in a year, then you have 200 microCOVIDs allocated for each week. (0.01 / 50 = 0.0002.) Spend it wisely.

Here, I'm assuming that every citizen of the country does exactly the same on a given day, which leads to the current infection rate. This means that if you do the same activities as "everyone else", you'll have the same chance of getting infected as "everyone else".

## The numbers



## Future research

The model could be extended in the following ways:
 - don't assume a homogeneous population
 - calculate risk based on your activity profile


## Assumptions of microCOVID



## Other considerations

In Hungary, the reported prevalence is 0.12%, but microCOVID uses an adjusted prevalence of 0.39%. This correction of 3x my model should use too.

## Footnotes
