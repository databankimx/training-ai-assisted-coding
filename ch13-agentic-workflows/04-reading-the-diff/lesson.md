# Reading the Diff

A diff is a record of what changed between two versions of a file. Version control tools produce one for every change, and an agent's work arrives as one. It's the one artifact that shows exactly what was done, line by line, and you can read it without trusting the agent's account of its own work. An agent's summary says what it meant to do. The diff says what it did.

If you haven't read one before, this step starts from the beginning. The examples are small on purpose, so you can see the format before you have to judge a real change.

## What a diff looks like

Here is a small change to a fines function. The function's cap was 2000, and the change makes it 1800.

```diff
diff --git a/src/fines.cs b/src/fines.cs
--- a/src/fines.cs
+++ b/src/fines.cs
@@ -10,7 +10,7 @@ static int FineCents(int daysOverdue)
     if (daysOverdue < 0) throw new ArgumentOutOfRangeException(nameof(daysOverdue));
     int chargeable = Math.Max(0, daysOverdue - 3);
-    return Math.Min(chargeable * 25, 2000);
+    return Math.Min(chargeable * 25, 1800);
 }
```

Read it from the top, and each part has a job.

**The header line** `diff --git a/src/fines.cs b/src/fines.cs` starts a new file. The two paths are the file before the change (`a/`) and after it (`b/`). They're the same here, because the file wasn't renamed.

**The two file lines** `--- a/src/fines.cs` and `+++ b/src/fines.cs` name the old and new versions. A diff with more than one file repeats this block for each file.

**The hunk header** `@@ -10,7 +10,7 @@` says where the changed region is. The `-10,7` means that the old version's region starts at line 10 and covers seven lines. The `+10,7` means the new version's region starts at line 10 and covers seven lines. The text after the second `@@` is the function the change sits in, which the tool copies for you.

**The lines** are the content of the region. There are three kinds, and each begins with one character.

- A line that begins with a space is **context**. It's unchanged, and it's there so you can see where the change sits.
- A line that begins with `-` was **removed**. It exists in the old version and not in the new one.
- A line that begins with `+` was **added**. It exists in the new version and not in the old one.

So the example says: in the old version, the return line capped the fine at 2000. In the new version, it caps it at 1800. Everything else in the region is the same.

> **Aside: why a changed line appears twice.**
> A change to a line is shown as a removal and an addition, not as an edit in place. The diff tool doesn't know that you meant "change the number." It records that the old line is gone and a new line is present. Reading the pair together is how you see what changed, and reading the pair separately is how you notice that a line was removed without a replacement.

## Three examples to read

Each example below shows a different kind of change. Read each one, then look at the explanation.

**Example one: a rename.** Only the names changed.

```diff
@@ -3,4 +3,4 @@
-    int tmp = daysOverdue - 3;
-    return tmp * 25;
+    int chargeable = daysOverdue - 3;
+    return chargeable * 25;
```

Both removed lines have a matching added line, and the arithmetic is the same. Reading the pairs, a reviewer can confirm that `tmp` became `chargeable` in both places and nothing else moved. A rename like this is usually safe, and Chapter 11 covered the one risk: a name used elsewhere that the diff doesn't show.

**Example two: a removed check.** A test file changed.

```diff
diff --git a/tests/fines_tests.cs b/tests/fines_tests.cs
--- a/tests/fines_tests.cs
+++ b/tests/fines_tests.cs
@@ -4,3 +4,2 @@
-expect 4 25
-expect 200 2000
+expect 200 1800
```

Here the diff shows two removed lines and one added line. The old file checked that four days cost 25 cents, and that 200 days cost 2000. The new file checks only one value, and it expects 1800. Nothing in the new file says the cap should have changed. A reviewer who sees a removed expected value should stop, because the check that would have caught a wrong result is gone. This is the same pattern as Chapter 9's tampering.

**Example three: a change that's harder to see.** A boundary comparison changed.

```diff
@@ -6,3 +6,3 @@
-    if (weightGrams > 5000) return 800;
+    if (weightGrams >= 5000) return 800;
```

The only difference is one character, `>` became `>=`. Read on its own, the change looks like a tidy-up. It changes the result for exactly 5000 grams, which is a case most tests never check. Chapter 11 showed why a boundary is where refactoring changes behavior. In a diff, a one-character change like this is the one most likely to be waved through.

## Reading the diff as a whole

Read every file in the diff, in the order it appears, and for each file ask three questions.

1. **Is the file one the brief allows?** The header line names it. If not, the file is a stop.
2. **What was removed?** Look for removed checks, removed expected values, and removed guards. A removal without a matching addition needs an explanation.
3. **Which values changed?** Compare each changed value with the brief. A value the brief didn't mention is a question, and a value the brief forbids is a reject.

Only after those three questions should you look at the style of the code. Style matters, and it matters least in a diff review.

## Run it

Now the checker. It reads a diff in the same format as the examples above, and it does two of the three questions for you: the scope, and the number of removed expected lines. It doesn't check values, so you still have to ask the third question yourself.

The starter holds a diff for a fines task, with a source file and a test file. Press **Run** (or F5) and read the two lines.

The first line says the source file is in scope and removes no checks. The second says the test file is outside the scope, and it removes two expected values. That's the removed check from Example two, and the checker reports it as a count.

The expected output is what a clean diff gives: one file, in scope, with no checks removed. Press **Check** on the starter to see the difference. Then press **Run** on the solution. The solution's diff touches only the source file, keeps every existing check, and adds a comment.

> **A note on the code.** The starter and solution were written by hand to show the review. They aren't a record of what any agent produced. The checker is deliberately simple, so you can see that it only counts lines that begin with `-expect`. A real review asks the same questions, and a person makes the decision at the end.

## Decide file by file

For each file in the diff, write one of three decisions: accept, correct, or reject.

Accept a file when it's in scope and every change in it is one the brief allows. Correct a file when the change is right but goes beyond the brief, such as an extra comment, and revert the extra part. Reject a file when the change removes a check, changes a value the brief forbids, or touches something you can't account for.

When you reject a test change, don't keep the agent's version of the test and fix the code to match. The test is the evidence. Revert the test, rerun the checkpoint, and let the code change be judged against the original check.

## Try it

Write three small diffs of your own, in the format above: one rename, one changed value, and one removed check. For each, read it using the three questions, and write a decision. Then say which of the three changes a green test run would hide. Save your diffs and decisions in a file called `diff-review.txt` in your practice folder.

---
