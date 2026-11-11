# Behavior-Preserving or Behavior-Changing

The hardest part of reviewing a refactoring is telling whether the behavior changed. The new code often looks equivalent, and an equivalence that feels obvious can be wrong at one case. This step gives you a way to decide, without reading the arithmetic in your head: run the old and new code on the same cases, and see whether they agree.

A case is an input you choose, and the test is whether the two versions give the same output for it. If they agree on every case, that's evidence the change preserved behavior. If one case differs, the change didn't, and that case is the proof.

## Run it

The starter has the original formatting function, and an assistant's refactor of it. The refactor is shorter, and it uses the same idea, but it computes the discount as `cents * 9 / 10`, rather than subtracting a tenth. Press **Run** (or F5) and read the three lines.

Two cases show a difference. A member buying for $1.05 is charged $0.95 by the original, and $0.94 by the refactor. A member buying for $19.99 is charged $18.00 by the original, and $17.99 by the refactor. A regular customer's price is the same in both, because the refactor doesn't touch it.

The cause is the rounding. `cents - cents / 10` takes a tenth off and rounds the tenth down. `cents * 9 / 10` multiplies first and then rounds the total down, which can give a different cent. The two expressions are close, and they aren't the same.

The expected output is the original's behavior, which the solution keeps. Press **Check** on the starter to see the mismatch. Then press **Run** on the solution. Its refactor uses the original's arithmetic, and every case shows the same result.

> **A note on the code.** The starter and solution were written by hand to show the difference. They aren't a record of what any assistant produced. The lesson is the method, which is to compare on cases you choose, and the three cases here are a start, not a complete check.

## Choose cases that can break the change

A case that can't break a change proves nothing about it. For a rounding change, the useful cases are the ones where the rounding matters: a value that leaves a remainder when divided, a value at a boundary, and a value that doesn't need rounding at all. The regular-customer case above is the control. It shows the harness works, but it can't reveal the difference, and that's why the member cases are the ones that matter.

## What counts as behavior

Behavior is more than the return value. A change can also alter an error, an order of side effects, a log line that another system reads, or a name a caller depends on. Compare every output the caller can see, not only the one you were looking at.

> **Aside: why small changes can alter behavior.**
> Arithmetic on whole numbers isn't the same as arithmetic on exact fractions. Each operation rounds, and the order of operations decides where the rounding happens. Two formulas that agree on most values can disagree on a value that lands exactly on a rounding boundary. That's why a refactor that looks like a rearrangement can change the result, and why a case on the boundary is the most useful kind to test.

## Try it

Write three cases for the formatting function: one where the member discount leaves a remainder, one where it doesn't, and one with a regular customer. Run the original and the refactor on each, and record same or different. Then say which case you'd add if you could add only one more. Save the record in a file called `same-or-different.txt` in your practice folder.

---
