---
title: Estimating personal COVID risk from population-level data
summary: If N people get infected per day in a country with susceptible population size S, then doing "average" activities has approximately an N/S risk of contracting it daily.
---

**In a nutshell:** If _N_ people get infected per day in a country with susceptible population size _S_, then doing "average" activities has approximately an _N/S_ risk of contracting it on that day.

## Introduction

The [microCOVID tool](https://www.microcovid.org) is great for estimating the chances of contracting COVID-19 during a given activity.[^1] It does so by estimating the risk of transmission of various activities from literature data, combining this with an estimate of a met person being COVID-positive.

[^1]: It also introduces a COVID budget that you can allocate as you wish: if you target a 1% chance of contracting COVID in a year, then you have 200 microCOVIDs allocated for each week. (0.01 / 50 = 0.0002.) Spend it wisely.

In this post, I'm building a model which assumes that every citizen of the country acts exactly the same on a given day, which leads to the current infection rate. This means that if you do the same activities as "everyone else", you'll have the same chance of getting infected as "everyone else".

Caveat: these are all back-of-the-envelope calculations of an _extremely_ simplistic model.

## The numbers

Let's run the numbers of this model [on Hungary, on January 6, 2021](https://en.wikipedia.org/w/index.php?title=COVID-19_pandemic_in_Hungary&oldid=998710968).

- New cases (average of 7 days): 1746/day
- Recovered: 180,000
- Population ([^kids]): 9,770,000
- Susceptible ([^2]): population - recovered = 9,590,000

[^kids]: Until recently, kids did not play a significant role in the transmission and hospitalization, therefore minors could be (or could have been) deducted from the susceptible population.

One might argue[^3] that the actual case count is higher than those tested positive, but I assume cases which do not make the books are not severe enough to warrant a test. If your country doesn't seem to do enough tests (e.g. because the ratio of positive results per test is absurdly high), then the actual case count is surely higher. Older people seem to contract the disease more easily than kids, the prevalence could be adjusted for age.

[^2]: microCOVID seems to compare the case count against the entire population. I count a recovered person as not immune to the virus.

[^3]: In Hungary, the reported prevalence is 0.12%, but microCOVID uses an adjusted prevalence of 0.39%. This correction of 3x my model should use too.

That means that for the "average" person, the chance of becoming infected is 1,746 / 9,590,000 / day = 180 microCOVID / day.

Note that this "average" person does not refer to the most common person (the mode) or the median; but literally this Average Joe making up the entire 10 million population of the country. In this model, everyone is equal. (And nobody more equal than the others.)

Act like this average person for an entire year (assume January 6 conditions all year long), and you have 6% chance of contracting the disease. (Because of course, every day of the year is equal.)

## Comparing with microCOVID

I [tried to simulate](https://www.microcovid.org/?distance=sixFt&duration=480&interaction=oneTime&personCount=1&riskProfile=average&setting=indoor&theirMask=basic&topLocation=Hungary&voice=normal&yourMask=basic) the working day of the "average" citizen with the microCOVID tool. I did this using a one-time interaction (daily):

- for 8 hours
- with 1 person
- at 6+ feet / 2+ meters
- indoors
- cotton mask or bandana on me[^5] and on them[^6]
- having normal conversation.

[^5]: You should totally buy an FFP-2 mask and fit it snugly to your face. If you wear it for long periods then buy a handful and rotate them daily. Dispose after one month. Adjust numbers as budget allows, but _buy one good mask_. This does not constitute medical advice.

[^6]: Convince your employer to buy every employee an FFP-2 mask. The less time you spend on sick leave, the better it is for them.

This adds up to about 200 microCOVIDs each day. That's surprisingly close to my figure! I pinky-swear that I first picked these settings based on a gut feeling, and didn't adjust them to approximate 180 microCOVID.

Obviously, changing the settings will move the risk away from 200 μCOVID/day. Grocery shopping and spouses/kids/relatives should also be added to the list. But the fact that these two models are in the same ballpark is good validation.

## Conclusion

The super easy method for pandemic risk assessment:

1. Calculate the risk for the Average Citizen, by simply dividing the daily case increase[^avg] with the population size (whether that's a city or a country). Adjust this upwards if you think your country has insufficient testing practices.
2. Adjust this with some factors for how you think your behavior compares with the average. Working from home? Divide by 5. Doing grocery shopping online? Divide by 2. Meeting a dozen people at the office every day? Multiply by five. I'm just making these numbers up, but so can you. You should do this step _at the beginning_, to minimize fooling yourself.
3. Multiply this by 365 to get the risk of contracting the virus in a year[^year]. If you want to go fancy, use lower figures for the summer, higher ones while the graphs are skyrocketing. (Again, decide beforehand how to calculate this step.)

[^avg]: Preferably averaged over the last 7 days.

[^year]: Technically, you should calculate 1 − (1−p)<sup>365</sup>, but that's practically 365 × p. The overall calculation has much bigger errors anyway.

Finally, smash a generous error bar on the result: say, plus or minus an order of magnitude.

Can you live with 6% a chance of COVID-19 in the coming year? If not, then maybe you should scale back your activities. If your country's average risk is too low for you (for example, because you're young and live in New Zealand and are more likely to die in a car accident), then consider saying hello to the neighbors from a friendly distance.

Stay safe.
