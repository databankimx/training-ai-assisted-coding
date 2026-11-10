# When the Fix Is Wrong

A fix that passes every case you tried can still be wrong. The cases you tried were the ones that came to mind, and they share assumptions with the fix. The inputs that break a fix are the ones outside those assumptions. Finding them is the job of this step.

Every piece of code relies on an invariant, which is a condition that has to hold for the code to mean what it says. A page count relies on a positive page size. A fine relies on non-negative days. A fix that never checks the invariant works until someone gives it an input that breaks the condition, and then it fails in whatever way the language happens to choose.

## Each language breaks differently

The starter is the correct page-count formula. It's right for every valid input, and it doesn't check the page size. Press **Run** (or F5) and read the three cases.

The first two pass. The third is the invalid input: five items with a page size of zero. Its result depends on the language. In C# and Python, the division fails with an error from the runtime, and the message says something about division, not about the page size. In JavaScript, division by zero returns infinity, and the code happily reports infinity as a page count.

The same invalid input produces three different results, and only one of them is a clear statement of the problem. The other two are a consequence of the formula, not a check on the input.

The expected output is the clear statement. Press **Check** on the starter to see the difference. Then press **Run** on the solution, which checks the invariant first and raises the same error in every language. All three cases pass.

> **A note on the code.** The starter and solution were written by hand to show the failure. They aren't a record of what any assistant produced. A fix written by an assistant may fail in a different way, and the same check finds it.

## Find the invariant

To find the invariant, ask what the fix would need to be true for it to give a meaningful answer. For the page count, the page size must be a positive whole number. For a fine, the days must be zero or more. For an average, the list must not be empty.

Then write one case that breaks each invariant, and see what happens. A fix that gives an error that names the problem has handled the invariant. A fix that gives an answer, or an error that doesn't name the problem, has not.

## Why a fix that looks complete can be wrong

A fix that handles the reported case is complete for that case. It's wrong for the cases it doesn't mention, and those are often the cases a caller will meet eventually, such as a configuration value that's set to zero. The bug you're fixing was discovered by one input. The next bug will be discovered by another, and the invariant is what connects them.

> **Aside: the two kinds of wrong fix.**
> A fix can be wrong because its formula is wrong, which the earlier step caught. It can also be wrong because its formula is right and its inputs are not checked, which this step caught. The first kind is a logic error, and it shows up in the reported case if you test it. The second kind is an assumption error, and it shows up only in the cases you didn't think of. Both need the case list, but only the second needs you to ask which inputs the code was never meant to receive.

## Try it

Take the page-count fix and write down its invariant. Then write three cases: one that breaks the invariant, one at the boundary of the valid range, and one that's entirely normal. Run each case, and record what happens in each language. Save your cases and results in a file called `invariants.txt` in your practice folder.

---
