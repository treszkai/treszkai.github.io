---
title: Estimating chance of COVID transmission from population-level data
summary: If N people get infected per day in a country with susceptible population size S, then doing "average" activities has approximately an N/S risk of contracting it daily.
---

## Introduction

The [microCOVID tool](https://www.microcovid.org) is great for estimating the chances of contracting COVID during a given activity.[^1] It does so by estimating the risk of transmission of various activities from literature data, combining this with an estimate of a met person being COVID+.

[^1]: It also introduces a COVID budget that you can allocate as you wish: if you target a 1% chance of contracting COVID in a year, then you have 200 microCOVIDs allocated for each week. (0.01 / 50 = 0.0002.) Spend it wisely.

Here, I'm assuming that every citizen of the country does exactly the same on a given day, which leads to the current infection rate. This means that if you do the same activities as "everyone else", you'll have the same chance of getting infected as "everyone else".

Caveat: these are all back-of-the-envelope calculations of an _extremely_ simplistic model.

## The numbers

Let's run the numbers of this model [on Hungary, on January 6, 2021](https://en.wikipedia.org/w/index.php?title=COVID-19_pandemic_in_Hungary&oldid=998710968).

- New cases (average of 7 days): 1746/day
- Recovered: 180,000
- Population ([^kids]): 9,770,000
- Susceptible ([^2]): population - recovered = 9,590,000

[^kids]: Before the [501.V2 variant of the virus](https://en.wikipedia.org/wiki/501.V2_variant), kids did not play a significant role in the transmission and hospitalization, therefore minors could be (could have been) deducted from the susceptible population.

One might argue[^3] that the actual case count is higher than those tested positive, but I assume those that do not make the books are not severe enough to warrant a test. When doing the calculating for an at-risk person, the prevalence _should be_ adjusted.

[^2]: microCOVID seems to compare the case count against the entire population. I count a recovered person as not immune to the virus.

[^3]: In Hungary, the reported prevalence is 0.12%, but microCOVID uses an adjusted prevalence of 0.39%. This correction of 3x my model should use too.

That means that for the "average" person, the chance of becoming infected is 1,746 / 9,590,000 / day = 182 microCOVID / day.

Note that this "average" person does not refer to the most common person (the mode) or the median; but literally this Average Joe making up the entire 10 million population of the country. In this model, everyone is equal. (And nobody more equal than the others.)

Act like this average person for an entire year (assume January 6 conditions all year long), and you have 6.4% chance of contracting the disease. (Because of course, every day of the year is equal.)

## Comparing with microCOVID

I [tried to simulate](https://www.microcovid.org/?distance=sixFt&duration=480&interaction=oneTime&personCount=1&riskProfile=average&setting=indoor&theirMask=basic&topLocation=Hungary&voice=normal&yourMask=basic) the working day of the "average" citizen.

One-time interaction (daily)

- for 8 hours
- with 1 person
- at 6+ feet / 2+ meters
- indoors
- cotton mask or bandana on me[^5] and on them[^6]
- having normal conversation.

[^5]: You should totally buy an FFP-2 mask and fit it snugly to your face. If you wear it for long periods then buy a handful and rotate them daily. Dispose after one month. Adjust numbers as budget allows, but _buy one good mask_. This does not constitute medical advice.

[^6]: Convince your employer to buy every employee an FFP-2 mask. The less time you spend on sick leave, the better it is for them.

This adds up to 200 microCOVID each day. That's surprisingly close to my figure! I pinky-swear that I first picked these settings based on a gut feeling, and didn't adjust them to approximate 182 microCOVID.

Obviously, changing the settings will move the risk away from 200 μCOVID/day, but the fact that these two models are in the same ballpark is good validation.

## Future research

The model could be extended in the following ways:

 - don't assume a homogeneous population
 - calculate risk based on your activity profile

## Footnotes
