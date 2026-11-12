# Context Documents

The assistant doesn't know your codebase. It has never seen your team's modules, your internal helpers, or the reasons your code is shaped the way it is. Each time you open a new session, it starts again from the request in front of it, and it fills the gaps with the most common code it has seen.

Chapter 5 showed how a specification closes the gaps in a single request. This chapter covers the standing counterpart: a short markdown document that tells the assistant what it needs to know about a project, every time you work on it. The document is called a context document, and it's underused, partly because it's boring to write and partly because nobody tells you it exists.

## Why a whole chapter

A context document is the cheapest improvement you can make to the quality of generated code. It costs an hour, it's reused for weeks, and it prevents a class of mistakes that no single prompt can prevent, because those mistakes depend on facts about the project the prompt doesn't repeat.

It also has a failure mode that a prompt doesn't. A context document that's out of date misleads the assistant with confidence, and the assistant has no way to notice. This chapter covers both the benefit and the risk, and it treats the risk with the same seriousness as the benefit.

## A running example

Several steps use one invented module, so you can see the same document in different stages. It's a shipping estimator. It takes an order's weight and a destination zone, and it returns the shipping cost. It has a free-shipping threshold and a rate table, and it rejects negative weights. None of it is real. The module exists only so that the examples have something concrete to describe.

Here is the module's public entry point, in each course language, so you know what the document is describing.

~~~examples
```csharp
public static class ShippingEstimator
{
    // Returns the shipping cost in cents for an order of the given weight, in grams.
    // Throws ArgumentOutOfRangeException when weightGrams is negative.
    public static int EstimateCents(int weightGrams, Zone zone)
    {
        if (weightGrams < 0) throw new ArgumentOutOfRangeException(nameof(weightGrams));
        // The rest of the calculation is not shown here.
        throw new NotImplementedException();
    }
}
```
```python
def estimate_cents(weight_grams: int, zone: Zone) -> int:
    """Return the shipping cost in cents for an order of the given weight.

    Raises ValueError when weight_grams is negative.
    """
    if weight_grams < 0:
        raise ValueError("weight_grams must not be negative")
    # The rest of the calculation is not shown here.
    raise NotImplementedError
```
```javascript
/**
 * Returns the shipping cost in cents for an order of the given weight.
 * Throws a RangeError when weightGrams is negative.
 */
export function estimateCents(weightGrams, zone) {
  if (weightGrams < 0) throw new RangeError("weightGrams must not be negative");
  // The rest of the calculation is not shown here.
  throw new Error("not implemented");
}
```
~~~

The three versions do the same job, in the conventions of their languages. The context document you'll write in this chapter describes all three the same way, because it's about the module, not the language.

## What you'll do

1. **Why the assistant needs context.** What it can't see, and what that costs you.
2. **Anatomy of a context document.** The sections a good document has, and what each one prevents.
3. **Writing one for a small module.** A complete document, built from the shipping estimator, with the reasons for each choice.
4. **Using it.** Pasting, attaching, and how long a document's influence lasts.
5. **Keeping it current.** How a document goes stale, and how to catch it.

If Markdown is new to you, the standalone Markdown Basics tutorial covers the parts this chapter uses, in `../../training-markdown`. Work through it first if a heading or a table doesn't behave as you expect.

The homework is a context document for an unfamiliar module, used to generate a small feature, with a report on where the document helped and where it was missing. The summary has three quizzes.

---
