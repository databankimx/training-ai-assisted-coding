## Summary: Refactoring with AI Assistance

A refactoring is only a refactoring if the behavior stays the same. A broad request invites changes nobody asked for, so a refactoring request needs a scope and a must-not-change list. Renaming, extracting, and removing duplication are the changes an assistant handles well, and each one has a typical side effect. The way to check any of them is to run the original and the new code on the same cases, including the boundaries, and to do it after every change.

These are the ideas to carry forward:

* **Scope the request, and list what must not change.** The list is the contract the review checks.
* **Name the side effect for each kind of change.** Renames change strings and serialized names. Structural changes move boundaries and orders. Merged duplicates can merge different rules.
* **Compare on cases you chose.** A case that can't break the change proves nothing about it.
* **Put boundaries in every comparison.** Most dangerous refactoring changes are changes to a comparison operator.
* **Stop at the first failing checkpoint.** It names the change that caused the problem.

### Check your understanding

*These questions are written for this course.*

```quiz
A refactoring request says only "make this code cleaner." Which result is the most likely?
○ A cleaner version that keeps every behavior, because the assistant understands what clean means.
→ Not quite. Without a scope or a must-not-change list, the assistant decides what to change, and its choices may alter behavior.
◉ A cleaner version that may rename things, reorder lines, or simplify conditions in ways that change results.
→ Right. A broad request gives no limits, so the changes it produces are the assistant's choices, and some of them can alter behavior.
○ No change at all, because the assistant won't change code without a precise instruction.
→ Not quite. Assistants will change code for a broad request, and that is the risk.
```

```quiz
Two checkpoints in a refactoring pass, and the third changes a comparison from greater-than to greater-than-or-equal. Which case most directly reveals the change?
○ A typical value, such as 2000 grams, because typical values show the common behavior.
→ Not quite. A typical value sits far from the threshold, so it can't tell greater-than from greater-than-or-equal.
◉ A value exactly on the threshold, such as 5000 grams, because that is where the two comparisons disagree.
→ Right. A boundary case is the one that distinguishes the operators, which is why the boundary cases matter.
○ A very large value, such as 100000 grams, because large values stress the function the most.
→ Not quite. Large values fall well above the threshold, where both operators agree.
```

```quiz
A refactoring changes a discount's rounding, and the regular-customer cases all pass. What is the best next step?
○ Accept the change, because all the cases passed.
→ Not quite. If the cases never reach the discount, passing them proves nothing about the discount.
○ Remove the member cases, since the regular cases already pass.
→ Not quite. The member cases are the ones that test the change, and removing them hides the problem.
◉ Add member cases, including one whose base isn't a multiple of ten, and compare again.
→ Right. The change only shows where the discount applies, and a base that leaves a remainder is where the rounding differs.
```

---
