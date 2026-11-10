# Homework: Review Three Generated Functions

An assistant produced three functions from a short request: *"Write helper functions for a small reporting script. Parse retry delays, fetch a user's age, and apply a discount to a price."* None of them has been reviewed. Your job is to run them against the spec below, find the defects the harness shows, write a claim for each one, and write a review note for each function that a team lead could act on.

The starter for this step contains the three functions and a harness. The harness prints one row for each case in the spec. Run it, and read the rows before you read the code.

## The spec

The spec wasn't written before the code was generated, so the rows below were written afterwards, from the request and the reporting script's needs. Your review will also find what the spec should have said.

**Retry delays.** The function reads a comma-separated list of delays in milliseconds and returns them as whole numbers. Spaces around a number are allowed. An empty part is an error. A part that isn't a number is an error.

**User age.** The function asks the age service for a user's age and returns it. If the caller cancels the request, the function stops and reports that it was cancelled.

**Discount.** The function takes a price in whole cents and a percentage from 0 to 100, and returns the discounted price in whole cents. Tax isn't applied here. The caller applies it.

## Run it

Press **Run** (or F5) on the starter and read the eight rows. Each row is a case from the spec. Then press **Check**. The starter's output won't match the expected output, and the rows that differ are the ones to review first.

Once you've found the defects, press **Run** on the solution. The solution fixes them, and its output is the expected result. Compare your claims with the solution after you've made them, not before.

## What to hand in

Write your work in a file called `review-notes.md` in your practice folder. For each function:

- **Claims.** One claim per defect, in the form from the reading step: the condition, the behavior, and the rule it breaks. Name the row that shows it.
- **Checklist entries.** The items from the review checklist that failed, with a reason, and the items that don't apply, with a reason.
- **A review note.** No more than ten lines, addressed to the author. State whether the function can be accepted, and what must change before it can. Name the claims the author must answer, and say what the spec must add before the function is reviewed again.

Then add a paragraph that answers two questions. Which row was the most surprising, given the code looked reasonable? Which defect would a run alone have hidden, if the harness had only checked the normal cases?

---

~~~spoiler
Answer key. Your claims will be worded differently, and you may find defects that aren't listed here. What matters is that each claim names the row that shows it, the condition, and the rule.

**What the starter prints.** In C# and Python, the retry rows for `100, abc` and `100, 200,` print an empty list, because the catch-all returns an empty result. In JavaScript, the same rows print `100 NaN` and `100 200 NaN`, because `parseInt` doesn't throw. The cancelled row prints `42` in all three. The discount rows print wrong values in all three, because the code treats the percentage as a fraction and adds tax.

**Function one: retry delays.**

- *Errors become empty results.* The catch-all in C# and Python turns a malformed delay into an empty list. A caller can't tell that from an input with no delays. Rule: errors are reported, not converted to empty results.
- *JavaScript turns errors into numbers.* `parseInt` returns `NaN` for a bad part, and the function keeps it. A delay of `NaN` can't be used, and nothing reports it. Rule: a part that isn't a number is an error.
- *Empty parts aren't handled.* A trailing comma produces an empty part, which the spec says is an error. The three languages handle it differently, which is why the row that the spec defines must be checked in each.

**Review note, function one.** Not accepted. Malformed input is converted into an empty result or into `NaN`, so the caller receives no error. Please report each malformed case as an error in each language, and add the rows for `100, abc` and `100, 200,` to the test that the spec requires.

**Function two: user age.**

- *Cancellation is accepted and ignored.* In all three versions, the cancellation parameter never reaches the call that waits. The cancelled row prints `42`, so the function keeps going after the caller has asked it to stop. Rule: a stop signal must reach the calls that wait.
- *Blocking was not tested here, and should be.* In a console program the C# version's blocking call happens to work. In a UI or request context, a blocked call can deadlock. A harness in a console program can't show that, so a reviewer should say so in the note.

**Review note, function two.** Not accepted. The function accepts a cancellation signal and never honors it. Please check the signal before the call, pass it to the service, and add a test that cancels a request and expects a cancellation result.

**Function three: discount.**

- *Percentage treated as a fraction.* The function multiplies by the percentage directly, so a caller who passes `10` gets a negative price. The signature doesn't state the unit. Rule: the unit of every value belongs in the signature or the spec.
- *Tax is applied inside the function.* The spec says tax belongs to the caller, so the `1.0825` multiplier is wrong, and it's also a regional value written into the source. Rule: no environment-specific value is written in the source, and each function does what its spec says.
- *Floating-point money.* The function uses floating-point arithmetic for money, so results can carry rounding error. The spec says whole cents. Rule: money is an exact amount in whole units.

**Review note, function three.** Not accepted. The function treats the percentage as a fraction, applies tax the spec leaves to the caller, and uses floating-point money. Please take the percentage as a whole number from 0 to 100, return whole cents, remove the tax, and add the cases `1000` at `0` and `1000` at `100` to the acceptance table.

**What a strong review looks like.** Each function gets a note that says accept or reject, names the claims the author must answer, and states what the spec must add before review can continue. The note doesn't rewrite the function. It says what the function must do and why.

**Common mistakes.** Accepting a function because the code is tidy. Writing "looks fine" for a row instead of a reason. Asking for a rewrite without naming the claim behind it. Assuming the cancelled row is fine because the parameter is in the signature. Reporting a defect in the starter without checking whether the spec actually requires the behavior.
~~~

---
