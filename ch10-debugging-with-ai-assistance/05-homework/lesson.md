# Homework: Debugging a Misleading Symptom

A rating average is reported as wrong for some inputs. Nobody has seen the code change, and the output looks reasonable for one of the cases, which is what makes the bug hard to see. Your job is to debug it using the method from this chapter: describe the bug, paste the actual output, form a hypothesis, test it against cases that differ from the reported one, and fix the root cause.

Write your work in a file called `debug-log.txt` in your practice folder. Keep a numbered list of every hypothesis you form, the test you ran for it, and whether the test supported it.

## The report

> The average rating is wrong for some classes. The three cases in the starter are the reported examples. Nobody has checked the function since it was written.

Write the bug report in the form from the first step. Keep the observed output exact, and mark your suspicion as a guess.

## Run it

Press **Run** (or F5) on the starter and read the three lines. One of them passes, and that's the misleading symptom. The case `5, 5` gives the right answer, so a quick check of that case alone would suggest the function works.

Form a hypothesis about the cause. Write it down before you change anything, and say what result would support it and what result would refute it. Then test it with a case that differs from the three in the starter. A new case, chosen to break your hypothesis if it's wrong, is stronger evidence than a rerun of an old one.

Repeat until you can state the root cause in one sentence, with the case that shows it.

## What to hand in

Your log should contain:

- **The bug report,** in the form from the first step.
- **Each hypothesis,** numbered, with the case you used to test it and the result.
- **The root cause,** stated in one sentence that names the line and the condition that makes it wrong.
- **The fix,** and the cases you ran against it. Include one case the starter didn't have.
- **A paragraph** that answers two questions. Which hypothesis looked most convincing before you tested it, and why? Which case convinced you that the one you started with was wrong?

Then press **Check** on the starter, and press **Run** on the solution. Compare the solution's output with the expected output. If your fix differs from the solution in a way that still passes every case, explain what the solution's version does that yours does not.

> **A note on the code.** The starter and solution were written by hand to show the bug. They aren't a record of what any assistant produced. A debugging session with a real assistant will produce hypotheses that differ from these, and your log should record the ones it produced.

---

~~~spoiler
Answer key. Your hypotheses may differ, and some of them may be wrong. What matters is that each one was tested with a case, and that the root cause is stated precisely.

**The likely first hypothesis.** The average is wrong because the division is by the wrong count. That's plausible, because the code divides by one less than the number of ratings. The test that supports it is a case where the division is the only thing wrong. The test that refutes it is the `5, 5` case, which divides by one and passes, so the divisor alone isn't the whole story.

**The root cause.** The loop stops one short of the end of the list, so the last rating is never added to the total, and the divisor is also one short. The two errors cancel for the `5, 5` case, which is why that case passes, and they don't cancel for the others. The bug isn't the divisor, and it isn't the loop bound alone. It's the combination, and the symptom that looks right is the case where they happen to balance.

**A useful new case.** A list of one rating, such as `7`. The starter divides by zero and gives an undefined or infinite result, because the loop adds nothing and the divisor is zero. The correct average is seven. This case is outside the three reported examples, and it shows that the divisor is wrong independently of the loop.

**The fix.** Add every rating and divide by the number of ratings. The solution does this. Your fix should also handle an empty list, which the spec doesn't mention, and the note should say so.

**Common mistakes.** Fixing only the divisor, which passes `5, 5` and fails `4, 5, 3, 2`. Fixing only the loop bound without checking the divisor, which fails `5, 5` and passes the others. Testing the reported examples again after the fix, rather than a new case. Accepting the first hypothesis because the symptom looked plausible.

**What good work looks like.** A log where every hypothesis has a test, the root cause names the condition, the fix is checked against a case the starter didn't contain, and the paragraph names the case that changed the debugger's mind.
~~~

---
