# Why Broad Refactoring Prompts Go Wrong

"Clean this up" is one of the most common requests made of an assistant, and one of the most risky. It asks for a change in structure, but it doesn't say which structure, or what must stay the same. The assistant fills in the gaps with its own taste, and its taste includes changes nobody asked for.

This step explains why broad requests fail, and what a narrow request looks like.

## What a broad request invites

A request with no scope lets the assistant change anything it can improve. In practice that means:

- **Renamed things that other code depends on.** A cleaner name in one file breaks a caller in another file the assistant never saw.
- **Reordered operations.** Two lines swapped for readability can change a result when one of them has a side effect.
- **Simplified conditions.** A condition rewritten to look tidier can change the boundary, as the next steps show.
- **Changed rounding, types, or defaults.** A "cleaner" calculation often uses different arithmetic, and the difference only appears at the edges.
- **Added features.** A new parameter, a new log line, or a new validation is a behavior change, even when it looks like a small improvement.

None of these is visible in a short read, because the new code looks more professional than the old. That's the same trap Chapter 3 described for tidy output.

## Compare two requests

Here is a broad request and a narrow one for the same task.

> **Broad:**
> Clean up this pricing code. Make it more readable and modern.
>
> **Narrow:**
> Rename the variable `amt` to `discountedCents` in the `FormatPrice` method only. Don't change any logic, any return value, any rounding, or any other method. Return only the changed method.

The narrow request names the scope (one method), the change (one rename), and the must-not-change list (logic, return values, rounding, other methods). The output can be checked against that list. The broad request has no list, so nothing in the output can be checked against anything except taste.

## The must-not-change list

Every refactoring request should end with a list of what must stay the same. The list is the contract, and it's what the checks in the later steps test.

A useful list names the things a change could affect:

- **Outputs.** The return values for valid inputs, including the edges.
- **Errors.** The exceptions or error values for invalid inputs, and their messages if callers read them.
- **Order.** The order of side effects, such as writes, logs, and calls to other services.
- **Public names.** Method and parameter names that other code uses.
- **Rounding and types.** The arithmetic and the types that carry the values.

> **A note on the list.** Writing the list is the cheapest part of a refactoring, and it's the part most often skipped. A list that's skipped is a list that gets broken without anyone noticing.

## Why it matters with an assistant

An assistant doesn't know which of its changes are cosmetic and which are not. It treats a rename, a reorder, and a rewritten condition as similar kinds of tidying. The reviewer has to know the difference, and the list is how the reviewer knows what to check.

> **Aside: why the assistant doesn't know what matters.**
> A rename is safe in a file you can see, and dangerous in a project you can't. A reordered line is safe when the lines are pure, and dangerous when one of them writes a record. The assistant sees the text, not the calls elsewhere in the program, and it has no way to know which lines have effects. A human reviewer knows the program's effects better, if they make the list before the change.

## Try it

Take a function you've written, or one from earlier in the course. Write a broad refactoring request for it, and then rewrite it as a narrow request with a scope and a must-not-change list. Save both in a file called `refactor-requests.txt` in your practice folder, and write one sentence on which item in your list you'd most likely have missed without writing the list down.

---
