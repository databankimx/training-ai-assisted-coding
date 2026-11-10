# Anatomy of a Context Document

A context document is a markdown file that sits beside the code it describes. It's short, usually one to three pages, and it's written for the assistant, though it's useful to people too. Its job is to supply the facts the assistant can't see, in the order the assistant needs them.

A good document has seven sections. Not every module needs all seven, and a small module may need only four. The sections below show what each one contains, what it prevents, and what a vague version looks like.

## 1. Purpose

One or two sentences saying what the module is for, and what it isn't for. The purpose is the first thing the assistant reads, and it shapes every later choice.

> Good: The shipping estimator calculates the shipping cost for an order from its weight and destination zone. It doesn't handle taxes, discounts, or delivery dates.
>
> Vague: This module handles shipping.

The vague version gives the assistant permission to add tax calculations, because "handles shipping" sounds like it might include them.

## 2. Key types

The types the module works with, with one line on what each one means and any rule that applies to it.

> Good:
> - `Zone`: a destination region. A value outside the enum is invalid, and the module doesn't guess a default.
> - `Order`: holds the weight in grams. Weight is always grams, never kilograms.
>
> Vague:
> - `Zone`: the zone.
> - `Order`: an order.

The good version prevents the assistant from converting weights to kilograms, or from inventing a default zone when it finds an unknown value.

## 3. Entry points

The public methods a caller uses, and what each one returns and throws. This is the section the assistant relies on most, because it's the list of things it's allowed to call.

> Good:
> - `EstimateCents(weightGrams, zone)`: returns the cost in cents. Throws for negative weight.
>
> Vague:
> - The estimator has a method for calculating costs.

The good version gives the exact name, the return unit, and the error. The vague version forces the assistant to guess the name, and that's the moment a plausible invented method appears, as Chapter 3 showed.

## 4. Conventions

The rules your team applies everywhere, which the code alone doesn't make clear. Money in whole cents, never floating-point. Errors as exceptions, never as sentinel values. Names that follow a pattern.

> Good: Money is an integer number of cents, never a floating-point number. Rounding, where needed, is half-up to the nearest cent.
>
> Vague: Be careful with money.

The good version prevents the most common financial mistake an assistant makes, and it states the rounding rule, which the assistant would otherwise choose from its own habits.

## 5. Patterns to follow

A short list of patterns this module already uses, so the assistant copies them instead of inventing new ones. Name the file or method that shows the pattern, if it helps.

> Good: The rate table is loaded once, at startup, through `RateTable.Load`. New lookups use the loaded table. See `RateTable` for the example.
>
> Vague: We use good patterns.

## 6. What to avoid

The shortcuts and mistakes that are tempting in this module, with the reason for each. This section is the one that prevents the most expensive errors, because it names the places the assistant is most likely to go wrong.

> Good:
> - Don't make network calls. The rate table is local, and the estimator must stay fast and offline.
> - Don't use floating-point arithmetic for cents.
> - Don't add a default zone. An unknown zone is an error, because a silent default has cost a customer money before.
>
> Vague:
> - Don't do anything risky.

The good version gives the reason, and the reason lets the assistant apply the rule to cases the list doesn't mention.

## 7. Examples

A few input and output pairs, written as the module's contract. Examples are the most useful section for the assistant, because they're concrete. They also serve as acceptance examples later, which Chapter 7 covers.

> Good:
> - A 500-gram order to zone `Domestic` costs 650 cents.
> - An order of 0 grams to any zone costs 0 cents.
> - A negative weight throws an error.
>
> Vague:
> - It works for normal orders.

## A longer example: a standards file

Some context documents aren't about one module. They describe the rules for a whole codebase, or for every project a team builds. A coding standards file is an example, and it works the same way as the shipping document, at a larger scope. Teams write these for AI agents, and the structure is worth copying.

A good standards file has four parts, in this order.

