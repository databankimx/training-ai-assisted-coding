## Summary: Reviewing Generated Code

A review turns a plausible result into a decision. Generated code looks finished, so the reviewer treats every line as a claim and asks what supports it. Read the public surface and the error paths first, write each concern as a testable claim, and check every call against the reference for your target version. Use a checklist that records a result and a reason for each item, and remember that green checks answer only the questions someone asked in advance.

These are the ideas to carry forward:

* **Read in order of damage.** The signatures, the data flow, and the error paths come before naming and style.
* **Write concerns as claims.** A claim names the condition, the behavior, and the rule it breaks, so the author can act on it.
* **Know the three kinds of bad call.** Invented, removed, and version-dependent calls are fixed in different ways.
* **Expect the common failure modes.** Broad catches, blocked async calls, ignored cancellation, hardcoded values, and needless complexity recur in generated code.
* **Record a reason for every checklist answer.** A pass or fail with no reason is a tick, not a review.
* **Ask the questions the checks don't ask.** Which unit does the caller pass? Does the test check the requirement? Who is allowed to see this? What does the spec leave open?

### Check your understanding

*These questions are written for this course.*

```quiz
A reviewer reads generated code and writes "error handling looks off." What is the most useful next step?
○ Ask the author to rewrite the error handling in a cleaner style.
→ Not quite. The author can't act on "looks off," and a rewrite may not fix the actual defect.
◉ Rewrite the concern as a claim: the condition, the behavior, and the rule it breaks, so the author knows exactly what to change.
→ Right. A testable claim names the defect, so it can be checked and fixed.
○ Approve the code, since the error handling is probably fine if the tests pass.
→ Not quite. Passing tests cover only the cases someone wrote down, and a vague concern is still a concern.
```

```quiz
A method compiles, passes its tests, and has no new warnings. Which defect could it still have?
○ None, because the compiler, the warnings, and the tests together prove the code is correct.
→ Not quite. Each check answers only the questions someone asked in advance, so a defect outside them passes.
○ A syntax error, because the compiler would have caught any other kind of defect.
→ Not quite. A compiler doesn't see the meaning of a rule, so a syntax error is the one defect it always catches.
◉ A wrong unit at a call site, because the compiler accepts the type and the method's own tests pass with the correct unit.
→ Right. The defect is in how a caller uses the method, which a review of the call site finds and the checks don't.
```

```quiz
A reviewer marks every item on a checklist as "pass," with no reasons. What does that record mainly show?
◉ That the checklist was completed without evidence, so it can't tell the author or a future reviewer what was checked.
→ Right. Each answer needs a reason, so a checklist records what the reviewer examined, not just that they finished.
○ That the code is clean, because every item passed.
→ Not quite. A pass with no reason shows a tick, not an examination of the code.
○ That the checklist is too strict, and the items should be removed.
→ Not quite. The items ask useful questions. The problem is answers that don't show any examination.
```

---
