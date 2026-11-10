# Keeping a Context Document Current

A context document that's out of date is worse than no document at all. Without one, the assistant guesses, and you know it's guessing. With a stale one, the assistant follows the document with confidence, and it's right about the old module and wrong about the current one. Nothing in the output tells you which is which.

That makes staleness the most important risk in this chapter. This step covers how drift happens, what it looks like, and how to catch it.

## How a document goes stale

A document drifts in four common ways. Each one is quiet, and each one can be the difference between a good answer and a plausible wrong one.

**The code changed, and the document didn't.** A method was renamed, or its return unit changed from cents to dollars, and the document still says the old thing.

> Document, stale: `EstimateCents(weightGrams, zone)` returns the cost in cents.
>
> Code, current: `EstimateCents(weightGrams, zone)` now returns the cost in dollars, rounded to two places, after a change in May.
>
> What the assistant does: follows the document, and returns cents to a caller that now expects dollars.

**A rule was decided, and the document never heard about it.** A new policy arrives, such as a maximum weight, and it lives in a ticket until someone remembers to write it down.

> Document, stale: There is no weight limit.
>
> Decision, current: Orders over fifty kilograms are rejected, following the customer agreement signed last quarter.
>
> What the assistant does: writes code that accepts a seventy-kilogram order, and nobody notices until a customer complains.

**A rule was retired, and the document still enforces it.** A workaround that was needed for an old system stays in the document after the system is gone, and the assistant keeps avoiding a pattern that's now safe.

> Document, stale: Don't call `RateTable.Load` from a constructor. The old loader fails when called there.
>
> Code, current: The loader was rewritten last year, and constructor calls are fine now.
>
> What the assistant does: restructures working code to avoid a call that no longer needs avoiding, and adds complexity for no benefit.

**An example stopped being true.** The examples section is the most useful part of the document, and the one most likely to fall out of date, because nobody reruns the examples after a change.

> Document, stale: A 500-gram order to zone `Domestic` costs 650 cents.
>
> Code, current: The `Domestic` rate changed in the spring, and the same order now costs 690 cents.
>
> What the assistant does: writes tests that expect 650, and the tests fail on correct code, or worse, the assistant "fixes" the code to match the document.

The last case is the most dangerous. A wrong example doesn't just mislead the assistant, it pushes the assistant to change working code to match the document.

## Catch drift with three habits

None of these habits is expensive, and each one catches a different kind of drift.

**Tie the document to the code.** Put the document in the same repository as the module, and review it in the same pull request as the code it describes. A change to the entry point should prompt a change to the document, in the same review. This catches the first kind of drift, the one where the code changed and the document didn't.

**Rerun the examples.** The examples section should be checked by tests, not by memory. If each example in the document is a test in the project, a changed rate fails the test before it reaches the assistant. This catches the last kind of drift, and the most dangerous one.

**Date the document.** A line at the top with the date it was last checked gives every reader a clue about how far to trust it. A document checked last week is probably fine. One checked last year needs a look before you rely on it.

> Last checked against the code: 2026-10-14, by the owner of the shipping estimator.

## What to do when you find drift

When you notice a document is out of date, fix it before you use it. Don't work around it in the prompt, because the next person to use the document will hit the same problem. Correct the document, and then check it against the code once more.

If you're not sure which version is right, check the decision that produced the code, and not only the code. A ticket, a meeting note, or a customer agreement is usually the source of truth for a rule, and the code is only a record of what someone decided to implement.

> **Aside: why staleness is harder to see than a bug.**
> A bug in the code usually shows up as a failing test or a complaint. A stale document shows up as code that looks reasonable and matches the document perfectly, which is exactly what you'd expect if the document were right. The assistant produces output that passes its own review, and the error sits in the source the review trusted. That's why the habit has to live in the repository, next to the code, and not in anyone's memory.

## Try it

Take the shipping estimator document, and imagine three changes to the module: a new maximum weight, a changed rate for one zone, and a retired workaround. For each change, write the one line of the document that would become wrong, and the corrected line. Then write the test you'd add so the next change to the rate fails the test rather than misleading the assistant. Save the three pairs and the test in a file called `drift.txt` in your practice folder.

---
