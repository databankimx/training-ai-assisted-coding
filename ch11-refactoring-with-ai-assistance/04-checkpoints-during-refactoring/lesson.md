# Checkpoints During Refactoring

A refactoring done in one large change is hard to check. If the result is wrong, the cause could be in any of a dozen edits, and the diff is too big to read carefully. A refactoring done in checkpoints is easier to check. Each small change is followed by a comparison with the original, so the first checkpoint that fails names the change that broke the behavior.

A checkpoint is a point where you stop, check that the behavior is still the same, and only then continue. The discipline is simple, and it's the most reliable defense against the changes that slip in quietly.

## Run it

The starter has a shipping tier function, changed in three checkpoints, and each checkpoint is compared with the original. The first checkpoint renames a parameter. The second moves the tiers into a helper. The third is the assistant's combined condition, which uses greater-than-or-equal where the original uses greater-than.

Press **Run** (or F5) and read the three checkpoint lines. The first two pass. The third fails, at 5000 grams: the refactor charges 800 cents, and the original charges 500.

The harness compares each checkpoint with the original on five cases, and the cases sit on the boundaries: just below each threshold, on it, and just above it. The boundary at 5000 is where the third checkpoint breaks, and a case that avoided the boundary would have passed it.

The expected output is the same three checkpoints, all passing. Press **Check** on the starter to see the failure. Then press **Run** on the solution, which keeps the original's boundaries in the third checkpoint, and every checkpoint passes.

> **A note on the code.** The starter and solution were written by hand to show a boundary change. They aren't a record of what any assistant produced. The method matters more than the example: compare after each change, and use cases that sit on the boundaries.

## Stop at the first failure

When a checkpoint fails, stop. Don't go on to the next change. The next change may depend on the broken one, and a later checkpoint may fail for a reason that hides the first. Fix the failing checkpoint, rerun all of them, and continue only when every checkpoint so far passes.

This is the same habit as Chapter 9's red run: a failing check is the most useful result, because it names the change that needs attention.

## Keep the checkpoints small

A checkpoint should cover one kind of change. A rename, an extraction, and a rewritten condition are three checkpoints, not one. If a checkpoint mixes two kinds of change, a failure doesn't say which one caused it.

Ask the assistant for one checkpoint at a time, and record the result before you ask for the next. The record is also a useful artifact for the review, because it shows the change was checked as it was made.

> **Aside: why boundaries catch what averages miss.**
> A typical value tells you the function works for typical inputs. A boundary tells you whether the comparison operators are right, and most refactoring changes that are wrong are changes to a comparison. Testing the value 5000, exactly on the threshold, is the cheapest way to tell `>` from `>=`, which is a single character and can cost a customer money.

## Try it

Take a function with a threshold in it, and make a copy. Refactor the copy in three checkpoints, each one a single kind of change. After each checkpoint, compare the copy with the original on five cases: one below the threshold, two on it or near it, and two above it. Record the result of each checkpoint in a file called `checkpoints.txt` in your practice folder.

---