1. **An opening line that sets how the rules are read.** For example: "The following describes the coding standards you must follow. Treat them as hard requirements, not suggestions." The framing matters. Without it, the assistant treats a rule as a preference to weigh against the request, and a request that pulls the other way may win.
2. **Non-negotiable rules.** These are the rules that make a build fail when they're broken. They're stated plainly, with the forbidden form and the required form side by side.
3. **Required conventions.** These produce warnings rather than failures. They're still expected, unless there's a recorded reason to depart from them.
4. **The definition of done.** What has to be true before the work counts as finished, such as a review by a named kind of person, and the checks that must pass.

Here are rules of the kind a standards file contains, written for three languages. The team in this example is invented, so every rule is one you can keep in a course.

~~~examples
```csharp
// Never: throw new Exception("..."). Use a specific exception type from the approved list.
// Never: block on asynchronous work with .Result or .Wait().
// Never: put a password or connection string in source code. Load it from configuration.
```
```python
# Never: raise Exception("..."). Use a specific exception class from the approved list.
# Never: call asyncio.run() from code that is already running inside an event loop.
# Never: put a password or connection string in source code. Load it from configuration.
```
```javascript
// Never: throw a bare Error. Use a specific error class from the approved list.
// Never: store an API key in source code. Load it from configuration.
```
~~~

Here is the same kind of file, as an excerpt. Every rule in it is invented.

```markdown
## Non-negotiable rules (the build fails)

### Exceptions
- Never throw a base exception type. Use a specific type from the approved list.

### Secrets
- Never hard-code credentials. Load them from configuration.

## Required conventions (warnings in CI)

### Logging
- Don't write to the console from library code. Use the team's logging package.

## Definition of done
- Reviewed by a senior developer.
- Every automated check passing.
```

Two things in this excerpt do more work than their length suggests. The tier words tell the assistant how hard to take each rule, so a rule under "the build fails" isn't weighed against a rule under "warnings." The definition of done tells the assistant what finished means, so it can anticipate a review rather than assume the code is final.

A real standards file will name your team's own packages, tools, and contacts. Those details belong in an internal file that isn't published. The structure can be shared, and the course uses an invented team so its examples can be public.

DataBank employees can request the development team's coding standards file, and other context files for their projects, from the development team. Ask through the usual channel for development requests. Don't copy a context file from another project without checking that its rules apply to yours.

## Putting it together

Here is a complete context document for the shipping estimator, in markdown. It uses all seven sections, and it's short enough to paste into a session without crowding the conversation.

```markdown
# Context: Shipping Estimator

## Purpose
Calculates the shipping cost for an order from its weight and destination zone.
It doesn't handle taxes, discounts, or delivery dates.

## Key types
- `Zone`: a destination region. An unknown value is an error. Don't add a default.
- `Order`: holds weight in grams. Weight is always grams, never kilograms.

## Entry points
- `EstimateCents(weightGrams, zone)`: returns the cost in cents. Throws for negative weight.

## Conventions
- Money is an integer number of cents, never floating-point.
- Rounding, where needed, is half-up to the nearest cent.
- Errors are exceptions, never sentinel values.

## Patterns to follow
- The rate table is loaded once at startup through `RateTable.Load`.

## What to avoid
- No network calls. The estimator must stay fast and offline.
- No floating-point arithmetic for cents.
- No default zone. A silent default has cost a customer money before.

## Examples
- A 500-gram order to zone `Domestic` costs 650 cents.
- An order of 0 grams to any zone costs 0 cents.
- A negative weight throws an error.
```

Read it once more, and notice what the assistant now knows that it didn't know before: the unit of weight, the rounding rule, the offline requirement, and the reason there is no default zone. Each of those is a place where a plausible guess would have been wrong.

> **Aside: why examples work so well.**
> A model learns from examples more readily than from rules. A rule like "round half-up" can be applied in many ways. A worked example, such as "a 500-gram order costs 650 cents," pins down the answer for one case, and the assistant tends to match its code to the examples it's given. That's why the examples section is the one most worth keeping up to date.

## Try it

Choose a module you know well, or invent one. Write a context document with all seven sections, and keep it under a page. For each section, write one sentence on the mistake it prevents. Save the document in a file called `context.md` in your practice folder.

---
