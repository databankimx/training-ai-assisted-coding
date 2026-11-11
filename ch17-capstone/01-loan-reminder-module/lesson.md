# Capstone: A Loan Reminder Module

This is the course's final project. It uses everything from the earlier chapters on one task, in two languages, and it ends with the review a team lead would expect. The work is yours. The brief gives you the spec, the acceptance examples, and the rubric, and it asks you to make every other decision yourself, with the assistant as a tool and not as the author.

The capstone is a loan reminder module for a small library. It works out which loans are due soon and which are overdue, and it reports them. It's deliberately close to the fines module you know, with one new rule and one new kind of error, so the new parts stand out.

## The brief

Write the module in **C#** for .NET 10 and in **Python** for Python 3.12, from the same spec. Both must pass the same acceptance table.

Read the spec below before you touch a tool.

### The spec

**Purpose.** For a given "today", report the loans that need a reminder, and total the fines on loans that are overdue. The module does not send reminders, store anything, or show anything. Those are other modules' jobs.

**Inputs.** A list of loans. Each loan has an id (an integer), a borrower name (text), a due date (a calendar date, in the form `YYYY-MM-DD`), a returned flag (true or false), and a reminded flag (true or false). The input also includes "today" as a calendar date, in the same form. The module never reads the system clock.

**Outputs.** Two results:
- A list of loan ids that need a reminder. A loan needs a reminder when it is not returned, it is not already reminded, and its due date is within three days after today, inclusive. A loan due today or in the next three days needs a reminder.
- The total fine, in integer cents, for all loans that are not returned and whose due date is before today. The fine is 25 cents per day past the due date, with no free days, capped at 2000 cents per loan.

**Errors.**
- A date that is not in the form `YYYY-MM-DD`, or that is not a real calendar date, is an error. The error names the loan id.
- A loan whose due date is before its own borrowed date is an error. The error names the loan id. (Each loan also carries a borrowed date, in the same form, which is an input.)
- An empty loan list is not an error. It gives an empty list of reminders and a total of zero.

**Constraints.**
- C# for .NET 10 and Python 3.12. Standard library only in Python, and no packages in C#.
- Money is integer cents, never floating-point.
- Dates are calendar days. No time zones, no times of day.
- Output order for reminders is the input order.
- No network, no file access, no clock.

**Out of scope.** Sending reminders, persistence, user interface, currency conversion, and any reminder rule beyond the one above.

### The acceptance table

Your suite must include at least these rows. Each row is one loan, one "today", and the expected result. Add rows of your own, and write each expected value from the spec before you run the code.

| Loan | Borrowed | Due | Returned | Reminded | Today | Reminder? | Fine (cents) |
|---|---|---|---|---|---|---|---|
| 1 | 2026-10-01 | 2026-11-10 | no | no | 2026-11-10 | yes | 0 |
| 2 | 2026-10-01 | 2026-11-13 | no | no | 2026-11-10 | yes | 0 |
| 3 | 2026-10-01 | 2026-11-14 | no | no | 2026-11-10 | no | 0 |
| 4 | 2026-10-01 | 2026-11-08 | no | no | 2026-11-10 | no | 150 |
| 5 | 2026-10-01 | 2026-11-08 | yes | no | 2026-11-10 | no | 0 |
| 6 | 2026-10-01 | 2026-11-09 | no | yes | 2026-11-10 | no | 25 |
| 7 | 2026-10-01 | 2026-09-01 | no | no | 2026-11-10 | error: loan 7 due before borrowed | n/a |
| 8 | 2026-10-01 | 2026-13-40 | no | no | 2026-11-10 | error: loan 8 has an invalid date | n/a |

Work the fines out by hand. Loan 4 was due on 2026-11-08, and today is 2026-11-10, so it is two days overdue, at 25 cents per day, which is 50 cents. Check the table's 150 against that before you use it. If the table is wrong, the spec is wrong, and the correction goes in the spec, with a note of who decided it.

> **A note on the table.** One expected value in the table above is deliberately wrong for the spec as written. Find it, work it out, and record the correction in your review. A capstone that accepts a wrong expected value without checking has failed the first test of the review.

### The deliverables

Submit one folder with these parts:

1. **The context document.** A short markdown file for the module, with the seven sections from Chapter 6, written for the assistant.
2. **The spec.** Your own `SPEC.md`, written from the brief above, with any decisions the brief leaves open written down as decisions.
3. **The generated code.** The C# and Python implementations, with the prompts you used and the outputs you received, in the order you used them.
4. **The test suite.** Tests in both languages, written from the spec, with at least one mutant from Chapter 9 that your suite catches.
5. **A debugging log.** One real defect you found and fixed, with the output you pasted, the hypotheses you tested, and the root cause.
6. **A refactoring record.** One refactoring pass in checkpoints, with the behavior check after each checkpoint.
7. **The documentation.** Documentation for the public functions in both languages, with each sentence checked as a claim against the behavior.
8. **The review.** A written review of your own generated code, with each finding classified as authorization, input validation, secret exposure, or another category you name, and the decision for each file.
9. **The reflection.** One page on where the assistant helped, where it did not, and which stop condition you were closest to hitting.

## The rubric

The rubric is the answer key. Use it to check your own work before you submit it, and a reviewer will use it to grade the work.

**Behavior (must pass).** Both implementations pass every row of the acceptance table, including the rows you added, and the error cases return the errors the spec names. A failing row is a fail on this criterion, whatever else is good.

**Spec quality.** Every decision the brief left open is written down, with who decided it. The spec states the units, the errors, and the boundary rule in the words that the acceptance table uses.

**Test quality.** The tests come from the spec, not from the code, and at least one mutant is caught that the first version of the suite missed.

**Process evidence.** The prompts, outputs, checkpoints, and debugging log are in the order they happened. A reviewer can see where the assistant's output was changed, and why.

**Review quality.** Each finding names a category, a line, and a rule. Each decision names the finding that decided it. A review that accepts everything without a finding is a fail on this criterion.

**Reflection.** The reflection names a specific moment, a specific stop condition, and a specific decision. A reflection that says the assistant was "very helpful" with no example is a fail on this criterion.

**Grading.** The capstone is pass or fail. Behavior, review quality, and reflection must pass. Spec quality, test quality, and process evidence pass when they're met. Each criterion gets a short note with the reviewer's reasons, whatever the result. The course owner decides, with an optional second reader from the development team.

> **Aside: why the review is graded as hard as the code.**
> The code is what the assistant produced, and the review is what you did. The course's whole argument is that the review is the part that answers for the code. A capstone that is graded only on the code would reward the assistant's output and not your judgment, which is the opposite of the lesson.

## Where to start

Read the spec. Write the context document first, then the spec, then the table. Check the table's fines by hand before you generate anything. Then use the workflow from the earlier chapters, one step at a time, and keep the record as you go. The record is the most important deliverable, because a capstone reconstructed from memory at the end is a summary, and the rubric asks for the record.

---
