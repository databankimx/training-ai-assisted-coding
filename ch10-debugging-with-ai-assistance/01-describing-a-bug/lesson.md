# Describing a Bug

A bug report is the first thing an assistant reads, and most of what it does next depends on it. A vague report produces a vague hypothesis, and the hypothesis is usually a plausible fix for a different bug. A precise report narrows the search before any code is read.

The trouble is that people describe bugs by what they think is happening, not by what they saw. "The totals are wrong" is a conclusion. The observation underneath it might be "order 1042 shows a total of 84.50, and the line items add up to 85.50." The conclusion invites a guess. The observation invites a test.

## Separate what you saw from what you concluded

A useful report has four parts, and the first two come straight from the evidence.

**Observed.** What happened, in the words of the system: the exact output, the exact error text, the exact value, the exact input. Copy these; don't paraphrase them.

**Expected.** What should have happened, and where that expectation comes from: the spec, a previous version, a requirement, or a calculation you can show.

**Conditions.** The input and environment that produced the observation: the data, the version, the configuration, and anything that changed recently.

**Suspicion.** Your guess about the cause, labeled as a guess. This is the part to keep short and clearly marked, because it's the part most likely to be wrong, and the assistant will treat it as fact unless you say otherwise.

> **Weak report:**
> The paging is broken. The last items are missing.
>
> **Stronger report:**
> Observed: with 7 items and a page size of 3, the page list shows 2 pages and displays 6 items. Expected: 3 pages, with item 7 on page 3. Conditions: the list is built from a database query, page size 3, current version. Suspicion (unverified): the page count may be rounding down.

The stronger report says what the system did, shows the number that should have been different, names the conditions, and marks the guess. It also gives the assistant something it can test.

## Leave out the story

People often add history to a bug report: when it started, who changed what, how frustrated they are. Some of that matters, such as a recent change to the code. Most of it doesn't, and it can push the assistant toward a narrative instead of the evidence.

A recent change is a condition. "The bug appeared after the paging change on Tuesday" is useful, because it tells the assistant where to look. "I've been fighting this all week" is not.

> **Aside: why a guess in a report becomes a fact.**
> An assistant reads the whole report with equal weight. A sentence labeled as a suspicion and a sentence labeled as an observation look the same to the model, unless you mark them. The model then tends to build its reasoning on whichever statement is most specific. A guess with a line number and an observation without one can swap places in the output. Labeling the guess keeps it in its place as something to test.

## Try it

Take a bug you've seen recently, or invent one. Write a report with the four parts. Mark every line that is a guess, and count how many of the four parts you filled from evidence and how many from memory or suspicion. Save the report in a file called `bug-report.txt` in your practice folder.

---
