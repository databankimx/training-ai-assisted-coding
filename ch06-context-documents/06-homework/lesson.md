# Homework: A Context Document for an Unfamiliar Module

This homework gives you a module you haven't seen before. It's a library fines calculator: it works out the late fee for a borrowed item, given the number of days it was overdue. It's invented, and it's small, but you'll treat it as if a colleague had handed it to you with no other explanation.

Your job has three parts. Write a context document for the module from its code. Use the document to generate one small feature. Then report honestly where the document helped and where it was missing.

Write your work in a file called `fines-context.txt` in your practice folder. Keep the context document, the prompt you gave the assistant, the output, and your report, in that order.

## The module

Read the module's public entry point in your language. The other two versions are there for reference, and you can use any of them.

~~~examples
```csharp
public static class FineCalculator
{
    // Returns the fine in cents for an item returned after the due date.
    // Items returned on or before the due date owe nothing.
    // The fine is 25 cents per day, capped at 2000 cents.
    public static int FineCents(int daysOverdue)
    {
        if (daysOverdue < 0) throw new ArgumentOutOfRangeException(nameof(daysOverdue));
        if (daysOverdue == 0) return 0;
        return Math.Min(daysOverdue * 25, 2000);
    }
}
```
```python
def fine_cents(days_overdue: int) -> int:
    """Return the fine in cents for an item returned after the due date.

    Items returned on or before the due date owe nothing.
    The fine is 25 cents per day, capped at 2000 cents.
    """
    if days_overdue < 0:
        raise ValueError("days_overdue must not be negative")
    if days_overdue == 0:
        return 0
    return min(days_overdue * 25, 2000)
```
```javascript
/**
 * Returns the fine in cents for an item returned after the due date.
 * Items returned on or before the due date owe nothing.
 * The fine is 25 cents per day, capped at 2000 cents.
 */
export function fineCents(daysOverdue) {
  if (daysOverdue < 0) throw new RangeError("daysOverdue must not be negative");
  if (daysOverdue === 0) return 0;
  return Math.min(daysOverdue * 25, 2000);
}
```
~~~

## Step one: write the context document

Write a context document using the seven sections from the anatomy step: purpose, key types, entry points, conventions, patterns to follow, what to avoid, and examples. A module this small may not need every section, so say which sections you left out, and why. Keep the document under a page.

Write it from the code and the comments only, as if the module's author were unavailable. Don't invent rules that the code doesn't show. If you think a rule is missing, say so in the document as a question for the author, and don't pretend it's settled.

## Step two: generate a feature

Use your document to ask the assistant for one feature. The feature is a grace period: the first three days after the due date are free of charge, and the fine applies only to days beyond them. Don't add the grace period to the document first. The point is to see whether the document, as it stands, gets the assistant to the right answer.

Ask for the feature in your chosen language, with the document in the session the way the last step described. Keep the prompt you used, and the output you got.

## Step three: report where it helped and where it was missing

Write a report of three to five sentences for each part below.

- **Where the document helped.** Name one place the assistant followed the document and got something right that it would otherwise have guessed. Say what the guess would have been.
- **Where the document was missing.** Name one place the assistant guessed, because the document didn't cover it. Say what it guessed, and what the document would need to say to prevent it.
- **What you would add first.** Name the single line you'd add to the document to prevent the most expensive mistake you saw.

## Run it

The starter is a grace-period feature as an assistant might generate it from a context document that didn't mention the grace period. It applies the fine from the first overdue day and ignores the three free days. The harness checks the five cases from the list below. Press **Run** (or F5) and read each line.

Two cases fail. A book one day late should owe nothing, and a book four days late should owe 25 cents, not 100. The cap case passes, which is why a quick look at the output would miss the defect: the cap hides the wrong grace period for large numbers of days.

Press **Check** on the starter, then press **Run** on the solution. The solution applies the grace period before the cap, which is the order the context document specifies.

After you've written your own context document and used it to generate a feature, run your output against these five cases. Then check whether your document, and not your memory, is what got the assistant to the right answer.

> **A note on the code.** The starter and solution were written by hand to show the defect and the fix. They aren't a record of what any assistant produced. Use the cases to check your own generated feature.

## Check your work

Check your output against these cases. They describe the behavior the grace-period feature should have, using the same fines rule as the module.

- A book returned on its due date owes 0 cents.
- A book returned one day late, with a three-day grace period, owes 0 cents.
- A book returned four days late owes 25 cents.
- A book returned 200 days late owes 2000 cents, because of the cap.
- A negative number of days is an error, as in the original module.

Run the output against each case in your language, and write down the result next to the case.

---

~~~spoiler
Answer key. Your document will be different, and that's expected. What matters is that every rule in it traces to the code, that the document makes no claims the code doesn't support, and that your report is honest about the gaps.

**A sample context document, written from the code only.**

```markdown
# Context: Fines Calculator

## Purpose
Works out the late fee for a library item from the number of days it was overdue.
It doesn't handle payments, reminders, or due dates.

## Key types
None. The module takes and returns plain integers.

## Entry points
- `FineCents(daysOverdue)` (or `fine_cents` / `fineCents`): returns the fine in cents.
  Returns 0 for zero days. Throws for a negative number of days.

## Conventions
- Money is an integer number of cents, never floating-point.
- Errors are exceptions, not sentinel values.

## Patterns to follow
- Validate the input first, then return early for the zero case, then calculate.

## What to avoid
- No floating-point arithmetic for cents.
- Don't change the cap or the daily rate without a decision from the author.

## Examples
- Zero days overdue costs 0 cents.
- Four days overdue costs 100 cents.
- 200 days overdue costs 2000 cents, because the fine is capped.

## Open questions for the author
- Is there a grace period? The code doesn't show one.
- Does the cap apply per item or per borrower? The code can't say.
```

Notice what this document leaves out. It doesn't invent a grace period, and it doesn't assume the cap is per item. The two open questions are the honest answer to the gaps in the code, and they're the kind of line a future reader needs most.

**What a good report looks like.**

- *Where it helped:* the document said money is integer cents, so the assistant didn't use floating-point dollars for the grace-period calculation. Without it, a generated version would likely have returned a fraction of a dollar.
- *Where it was missing:* the document had no rule about how the grace period interacts with the cap, so the assistant may have applied the cap before subtracting the free days, or after. Check which one it chose against the cases. The document should say the order explicitly.
- *What you would add first:* a line in "What to avoid" or the examples that fixes the order of the grace period and the cap, with one worked example, such as "a book four days late with a three-day grace period costs 25 cents, and the cap is applied after the grace period is subtracted."

**Common mistakes.** Writing rules the code doesn't show, such as a grace period or a per-borrower cap, and then reporting that the assistant "followed the document" when it followed invented facts. Reporting only the successes. Adding the grace period to the document before generating the feature, which removes the test. Skipping the open questions because they make the document look unfinished. An unfinished document with honest questions is more useful than a finished one with guesses.

**What good work looks like.** A document where every line traces to the code, a clear note on the sections you left out and why, a feature that either matches the cases or has a specific, named gap, and a report that names one real limit of the document and one real help.
~~~

---
