# Reading the Hypothesis Before Accepting the Fix

An assistant will often propose a fix with a confident explanation. The explanation sounds like a diagnosis, and the fix is usually small enough to accept without thought. It's worth remembering that the fix is a hypothesis. It says: if this line changes, the bug goes away. That's testable, and it has to be tested before it's accepted.

This step covers how to read a proposed fix, what to check it against, and why the case that prompted the fix is the weakest evidence for it.

## What the explanation claims

Read the explanation for the claim it makes, not for how convincing it sounds. "The page count was being rounded down, so the last partial page was dropped. Adding one to the result fixes this." The claim is that adding one fixes the bug. What it implies is that the page count is always one more than the floor, which may or may not be true.

Write the claim as a condition the fix must satisfy. "For seven items and a page size of three, the result is three." That's the reported case. It isn't enough.

## Check the fix against cases it wasn't built for

The reported case is the one the fix was designed around, so it's the one most likely to pass. The useful checks are the cases where the fix's assumption would break. For a page count, those are the case where the items divide evenly, and the empty list.

The starter has a proposed fix and three cases. Press **Run** (or F5) and read each line.

The first case passes, which is the case the fix was built for. The second and third fail. The fix adds one page to every result, so an even division gets an extra empty page, and an empty list gets a page it doesn't need.

The expected output is the correct result for all three cases. Press **Check** on the starter to see the failures. Press **Run** on the solution, which rounds up. All three pass, because the calculation matches the meaning of a page count rather than a single example.

> **A note on the code.** The starter and solution were written by hand to show the failure. They aren't a record of what any assistant produced. Use the same three checks on any fix you're given: the reported case, a case that divides evenly, and an empty input.

## Name the assumption

Every fix assumes something about the input. The proposed fix assumes that the division leaves a remainder. The rounding-up fix assumes only that the page size is positive. When you read a fix, write down the assumption it makes, and then test an input that breaks it.

This is the habit that separates a hypothesis from a diagnosis. A diagnosis explains why the bug happens, and a fix that matches the diagnosis passes cases the diagnosis predicts. A fix that only matches the reported case has not been explained.

## When the fix passes

If every case passes, the fix is supported by the evidence you have. It isn't proven. The next step covers what a fix can still miss, and why the invariant that the code relies on is the thing to check.

## Try it

Take a proposed fix from your own work, or write one for the bug in the previous step. Write down its claim, its assumption, and the three cases you'd check it against. Run the cases, and record the result of each. Save the record in a file called `hypothesis-check.txt` in your practice folder.

---
