# The Spec Template

A spec has six sections. Each one answers a question the assistant would otherwise answer for you, and each one gives the reviewer something specific to check. The template below is the one the course provides at this stage. Later in the course you'll write the structure yourself, which is the point of the progression.

## The six sections

1. **Purpose.** What the work is for, in two or three sentences.
2. **Inputs and outputs.** What goes in, what comes out, and the units and types of each.
3. **Errors.** What happens when the input is wrong, and what the caller receives.
4. **Constraints.** What must hold: the language and version, the dependencies allowed, the rules the code must follow.
5. **Out of scope.** What the work deliberately does not do.
6. **Acceptance examples.** Concrete input and output pairs that show the work is done. Step 3 covers these in full.

Here is the template, followed by one section at a time.

```markdown
# Spec: <name of the work>

## Purpose
<What the work is for, and what it is not for.>

## Inputs and outputs
- Input: <name, type, unit, valid range>
- Output: <name, type, unit, meaning>

## Errors
- <condition>: <what happens, and what the caller receives>

## Constraints
- Language and version: <...>
- Dependencies: <allowed packages, or "standard library only">
- Rules: <anything else that must hold>

## Out of scope
- <what this work deliberately does not do>

## Acceptance examples
| Input | Expected output |
|---|---|
| <...> | <...> |
```

## Each section, complete and vague

**Purpose.** A complete purpose says what the work is for, and what it is not for, so the assistant doesn't extend it.

> Complete: Calculates the fine for a late library item, with a three-day grace period. It doesn't handle payments, reminders, or due dates.
>
> Vague: Handles fines.

**Inputs and outputs.** A complete section gives each value a unit and a type. The unit matters most, because the most expensive mistakes in this course came from a unit nobody wrote down.

> Complete: Input: `daysOverdue`, an integer count of whole days past the due date, zero or more. Output: the fine in integer cents.
>
> Vague: Input: days. Output: the amount.

**Errors.** A complete section names each error condition and what the caller receives. Errors are the section most often left out, and the one that makes generated code most surprising.

> Complete: A negative `daysOverdue` throws an argument error that names the parameter. The method never returns a negative fine.
>
> Vague: Handle bad input.

**Constraints.** A complete section names the version, the allowed dependencies, and the rules, in terms a reviewer can check. Chapter 5 covered the form these take.

> Complete: C# for .NET 10. Standard library only. Integer cents, never floating-point.
>
> Vague: Use modern C# and good practices.

**Out of scope.** This section is short, and it prevents a common failure: the assistant helpfully adds something you didn't ask for. Stating what's out of scope is the cheapest way to stop it.

> Complete: Out of scope: taxes, discounts, payment processing, and sending reminders to borrowers.
>
> Vague: Nothing else.

**Acceptance examples.** A complete section gives concrete cases with exact expected outputs. Step 3 explains why these matter so much.

> Complete: a book three days overdue owes 0 cents; four days overdue owes 25 cents.
>
> Vague: Normal cases work.

## A complete spec

Here is a full spec for the grace-period feature, built from the six sections. It's short, and a reviewer can check every line of it.

```markdown
# Spec: Fines calculator with a grace period

## Purpose
Calculates the fine for a late library item, with a three-day grace period.
It doesn't handle payments, reminders, or due dates.

## Inputs and outputs
- Input: `daysOverdue`, an integer count of whole days past the due date, zero or more.
- Output: the fine in integer cents.

## Errors
- A negative `daysOverdue` throws an argument error that names the parameter.
- The method never returns a negative fine.

## Constraints
- C# for .NET 10.
- Standard library only.
- Money is integer cents, never floating-point.
- The first three days after the due date are free. The fine applies to the days after them, at 25 cents per day.
- The 2000-cent cap applies after the grace period is subtracted.

## Out of scope
- Taxes, discounts, payment processing, and reminders to borrowers.

## Acceptance examples
| Days overdue | Expected fine (cents) |
|---|---|
| 0 | 0 |
| 3 | 0 |
| 4 | 25 |
| 200 | 2000 |
| -1 | error: argument |
```

Notice the order of the grace period and the cap. The chat in the previous step took seven messages to settle it, and the spec states it in one sentence. That sentence is what the reviewer checks and what the assistant implements.

> **Aside: why the template has six sections, not two.**
> Every section answers a question the assistant would otherwise guess. Purpose stops it extending the work. Inputs and outputs stop it guessing units. Errors stop it choosing a silent fallback. Constraints stop it choosing a dependency. Out of scope stops it adding features. Acceptance examples stop it deciding what "correct" means. Remove any one, and some guess goes back to the assistant without anyone noticing.

## Try it

Write a spec for a single function of your own, using all six sections. Keep it under a page. Then read it as if you were a reviewer who had never seen the work, and write down the one section you'd have had to ask about. Save the spec in a file called `SPEC.md` in your practice folder.

---
