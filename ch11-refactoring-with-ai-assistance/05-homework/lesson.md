# Homework: Find the Checkpoint That Broke

A parcel quote function was refactored by an assistant, in three checkpoints. The original is the reference, and every checkpoint is compared with it on five cases. One checkpoint changes behavior. Your job is to find it, explain the cause with a case, and fix it, so that every checkpoint matches the original.

Write your work in a file called `checkpoint-log.txt` in your practice folder. Record the run before and after your fix, and the reason for the change.

## The quote

The quote is a tier price for the parcel's weight, plus a 25-cent handling fee. Members get 10% off the total, rounded down to the cent. The original is in the starter. Don't change it, because it's the reference.

## Run it

Press **Run** (or F5) and read the three checkpoint lines. Checkpoint 1 renames the parameters, and checkpoint 2 moves the discount into a helper. Both should pass. Checkpoint 3 combines the discount into the return, and that's where the failure should show.

Read the failing line. It names the case, the value the checkpoint gave, and the value the original gives. Write down the case in your log.

## Find the cause

Compare checkpoint 3 with checkpoint 2. The only difference is how the discount is computed. Work out the arithmetic for the failing case by hand, using the original's formula, and then using checkpoint 3's formula. The two should agree if the change preserved behavior. If they don't, the difference is the cause.

Then ask: is the difference in the rounding, in the order of operations, or in the boundary? Name the one that applies.

## Fix it

Change checkpoint 3 so that it keeps the original's behavior, and run all three checkpoints again. The fix should be the smallest change that makes checkpoint 3 match. It's a good idea to reuse the helper that checkpoint 2 introduced, rather than writing the arithmetic a second time.

Press **Check** on the starter to see the mismatch, and then press **Run** on the solution. Compare the solution's version of checkpoint 3 with your own. If yours differs, make sure it still passes all five cases.

## What to hand in

Your log should contain:

- **The failing case** from the first run, in the form the output gives it.
- **The cause,** named as rounding, order of operations, or boundary, with the arithmetic for the failing case under both formulas.
- **The fix,** and the output of the second run.
- **A note on why the checkpoints caught the change.** Which checkpoint would have passed if you had compared only the first two, and which case would have been missed without the boundary cases.

Then answer one question: if the assistant had made the same change in one large edit, with all three refactorings together, how would you have found the cause?

---

~~~spoiler
Answer key. Your log may use different words, but the cause should be the same, and the fix should keep the original's arithmetic.

**The failing case.** The first run fails at 5000 grams for a member. The original charges 473 cents, and checkpoint 3 charges 472. Checkpoints 1 and 2 pass, and the earlier cases agree.

**The cause.** Rounding. The original takes a tenth off the total and rounds that tenth down, so the discount is 52 cents and the price is 473. The combined formula multiplies first, so 525 times 9 is 4725, and dividing by 10 rounds the total down to 472. The two formulas agree when the total is a multiple of ten, and they differ when it isn't. A base of 525 is not a multiple of ten, which is why the case shows the difference.

**The fix.** Return `MemberPrice(baseCents)` in checkpoint 3, so the discount goes through the helper and keeps the original's rounding. The solution does this. The output is three passing checkpoints.

**Why the checkpoints caught it.** Checkpoints 1 and 2 passed, which proves the rename and the extraction didn't change behavior. Checkpoint 3 is the only change in the failing run, so the cause has to be in it. Without the member cases, the check would have passed, because the regular cases never reach the discount. The case 5000 is on the boundary of the tier, and it's also a member case with a base that isn't a multiple of ten. Both features are needed to see the change.

**The single-edit question.** If all three changes had arrived in one large edit, the failing case would still have shown the problem, but the cause would have had three possible sources. The reviewer would have had to test each change separately, or read the whole diff. The checkpoints make that unnecessary, because each change has its own result.

**Common mistakes.** Fixing the arithmetic in checkpoint 3 without reusing the helper, which leaves two copies of the rule that can drift apart again. Checking only the regular cases, which never reach the discount. Accepting checkpoint 3 because the code looks shorter. Changing the original to match the refactor, which is the one thing a refactoring must never do.
~~~

---
