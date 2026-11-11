# Where the Assistant Does Well

Not every refactoring is equally risky. Some are mechanical, and an assistant does them quickly and reliably when the scope is clear. Others depend on what the code means, and they need more care. This step covers the mechanical kinds, how to ask for them, and the one thing each kind tends to change by accident.

## Naming

Renaming a variable, a parameter, or a local method is one of the safest changes, when it stays inside one scope. An assistant is good at finding every use in a file and changing it consistently.

The risk is scope. A method name is used by other files, a public property is read by a serializer, and a parameter name may be part of a documented interface. Ask for renames inside a named scope, and list the names that must not change.

> Narrow: Rename the local variable `tmp` to `runningTotal` in `Sum` only. Don't change any other method or any public name.

## Structure

Extracting a helper method, splitting a long method, or replacing a nested condition with early returns are structural changes. They can be safe, and they're where an assistant most often changes a boundary or an order without meaning to.

Ask for one structural change at a time, and state the output you expect to stay the same.

> Narrow: Extract the discount calculation in `FormatPrice` into a helper called `ApplyMemberDiscount`. The helper takes the cents and returns the discounted cents. Keep the rounding exactly as it is.

## Duplication

Two blocks of code that do the same thing can often share a helper. An assistant is good at finding the repeated part, and it's also good at finding parts that look repeated and aren't. Two blocks that differ in one rounding rule or one boundary aren't duplicates, and merging them changes behavior.

Ask the assistant to list the duplicates it found before it changes anything, and to say which parts differ. Then choose which ones to merge.

> Narrow: List the repeated code in these two methods, and say which lines differ. Don't change any code yet.

## What each kind tends to change by accident

Each kind has a typical side effect, and it's worth knowing before you review the output.

- **Naming:** a changed name in a string, a log message, or a serialized field.
- **Structure:** a boundary that moved from strictly greater to greater-or-equal, or an early return that skipped a cleanup step.
- **Duplication:** a shared helper that merged two rounding rules, so one of them now behaves like the other.

The checks in the next two steps look for these side effects directly.

> **Aside: why the structural changes are the risky ones.**
> A rename changes the name of a thing, and the thing stays the same. A structural change changes the path the code takes, and the path decides the result. Boundaries, early returns, and the order of operations all sit in the path. That's why a structural refactor deserves a case for each side of every branch it touches.

## Try it

Pick one function you know well. Write three narrow requests for it: one rename, one extraction, and one duplicate check that asks only for a list. For each, write the output you expect to stay the same, and the side effect you'd check for. Save the requests in a file called `narrow-refactors.txt` in your practice folder.

---
