---
layout: post
title:  "Medical AI safety: where are we and where are we heading"
categories: AI
description: Using (almost) advanced tools for advanced tasks, without weighing their consequences.
---

In this post I summarize a [blog post about “medical AI safety”](https://lukeoakdenrayner.wordpress.com/2018/07/11/medical-ai-safety-we-have-a-problem/): the potential consequences of using advanced medical systems without sufficient evidence to back up their usefulness.

_Epistemic status: the author (Luke Oakden-Rayner) is a PhD candidate radiologist, and I'm not an expert in medicine._

> For the first time ever, AI systems could actually be responsible for medical disasters.

The risk of a medical AI system increases with its complexity: from the lowest complexity _processing systems_, through _triage systems_ that order the priority queue of patients, we are now moving towards autonomous _diagnostic systems_, and eventually to autonomous _prediction systems_.

Some systems in the wild are worse than humans in both recall and sensitivity:

> “Not only did CAD [computer-aided diagnosis] increase the recalls without improving cancer detection, but, in some cases, even decreased sensitivity by missing some cancers.”

Nonetheless, we are already proceeding to the next level:

> A few months ago the FDA approved a new AI system by IDx, and it makes independent medical decisions without the need for a clinician. (In this case, screening for eye disease through a retina scan.)

But on the upside, these tools improve the ratio of people screened:

> But while there is a big potential upside here (about 50% of people with diabetes are not screened regularly enough), and the decision to “refer or not” is rarely immediately vision-threatening, approving a system like this without _clinical testing_ raises some concerns.

And systems operate now on a larger scale too:

> NHS is already using an automated smart-phone triage system “powered by” babylonhealth AI. This one is definitely capable of leading to serious harm, since it recommends when to go (or not to go) to hospital.

... which system gave 90% confidence to non-lethal diagnosis X, not even offering lethal diagnosis Y which was suggested by 90% of MDs on Twitter. (And I assume it's not even an adversarial attack.) It's fair to say that there is room for improvement. (Compare this with the amount of news coverage received by the monthly crash of an autonomous vehicle.)

> The real point is that none of the FDA, NHS, nor the various regulatory agencies in other nations appear to be concerned [to the extent required] about the specific risks of autonomous decision making AI.

> Are we potentially racing towards an AI event on the scale of elixir sulfanilamide [which prompted the foundation of FDA] or thalidomide [which the FDA banned before other countries, preventing 10,000 birth malformations]?
