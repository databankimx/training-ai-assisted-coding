# Cheat Sheet: Context Documents

*From Chapter 6. Use when the assistant will work on a project more than once.*

## The seven sections

1. **Purpose.** What the module is for, and what it isn't for.
2. **Key types.** Each type, its unit, and any rule about it.
3. **Entry points.** Names, return values, and errors. The list of what the assistant may call.
4. **Conventions.** Rules applied everywhere, such as money in integer cents.
5. **Patterns to follow.** Where the code already shows the pattern.
6. **What to avoid.** Each shortcut with its reason.
7. **Examples.** Input and output pairs, checked against the real code.

## Before you give it to the assistant

- Give it at the start of the session, before the request.
- Check that every example matches the current code.
- Check the date on the document, and the last time someone read it.

## When the code changes

- Tie the document to the code in the same review.
- Turn each example into a test, so a change fails the test.
- If the decision is the code's, update the document. If the code is wrong, fix the code.

## Common mistake

Examples that were true once. An assistant follows a stale example with full confidence.
