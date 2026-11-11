# Homework: Review a Second Agent Diff

An agent was given a brief for a fines change. Its brief says the scope is `src/fines` only, that tests and documentation must not be edited, and that no value may change. The agent's diff does not follow the brief. Your job is to review it file by file, decide what happens to each change, and write the checkpoints the run should have had.

Write your work in a file called `diff-review.md` in your practice folder. Keep the decision for each file, the reason, and the checkpoints.

## Reading the diff first

If you need a reminder of the format, Chapter 13, step 4 explains it with examples. The short version: a line that begins with `-` was removed, a line that begins with `+` was added, a line that begins with a space is unchanged context, and the `diff --git` line starts each file.

Here is one file from this homework's diff, in the same format:

```diff
diff --git a/src/fines.cs b/src/fines.cs
--- a/src/fines.cs
+++ b/src/fines.cs
@@ -1,2 +1,3 @@
-    int cap = 2000;
+    // The cap is in cents, and it applies after the free days.
+    int cap = 1800;
```

Read it as a reviewer. The comment is harmless. The `+    int cap = 1800;` line is a changed value, and the brief forbids that. The changed value has to be reverted, and the comment alone would have been fine.

## Run it

Press **Run** (or F5) on the starter and read the three lines. Each line is one file in the diff. The checker reports whether the file is in scope and how many expected values the diff removes.

Then read the diff itself. The checker doesn't check values, so a change can be in scope and still break the brief. Look for every changed value, and compare each one with the brief.

## Decide file by file

For each file, decide accept, correct, or reject, and write the reason in one sentence that names a line of the diff.

- A file outside the scope is rejected, unless the change is only a correction that the brief would allow.
- A removed or changed check is rejected. Never keep an agent's edit to a test in order to fix the code to match it.
- A changed value that the brief forbids is corrected, which means reverting the value, even when the new value looks like an improvement.

## Write the checkpoints

The run should have stopped at checkpoints before it made any of these changes. Write three: the plan, the diff, and the test run. For each one, say what the agent should have shown you, and what you would have checked at that stop. At the diff stop, name the three things you would have caught.

## Produce the corrected diff

Press **Check** on the starter, and press **Run** on the solution. The solution keeps only the change the brief allows: the comment in the source file. It reverts the value change, the test edit, and the documentation change. Compare the solution's output with your decisions.

## What to hand in

Your review should contain:

- **The decision for each file,** with the line that decided it.
- **The three checkpoints,** with what you'd check at each.
- **A short paragraph** that answers two questions. Which of the three files would have looked most acceptable on its own? Which change would have passed the tests, and why is that the most dangerous kind of change in this diff?

---

~~~spoiler
Answer key. Your reasons may be worded differently, but each decision must name a line of the diff, and each checkpoint must say what you would check.

**File decisions.**

- **src/fines.cs: correct.** The comment is in scope and allowed. The change of the cap from 2000 to 1800 is a changed value that the brief forbids. Revert the value and keep the comment. The checker reports this file as in scope, which is why a reviewer can't rely on the checker alone.
- **tests/fines_tests.cs: reject.** The file is out of scope, and the change replaces the expected value for 200 days from 2000 to 1800, which removes a check that the cap should hold at 2000. The checker reports one removed expect line. A green test run after this change would show that the test now agrees with the value the agent changed, which is the tampering pattern from Chapter 9.
- **docs/fines.md: reject.** The file is out of scope, and the change alters a documented value to match the code change. The brief forbids documentation edits, and the documentation would then describe a cap the spec doesn't set. Revert it.

**The three checkpoints.**

- *Plan.* The agent should show the list of files it intends to change, before any edit. Check that the list is src/fines only. A plan that includes the test file or the documentation is corrected here, and the brief's scope is restated to the agent.
- *Diff.* The agent should show the diff before any test run. Check every changed value against the brief, check that no test line is removed or changed, and check that no file is outside the scope. The three things you would catch are the value change, the test edit, and the documentation edit.
- *Test run.* The agent should show the results of the test run, and you should run the tests yourself. A green result after the diff stop is only meaningful if the diff was clean. Here the diff was not clean, so a green result would have been evidence of the tampering, not of the fix.

**The solution.** The corrected diff keeps the comment and reverts the rest. The checker reports the source file in scope with no removed checks, and the output matches the expected line.

**The two questions.** The source file looks most acceptable on its own, because a comment is harmless. The test change is the most dangerous, because it can make the test run green. The brief's rule about test files is the protection, and the diff review is the check that enforces it.

**Common mistakes.** Accepting the source file because the checker says it is in scope, without reading the value change. Keeping the test edit and changing the code to match. Writing checkpoints that say "review the results" without saying what would be reviewed. Treating the documentation change as harmless, when it makes a false statement the spec doesn't support.
~~~

---
