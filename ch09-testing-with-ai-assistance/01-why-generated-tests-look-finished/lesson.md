# Why Generated Tests Look Finished

When you ask an assistant for tests, you usually get a tidy file: a class or a module, a dozen test names, and assertions that read well. Each test has a name that describes a behavior, and each one passes when you run it. It's easy to conclude that the code is covered.

Passing is the weakest thing a test can do. This step shows the ways a suite passes on code that is wrong, and what to look for before you trust one.

## Four ways a suite passes on wrong code

**The test checks something the code always does.** "Returns a non-negative fine" is true of a fine that's wrong in every other way. A test that can't fail for a wrong answer tests nothing about the answer.

**The test compares the code with itself.** "Is stable across calls" passes for any function that returns the same value twice, including the wrong one. The expected value came from the code, so the test can't tell right from wrong.

**The test checks the one value that's easy.** A cap test at 200 days passes for a function whose grace period is wrong, because the cap hides the difference. A test on the easy value proves the easy value.

**The test checks that something happens, not what.** "Rejects negative days" passes for any function that throws, including one that throws for the wrong reason. The error is part of the spec, so the test should check the error the spec names.

## The example

The starter has a generated suite with four tests, run against the fines function from the earlier chapters. The function has the grace-period defect: it applies the grace period one day too long.

Press **Run** (or F5) and read the four results. Every test passes. A reviewer who reads only the results would accept the function.

Now look at which tests would have caught the defect. None of them does. The defect shows on day four, where the fine should be 25 cents and the function gives zero, and no test checks day four. The cap test sits far from the boundary, and the other two tests can't fail for a wrong answer.

The solution writes the tests from the spec instead. Each test names a rule, and each expected value comes from the rule, not from the function. Press **Check** on the starter, then press **Run** on the solution. The four spec tests pass, because the function is now right, and the names say which rule each test covers.

> **A note on the code.** The starter and solution were written by hand to show the weak points. They aren't a record of what any assistant produced. A generated suite may fail in other ways this step doesn't show.

## A question to ask of every test

For each test, ask: what wrong code would this test reject? If you can name the wrong code, the test is doing work. If you can't, it's a test of the code's shape, and it needs a spec-based expected value beside it.

Chapter 5 gave the same rule for prompts. Chapter 8 gave it for review. The test is where the rule is checked: a test that can't name what it rejects has not earned its pass.

## Try it

Take the four starter tests. For each one, write the wrong code it would reject, or write "none" if it rejects nothing. Then write one spec test for the rule the suite misses. Save both in a file called `test-audit.txt` in your practice folder.

---
