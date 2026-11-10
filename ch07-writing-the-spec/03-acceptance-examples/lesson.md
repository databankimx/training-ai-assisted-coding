# Acceptance Examples

An acceptance example is a concrete case with an exact expected result. It says: this input must produce this output, and if it doesn't, the work isn't done. Examples are the part of a spec that turns a description into something you can check, and they're the bridge between the spec and the tests in Chapter 9.

Examples are cheap to write and expensive to skip. Most of the defects that reach review are cases that no example covered.

## Where examples come from

Examples come from the spec, not from the code. This is the same rule Chapter 5 gave for tests: the expected value must come from an independent source. If you write the examples by reading the code, you'll write examples that the code passes, and they'll prove nothing.

For the grace-period feature, the spec states the rules, and each example is a worked application of one rule.

> Rule: the first three days are free.
> Example: three days overdue owes 0 cents.
>
> Rule: the fine is 25 cents per day after the grace period.
> Example: four days overdue owes 25 cents.
>
> Rule: the cap applies after the grace period.
> Example: 200 days overdue owes 2000 cents.

## Cover the boundaries

Most generated code is right in the middle of a range and wrong at its edges. A boundary is the value on either side of a rule's threshold. For a grace period of three days, the boundary is between three and four days, and that's where an example belongs.

> **Weak set, only the middle:**
> Ten days overdue owes 175 cents.
>
> **Stronger set, with the boundaries:**
> Zero days owes 0. Three days owes 0. Four days owes 25. Eighty-three days owes 2000.

The stronger set puts examples on both sides of each threshold, so an off-by-one error can't hide. Four days is the first day that should cost money, so the example at four is the one that catches a grace period applied one day short.

The cap has a boundary too, and it's easy to get wrong by hand. Eighty-one days overdue means 78 chargeable days. Seventy-eight times 25 is 1950, which is below the cap, so 81 days owes 1950 cents, not 2000. The cap is first reached at 83 days, because 80 chargeable days at 25 cents is exactly 2000.

Hand-worked examples go wrong easily, and an example that's wrong teaches the assistant the wrong answer with the authority of the spec. Check every example against the rule that produced it, and work the arithmetic out a second time.

## Cover the error cases

Every error the spec names needs an example. An error case has an input, and an expected behavior that isn't a value: an exception, a message, or a refusal.

> Error example: a negative `daysOverdue` throws an argument error that names the parameter.

Error examples are the ones most often missing from specs, and the ones that catch generated code that returns a silent zero or a negative fine. A test that only checks normal values will pass a method that never throws.

## The table, in each language

A table of examples becomes a test with almost no changes. Each row is one test case. The three versions below test the same grace-period rules, in the form each language's testing tools expect. The table is the source, and the tests are generated from it by hand, so a reviewer can check the two against each other.

~~~examples
```csharp
// NUnit: each TestCase is one row of the acceptance table.
[TestCase(0, 0)]
[TestCase(3, 0)]
[TestCase(4, 25)]
[TestCase(83, 2000)]
[TestCase(200, 2000)]
public void FineMatchesAcceptanceTable(int daysOverdue, int expectedCents)
{
    Assert.That(FineCalculator.FineCents(daysOverdue), Is.EqualTo(expectedCents));
}

[Test]
public void NegativeDaysThrows()
{
    Assert.Throws<ArgumentOutOfRangeException>(() => FineCalculator.FineCents(-1));
}
```
```python
# pytest: parametrize turns each row into one test case.
import pytest

@pytest.mark.parametrize("days_overdue, expected_cents", [
    (0, 0),
    (3, 0),
    (4, 25),
    (83, 2000),
    (200, 2000),
])
def test_fine_matches_acceptance_table(days_overdue, expected_cents):
    assert fine_cents(days_overdue) == expected_cents

def test_negative_days_raises():
    with pytest.raises(ValueError):
        fine_cents(-1)
```
```javascript
// Jest: test.each turns each row into one test case.
describe("fineCents acceptance table", () => {
  test.each([
    [0, 0],
    [3, 0],
    [4, 25],
    [83, 2000],
    [200, 2000],
  ])("%i days overdue owes %i cents", (daysOverdue, expectedCents) => {
    expect(fineCents(daysOverdue)).toBe(expectedCents);
  });

  test("a negative number of days throws", () => {
    expect(() => fineCents(-1)).toThrow(RangeError);
  });
});
```
~~~

The three test files look different, and they check the same table. That's the point. The table is the part that belongs to the spec, and the tests are a translation of it. If someone changes the cap in the spec, the table changes first, and the three tests follow.

## Acceptance examples and the assistant

When you give a spec to an assistant, the acceptance examples are the most useful part, because they're concrete. Chapter 6 made the same point about the examples section of a context document. The assistant tends to match its code to the examples it's given, so a table that covers the boundaries and the errors does more to shape the output than any amount of prose.

> **Aside: why examples beat prose for a model.**
> A rule such as "the cap applies after the grace period" can be read several ways. An example such as "83 days owes 2000 cents" can be checked by arithmetic, and it can only be satisfied one way. Examples remove ambiguity in a way that wording can't, and they give the reviewer the same test the assistant was given.

## Run it

The starter is a fines function with a defect: it applies the grace period one day too long. It's checked against a weak table, which has only the middle of the range, the cap, and the error. Press **Run** (or F5) and read the three lines.

All three rows pass. The weak table doesn't reach the boundary where the defect shows, so the defect is invisible to it. That's the lesson of this step, in one run: a table that passes proves very little.

The solution has the function fixed and the full table from this step: both sides of the grace period, the cap, and the error. Press **Check** on the starter. The row count differs, so the output doesn't match. Then press **Run** on the solution. Every row passes, because the function is now right. Rerun the starter's function against the full table, and the boundary rows fail: that's the check record from the next step.

> **A note on the code.** The starter and solution were written by hand to show the defect. They aren't a record of what any assistant produced. Use this step to see that the table's coverage decides what a passing run means.

## Try it

Take the spec you wrote in the previous step. Write an acceptance table with at least one example for each rule, one example on each side of each boundary, and one example for each error. Check every expected value by working it out separately. Save the table in a file called `acceptance.md` next to your `SPEC.md`.

---
