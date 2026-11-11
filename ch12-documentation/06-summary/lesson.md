## Summary: Documentation

Generated documentation is a draft written from the code the assistant could see, and it can describe a defect as if it were the design. A documentation prompt has to name the reader, the source of the facts, the claims to cover, and the form. Each sentence in a document is a claim, and a claim can be checked by running the code. Documentation drifts when the code changes, so the examples in it should be checked as often as the code.

These are the ideas to carry forward:

* **The assistant describes the code, not the intent.** The spec, tests, callers, and known defects are the sources a prompt must supply.
* **Ask for specific claims, with a reader and a source.** A vague request produces sentences nobody can check.
* **Turn each sentence into a check.** A claim with an input and an expected behavior is either supported or it isn't.
* **Decide which side is wrong before you edit.** The spec decides whether the code or the documentation changes.
* **Check the examples as the code changes.** Drift is easiest to miss in the examples, and they're the cheapest part to check.

### Check your understanding

*These questions are written for this course.*

```quiz
A generated sentence says a function returns zero for negative input. The function actually throws an error. What is the most accurate description of the sentence?
○ Correct, because returning zero for negative input is a common convention.
→ Not quite. A convention is a guess about this function, and the function's behavior is the evidence.
◉ Unsupported, because the code contradicts it, and the sentence has to be corrected to describe the throw.
→ Right. A sentence the code contradicts is a defect in the documentation, and the correction describes the actual behavior.
○ Unverifiable, because documentation can't be checked against code.
→ Not quite. A sentence about behavior can be checked by running the code with that input.
```

```quiz
A documentation request says only "document this method." Which change would most improve the result?
◉ Name the reader, the source of the facts, the claims to cover, and the form the team uses.
→ Right. The four parts make every sentence specific enough to check against the spec and behavior.
○ Ask for a longer document, so the assistant covers more of the method.
→ Not quite. Length adds sentences that a reviewer must check, and it doesn't make any of them checkable.
○ Paste the method's code and nothing else, so the assistant has the most accurate source.
→ Not quite. The code shows what the method does, not what it is meant to do, so the spec and tests are needed too.
```

```quiz
A code change makes a documented example untrue, and nobody updates the document. What is the most useful practice to prevent this?
○ Rely on the reviewer of the code change to remember the documentation.
→ Not quite. Memory is what failed, and the document wasn't part of the review.
○ Delete the example, so there is nothing to become untrue.
→ Not quite. The example is often the most useful part of the document, and deleting it removes information a reader needs.
◉ Keep each documented example as a claim that runs in the test suite, so the change fails a check when the example becomes untrue.
→ Right. A claim that runs is checked on every change, and the example is updated in the same review as the code.
```

---
