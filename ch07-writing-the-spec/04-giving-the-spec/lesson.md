# Giving the Spec to the Assistant

With a spec and its acceptance examples written, you're ready to hand the work to the assistant. This step covers how to do that so the output can be checked, how to run the check, and how to report a failure without starting a new argument.

## How to hand over the spec

Give the assistant the spec itself, not a summary of it. A summary is one more layer of interpretation, and the assistant then works from your summary of the spec. Paste the file, or attach it, and say which parts are authoritative.

> Here is the spec for the fines calculator. Implement it in C# for .NET 10. The acceptance examples are the authoritative test of correctness. Don't change any example. Return the complete method, and nothing else.
>
> [the contents of SPEC.md]

The instruction at the start does three things. It names the source of truth, the acceptance examples. It forbids the assistant from editing the examples, which is the most common way a generated test suite becomes useless. And it limits the output to the thing you'll check.

Chapter 9 covers the danger of an assistant changing tests to make them pass. Forbidding that change in the request is the first defense.

## Check every example, not the code

When the output comes back, don't start by reading the code. Start with the table. Run each acceptance example against the output, and record the result next to it. A reviewer who reads the code first tends to accept a method that looks right and fails one case, and a reviewer who runs the table first can't be fooled by that.

Here is a check record for a generated method. The table is the same one from the previous step.

| Days overdue | Expected (cents) | Actual (cents) | Result |
|---|---|---|---|
| 0 | 0 | 0 | pass |
| 3 | 0 | 0 | pass |
| 4 | 25 | 0 | fail |
| 83 | 2000 | 1975 | fail |
| 200 | 2000 | 2000 | pass |
| -1 | error | error | pass |

Two rows fail, and the check record says exactly where. The output is right for zero, for three, and for two hundred, which is why a casual look would have passed it. Both failures sit on the edges of the grace period and the cap.

## What the failure looks like in the code

Here is the kind of defect the table found: the grace period is subtracted one day too many, so the first chargeable day is skipped. The examples show the same defect in each language.

~~~examples
```csharp
// Defect: the grace period is applied as "days - 3 - 1", so day four costs nothing.
public static int FineCents(int daysOverdue)
{
    if (daysOverdue < 0) throw new ArgumentOutOfRangeException(nameof(daysOverdue));
    int chargeable = daysOverdue - 3 - 1;
    if (chargeable <= 0) return 0;
    return Math.Min(chargeable * 25, 2000);
}
```
```python
# Defect: the grace period is applied as "days - 3 - 1", so day four costs nothing.
def fine_cents(days_overdue: int) -> int:
    if days_overdue < 0:
        raise ValueError("days_overdue must not be negative")
    chargeable = days_overdue - 3 - 1
    if chargeable <= 0:
        return 0
    return min(chargeable * 25, 2000)
```
```javascript
// Defect: the grace period is applied as "days - 3 - 1", so day four costs nothing.
export function fineCents(daysOverdue) {
  if (daysOverdue < 0) throw new RangeError("daysOverdue must not be negative");
  const chargeable = daysOverdue - 3 - 1;
  if (chargeable <= 0) return 0;
  return Math.min(chargeable * 25, 2000);
}
```
~~~

Notice what the defect is not. It isn't a syntax error, it compiles and runs, and it looks like a reasonable calculation. The line `daysOverdue - 3 - 1` has an extra subtraction that a reader might explain away as "the grace period starts a day late." The spec says it doesn't, and the table is the only thing that shows it.

Also notice the 83-day row. The defect gives 79 chargeable days, one fewer than the 80 the spec needs, so the fine is 1975 cents instead of the 2000-cent cap. That row fails for the same reason as the four-day row, and the arithmetic shows why the cap was never reached. A reviewer doesn't need to trace the cause to know the row fails. The table says which rows fail, and the code is the next place to look.

## Report the failure as a precise follow-up

When a row fails, report it to the assistant with the row, the expected value, the actual value, and the rule it breaks. Don't write "it's wrong for some cases." That gives the assistant nothing to aim at, and it tends to change parts of the code that were already right.

> **Vague report:**
> Some of the cases are wrong. Please fix them.
>
> **Precise report:**
> The acceptance table fails on two rows. Four days overdue should owe 25 cents, and the method returns 0. Eighty-three days overdue should owe 2000 cents, and the method returns 1975. The grace period is applied one day too many. Correct the grace-period arithmetic only. Don't change any acceptance example, and keep the cap and the error behavior as they are.

The precise report names the rows, the rule, the scope of the fix, and what must not change. That's the same pattern as Chapter 5's keep-clause, applied to a whole table.

## Run the table again, every time

After each follow-up, run the whole table again, not only the rows you asked about. A fix to one row can break another, and the spec is the only complete list of what must hold. A check that covers only the rows you changed is a check you've chosen, and the choice is where the defect hides.

> **Aside: why the table does what reading can't.**
> Reading code asks you to simulate the code in your head, which is slow and unreliable for boundaries. Running the table asks the machine to do the simulation, and it reports the result for every row at once. The table also captures what the spec promised, so it can't drift the way a reviewer's memory can. A spec with examples is a test that a person can read, and that is the reason the spec and the table are written before the code.

## Run it

The starter is the generated fines function from this step, with its defect, checked against the full acceptance table. Press **Run** (or F5) and read the check record. It shows the failures the table found: four days overdue returns zero where the spec says twenty-five cents, and eighty-three days returns 1975 cents where the spec says the cap, 2000.

The expected output is the record for the fixed function. Press **Check** to see the mismatch. Then press **Run** on the solution, which applies the precise follow-up from this step to the grace-period arithmetic and changes nothing else. Every row passes.

The point is the order. You didn't read the code to find the defect. You read the table, found the rows that failed, and then looked at the one line the failures pointed to. Read the code after the table, not before.

> **A note on the code.** The starter and solution were written by hand to show the failure and the fix. They aren't a record of what any assistant produced. Use this step to practice reading a check record and fixing only what it names.

## Try it

Give your SPEC.md to your chosen assistant, with the instruction from the first section. Run every row of your acceptance table against the output, and fill in a check record like the one above. If any row fails, write one precise follow-up in the form shown, and run the whole table again. Save the spec, the check records, and the follow-up in a file called `spec-check.txt` in your practice folder.

---
