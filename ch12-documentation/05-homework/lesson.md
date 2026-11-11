# Homework: Check a Module's Documentation

A shipping cost module has documentation that was generated from its code. Five sentences describe its behavior. Some of them may be wrong. Your job is to check each sentence against the behavior, mark the ones the code does not support, and correct the documentation. You may not change the code, because the code is the decision, and the documentation is what has to follow it.

Write your work in a file called `doc-check.txt` in your practice folder. For each sentence, record supported or unsupported, the input you used, and the result.

## The module

The module charges by parcel weight in grams. Parcels up to 5000 grams cost 500 cents. Parcels over 5000 grams cost 800 cents, and parcels over 10000 grams cost 1200 cents. Members get 10 percent off, rounded down to the cent. The starter also says what the module does with a negative weight.

Read the code before you read the documentation's claims, so you know what the code does. Then check each claim.

## Run it

Press **Run** (or F5) on the starter and read the five claim lines. Each line is one sentence from the documentation, turned into a check. Two of them will say unsupported.

For each unsupported claim, decide what the code actually does, and why. Then correct the sentence so it describes the behavior. Don't correct a claim to say what you wish the module did. The spec isn't given here, so the code is the only evidence, and where the code is clearly wrong, say so in your notes rather than writing the defect into the documentation as a feature.

Press **Check** on the starter to see the mismatch. Then press **Run** on the solution, which has the corrected claims and the same code. All five claims should pass.

> **A note on the code.** The starter and solution were written by hand to show the check. They aren't a record of what any assistant produced. Your own documentation checks should use the same method on any module you're given.

## What to hand in

Your file should contain:

- **Each sentence,** with supported or unsupported beside it, and the input you used.
- **For each unsupported sentence,** the corrected sentence, and one sentence on why the code does what it does.
- **A short paragraph** that answers two questions. Which sentence would a caller most likely have trusted and got wrong? Which sentence would have stayed wrong if you had checked only the typical cases?

---

~~~spoiler
Answer key. Your corrected sentences may be worded differently, but each must describe what the code does for the input you checked.

**The two unsupported sentences.**

- *"Parcels of exactly 5000 grams cost 800 cents."* The code charges 500 cents at 5000 grams, because the 800-cent tier starts strictly above 5000. The sentence describes the boundary the wrong way round. The correction is "Parcels of exactly 5000 grams cost 500 cents, because the 800-cent tier starts above 5000 grams." This is the boundary the Chapter 7 and Chapter 11 steps taught: a sentence about a threshold must say which side the threshold falls on.
- *"Negative weights are treated as zero."* The code throws an argument error for a negative weight. The sentence describes a fallback the code doesn't have. The correction is "Negative weights throw an argument error." A caller who trusted the sentence would expect zero and receive an exception.

**The three supported sentences.** Parcels up to 5000 grams cost 500 cents. Parcels over 10000 grams cost 1200 cents. Member prices are 10 percent off, rounded down to the cent, which the check confirms with 800 cents becoming 720 cents. These sentences are true, and a reviewer should still confirm each with a case, rather than assume it.

**What a typical-case check would miss.** A check that only uses typical weights, such as 2000 grams, passes four of the five sentences, and it never reaches the boundary at 5000. The boundary sentence would stay wrong, because no typical case lands on the threshold. The negative-weight sentence would stay wrong too, because typical weights are never negative. Both sentences need the edge cases.

**The fix belongs in the documentation, not the code.** A reader might be tempted to change the code so that the sentence becomes true. The spec isn't in front of you, and the code is the only evidence, so the documentation follows the code. If the team decides that the code is the defect, the code changes in its own review, and the documentation changes with it.

**Common mistakes.** Checking only the sentences that sound important, and skipping the boundary sentence. Correcting a claim to what you think the module should do, instead of what it does. Writing "looks right" for a sentence instead of an input and a result. Changing the code to match the documentation.
~~~

---
