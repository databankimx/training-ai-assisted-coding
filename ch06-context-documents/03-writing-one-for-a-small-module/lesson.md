# Writing One for a Small Module

The last step described what a context document contains. This step is about writing one, from start to finish, and about the test that tells you whether it's good enough: giving it to the assistant, asking for a small change, and seeing what goes wrong.

Use the shipping estimator from the chapter introduction as your running example. The steps below show how the document was built, and what changed when it was tested.

## Start from facts, not memory

Don't write a context document from what you remember about the module. Write it from the sources that are already true: the code, the tests, the ticket that introduced the rule, and the person who made the decision. Each section should trace back to one of those.

The shipping estimator's free-shipping threshold, for example, comes from a decision recorded in a ticket, and not from the code, which only shows the number. The document should say where the number came from, because a future reader may need to know whether it can change.

> Source-backed: The free-shipping threshold is 5000 cents. The value comes from the pricing decision recorded in the ticket for the rate change, and it can change only through that process.
>
> From memory: The threshold is 5000 cents, I think.

The second version is the one that goes stale without anyone noticing.

## Draft each section, then test it

Write the sections in the order from the last step. After each one, ask whether you could hand the section alone to a new colleague and have them avoid a mistake. If not, the section needs another sentence.

Then test the whole document. Give it to the assistant with a request that the document should inform, such as adding a surcharge for oversized parcels, and read the result against the document. Every line the assistant gets wrong is a gap in the document.

## Three drafts of one section

Here is the conventions section through three drafts. Each draft was written after a test showed a gap.

> **Draft 1:**
> Use good conventions for money.
>
> **Draft 2, after the assistant used floating-point numbers:**
> Money is in cents. Use integers.
>
> **Draft 3, after the assistant rounded down in one case and up in another:**
> Money is an integer number of cents, never floating-point. Rounding, where needed, is half-up to the nearest cent. The rounding rule applies to the surcharge as well as to the base rate.

Each draft is shorter than the next version would be, and each one is more specific than the last. The test showed which parts were missing, and each revision added only what the test required.

## What the assistant does without the document

Here is the same request, made twice: once without the context document, and once with it. The request is to add a method that returns the cost of an order, including a fifteen percent surcharge for parcels over ten kilograms. The examples are in three languages, and the first version in each is what the assistant produced without context.

~~~examples
```csharp
// Without context: floating-point money, and kilograms.
public static double EstimateDollars(double weightKg, Zone zone)
{
    double cost = weightKg * 2.5;
    if (weightKg > 10) cost *= 1.15;
    return Math.Round(cost, 2);
}
```
```python
# Without context: floating-point money, and kilograms.
def estimate_dollars(weight_kg: float, zone: Zone) -> float:
    cost = weight_kg * 2.5
    if weight_kg > 10:
        cost *= 1.15
    return round(cost, 2)
```
```javascript
// Without context: floating-point money, and kilograms.
export function estimateDollars(weightKg, zone) {
  let cost = weightKg * 2.5;
  if (weightKg > 10) cost *= 1.15;
  return Math.round(cost * 100) / 100;
}
```
~~~

The three versions share the same mistakes. Weight is in kilograms, when the module uses grams. Money is a floating-point value, when the module uses integer cents. The surcharge threshold is applied to the wrong unit. None of these is visible to someone who doesn't know the module's rules, and each one passes a casual look.

Now the same request, with the document from the last step in the session.

~~~examples
```csharp
// With context: integer cents, grams, and the surcharge threshold in grams.
public static int EstimateCents(int weightGrams, Zone zone)
{
    if (weightGrams < 0) throw new ArgumentOutOfRangeException(nameof(weightGrams));
    int baseCents = (int)Math.Round(weightGrams * 1.3m, MidpointRounding.AwayFromZero);
    if (weightGrams > 10_000) baseCents = (int)Math.Round(baseCents * 1.15m, MidpointRounding.AwayFromZero);
    return baseCents;
}
```
```python
# With context: integer cents, grams, and half-up rounding.
from decimal import Decimal, ROUND_HALF_UP

def estimate_cents(weight_grams: int, zone: Zone) -> int:
    if weight_grams < 0:
        raise ValueError("weight_grams must not be negative")
    base = Decimal(weight_grams) * Decimal("1.3")
    if weight_grams > 10_000:
        base *= Decimal("1.15")
    return int(base.quantize(Decimal("1"), rounding=ROUND_HALF_UP))
```
```javascript
// With context: integer cents, grams, and half-up rounding.
export function estimateCents(weightGrams, zone) {
  if (weightGrams < 0) throw new RangeError("weightGrams must not be negative");
  let cents = weightGrams * 1.3;
  if (weightGrams > 10000) cents *= 1.15;
  return Math.floor(cents + 0.5);
}
```
~~~

The context version has the right unit, the right type, the threshold in grams, and the rounding rule. It also keeps the negative-weight error from the module's contract. Two details to check. The JavaScript version uses floating-point arithmetic internally, which the document forbids for money. Its `Math.floor(cents + 0.5)` gives half-up rounding for the values here, but the document's rule is about the result being exact, and a reviewer should check the arithmetic against the examples before accepting it. The Python version uses decimal arithmetic, which is what the document's convention would call for.

That's the point of this comparison. The document changed the unit, the type, and the rule, and it didn't remove the need to review the result. Chapter 8 covers that review in full.

> **Aside: the document isn't a guarantee.**
> A context document makes the right answer more likely, not certain. The JavaScript version above follows most of the rules and still leaves a question open. The document's job is to take the guesses out of the output. The reviewer's job is to check the output that remains.

## What a finished document looks like

Before you call a document finished, check it against this list. Each item is something a test in this step would catch.

- Every number has a unit, and the unit is stated in the section where the number appears.
- Every type that caused a mistake in a test has a line that prevents it.
- Every entry point has a return value and an error, not just a name.
- Every rule is paired with a reason, so a future reader can judge whether it still applies.
- Every example is one you have verified against the real module, not one you worked out in your head.

The last point matters most. An example that's wrong teaches the assistant the wrong answer, and it does so with the authority of the document.

## Run it

The starter for this step is the code the assistant produced without the document, in each language. It estimates a cost in dollars from a weight in kilograms, which is the unit and type mistake the document prevents. Press **Run** (or F5) and read the two lines.

The lines print `1.25 dollars` for half a kilogram and `34.5 dollars` for twelve kilograms. Compare them with the expected output, which is the version written with the document: `500 g: 650 cents`, and `12000 g: 17940 cents`. The expected output shows the unit, the integer cents, and the surcharge threshold in grams. A reviewer can see the difference in the first line without knowing the module.

Press **Check** on the starter, and see the mismatch. Then press **Run** on the solution, and compare its output with the expected output.

> **A note on the code.** The starter and solution were written by hand to show the difference a document makes. They aren't a record of what any assistant produced. A real session may get some of these things right without a document, and may get others wrong in ways this step doesn't show. Use this step to see what a document changes, not as a guide to what a particular tool does.

## Try it

Take the shipping estimator document from the chapter introduction, and add one new rule that the module doesn't yet have, such as a maximum weight of fifty kilograms. Write the rule with its reason, add one example, and then ask the assistant to add a method that uses the new rule. Compare the result with and without the new line in the document. Keep both documents, and both outputs, in a file called `shipping-context.txt` in your practice folder.

---
