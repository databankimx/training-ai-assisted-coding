# Pasting the Actual Output

When something is broken, the most useful thing you can give an assistant is the output the program actually produced. Not your summary of it, not what you remember it saying, and not what you expected. The exact text, copied from the terminal or the log, with nothing removed.

Summaries lose the detail that narrows the search. "It skipped some items" could describe a dozen bugs. The line `total shown: 6 of 7` describes one.

## Why the exact text matters

An error message names the place the program failed, and sometimes the kind of failure. A summary of the message keeps the feeling and loses the position. An output line with numbers keeps both, and the numbers are often the clue. A page count of two for seven items says something a description of "the last items are missing" does not.

Copy the output as it is, including any blank lines, error codes, and stack traces. Do not tidy it. Formatting differences can be part of the evidence.

## The example

The starter is a paging helper. It shows seven items, three per page. Press **Run** (or F5) and copy the output into a report exactly as it appears. The three lines are the page output and the total, and the last line is the one that matters: `total shown: 6 of 7`.

The expected output is what the program should print. Press **Check** on the starter to see the mismatch. The difference is on the page list and the total: a third page is missing, and item seven never appears.

Press **Run** on the solution to see the corrected output, where the page count rounds up. Compare the solution's output with the starter's line by line. The only change is in the number of pages, and the cause is a single line of arithmetic.

> **A note on the code.** The starter and solution were written by hand to show the bug. They aren't a record of what any assistant produced. Use the same habit on your own output: copy it, compare it with what should happen, and find the first line that differs.

## What to do with the output

Paste the exact output into the report, under the observed heading from the previous step. Add the expected output beside it. Then point at the first line that differs, and say what the difference is in terms of the numbers. In this case: the program showed two pages where three were expected, and six items where seven were expected.

A difference in the numbers is a stronger starting point than a description. It tells you what quantity is wrong, and it suggests where the calculation goes wrong, which is the page count, not the page contents.

> **Aside: why the first differing line matters.**
> A program that prints a long output often has many lines that are correct and one that is not. The first line that differs from the expected output is usually the earliest point where the program went wrong. Later lines may be wrong only because the earlier one was. Reading from the top and stopping at the first difference is a reliable way to find where to look.

## Try it

Take the starter's output, and write the report with the four parts from the previous step, using the exact output. Mark the first line that differs from the expected output, and name the quantity that is wrong. Save the report in a file called `output-report.txt` in your practice folder.

---
