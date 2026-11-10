# Code That Passes Every Check and Is Still Wrong

The checks in a delivery pipeline are valuable, and they catch a great deal. The compiler rejects type errors, analyzers flag suspicious patterns, scanners find known vulnerabilities, and tests confirm the cases someone wrote down. Generated code that clears all of them is in better shape than code that doesn't.

It's still not proof. Every automated check answers a question someone asked in advance, and a defect that falls outside those questions passes through. This step is about those defects, and about the review step that finds each kind.

## Why the checks miss some defects

A tool can only check what it was built to check. A compiler knows the types, not the units. A scanner knows the patterns it was given, not the business rules. A test checks the cases its author thought of, and the author's own assumptions are the ones the test is most likely to share with the code. A defect that sits in the gap between what the code does and what it should do is the one that passes.

That gap is where generated code does its most dangerous work. The code is consistent with itself, and it matches the common patterns the checks look for. What it lacks is the one fact that only the spec or the business rule supplies.

## A wrong unit at the call site

Each function is correct on its own. The defect is in how a caller uses it. Here is a caller that passes a weight in kilograms to a method that expects grams.

~~~examples
```csharp
// The estimator takes grams. The caller passes kilograms.
int costCents = ShippingEstimator.EstimateCents(2, zone);   // meant 2000 grams
```
```python
# The estimator takes grams. The caller passes kilograms.
cost_cents = estimate_cents(2, zone)  # meant 2000 grams
```
```javascript
// The estimator takes grams. The caller passes kilograms.
const costCents = estimateCents(2, zone); // meant 2000 grams
```
~~~

The compiler accepts each call, because the type is an integer in every language, and the unit is nowhere in the type. The method's own tests pass, because they test the method with grams. The defect is at the call site, and only a review that asks "what unit does the caller pass?" finds it. The fix is in the type, not the logic: a unit-carrying type makes the mistake a compile error, which is why Chapter 6's context document named the unit.

## A check that passes for the wrong reason

A test can pass because it checks the code's own output, rather than the requirement. The test below was written after the method, from the method's output, and it passes whatever the method returns.

~~~examples
```csharp
[Test]
public void FineIsCorrect()
{
    Assert.That(FineCalculator.FineCents(10), Is.EqualTo(FineCalculator.FineCents(10)));
}
```
```python
def test_fine_is_correct():
    assert fine_cents(10) == fine_cents(10)
```
```javascript
test("fine is correct", () => {
  expect(fineCents(10)).toBe(fineCents(10));
});
```
~~~

These tests are obviously circular once someone reads them, and they're easy to write by accident when a test is generated from the code. Chapter 5 gave the rule: the expected value must come from the specification. A reviewer checks each assertion against the spec, not against the method.

## An authorization defect that scanners don't see

Security scanners are good at known patterns, such as string-built queries or hardcoded keys. They are weaker at logic that is correct as code but wrong for the business. Authorization is the classic case. The code checks that a user is logged in, and then returns a record the user has no right to see.

~~~examples
```csharp
// Checks that the user is logged in, but not that the order belongs to them.
public Order GetOrder(int orderId, ClaimsPrincipal user)
{
    if (!user.Identity.IsAuthenticated) throw new UnauthorizedAccessException();
    return _orders.Find(orderId);
}
```
```python
# Checks that the user is logged in, but not that the order belongs to them.
def get_order(order_id, user):
    if not user.is_authenticated:
        raise PermissionError("Not signed in.")
    return orders.find(order_id)
```
```javascript
// Checks that the user is logged in, but not that the order belongs to them.
function getOrder(orderId, user) {
  if (!user.isAuthenticated) throw new Error("Not signed in.");
  return orders.find(orderId);
}
```
~~~

A scanner sees a clean function with a clear check, and it has no rule that says an order must belong to the caller. The defect is that any signed-in user can read any order by changing the number in the request. The review question is "who is allowed to see this?", and the answer must come from the business rule, not from the code. Chapter 15 covers security-sensitive code in depth. For this step, the point is simpler: a passing scan is not a statement that the access rule is right.

## A rule the spec never stated

Sometimes the code is correct for the spec, and the spec is incomplete. A rounding rule, a retry limit, or an ordering guarantee may be missing, and the code fills the gap with a sensible default. The checks pass, because nothing says the default is wrong. The review finds the gap by asking what the spec leaves open, and whether the default is one the business would accept.

> Spec: the fine is 25 cents per day, after a three-day grace period.
>
> Gap: the spec doesn't say whether a book returned on the grace period's last day is free. The code assumes it is. The reviewer should not accept that silently. The question goes back to the author of the spec, and the answer goes into the spec.

## What the review adds

Each of these defects passes a check and fails a question. The review's job is to ask the questions the checks don't: what unit does the caller pass, does the test check the requirement or the output, who is allowed to see this, and what does the spec leave open. The checks are the floor. The review is the part that catches what the floor doesn't reach.

> **Aside: why passing checks create false confidence.**
> A green build feels like an answer, and it's tempting to treat it as the end of the review. The green build only answers the questions the checks ask. An author who sees green may stop thinking about the defects that were never on the list, and a reviewer who sees green may stop reading. The defect that gets through is usually the one nobody thought to check for, which is why the review should start from the spec and not from the pipeline's summary.

## Run it

The starter has three checks on a small fines function and an estimator. The first is a circular test, which compares the function with itself. It passes, although the function is wrong. The second is a spec test: ten days overdue, with a three-day grace period, owes 175 cents. The starter's function ignores the grace period, so this test fails. The third is a call at the wrong unit: the estimator takes grams, and the caller passes two kilograms as if it were two grams.

Press **Run** (or F5) and read the three lines. The circular test passes, which is the lesson. The spec test shows the failure that the circular test hides. The call site prints three cents, which is what the estimator returns for two grams.

The expected output is what the solution produces. In the solution, the fine function applies the grace period and the caller passes two thousand grams. Press **Check** on the starter to see the mismatches, then press **Run** on the solution.

Notice what the circular test can't do. It passes before and after the fix, so a green circular test tells you nothing about whether the function is right. The spec test is the one that changes, and it's the one that matters.

> **A note on the code.** The starter and solution were written by hand to show these defects. They aren't a record of what any assistant produced. The unit mismatch is shown with a plain number. In a real codebase, a type or a naming convention that carries the unit is the better fix, and the review should ask for it.

## Try it

Choose one check in your team's pipeline, or one tool you use, and write down what it can't see. Then name one defect in generated code that it would pass, using one of the four kinds above or one of your own. Save both in a file called `passes-and-wrong.txt` in your practice folder, with the question a human reviewer would ask to find the defect.

---
