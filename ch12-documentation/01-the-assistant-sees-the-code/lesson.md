# The Assistant Sees the Code, Not Your Intent

When an assistant documents a function, it reads the function. It sees the parameters, the operations, the return values, and the names. From those it writes sentences that describe what the code does. That's useful, and it's also the source of the most common documentation error: the document describes the code's behavior, which may be a defect, and it describes it as if that behavior were the design.

The assistant has no way to know your intent. It doesn't know that the grace period should be three days, that the cap is a policy, or that a negative input is supposed to be an error. It can only describe what it reads.

## Three kinds of sentence

Generated documentation contains three kinds of sentence, and each one has a different risk.

**Sentences the code supports.** "Returns the fine in cents." The code does return cents, so the sentence is true, and it's also almost useless. The reader learns nothing that the signature didn't already say.

**Sentences the code contradicts.** "Returns zero for negative days." If the code throws for negative days, this sentence is false, and a reader who trusts it will write a caller that expects zero. The assistant may have guessed from a convention in other code.

**Sentences the code can't support, because the behavior is a defect.** "Charges 25 cents per day after the first three free days." If the code applies the grace period one day too long, the sentence describes the intent, not the behavior. The document is now wrong in the other direction, and the reader can't tell from it which one is right.

The second and third kinds are the dangerous ones, because they read as confident, specific, and correct.

## What the assistant can't see

The assistant can see the code in front of it. It can't see the spec, the decision that set the cap, the ticket that introduced the grace period, or the behavior that customers depend on. A documentation prompt has to supply those, or the document will describe only what the code happens to do.

Here is the list of sources a documentation prompt should include.

- **The spec,** for the intended behavior and the rules.
- **The tests,** for the behavior the team has agreed to check.
- **The callers,** for how the function is actually used, which is often different from how its author imagined.
- **The known defects,** for behavior that is wrong and must not be documented as intended.

> **Aside: why documentation is a claim.**
> A sentence in a document makes a claim about the code, and the claim can be tested by running the code. "Returns zero for negative days" can be checked by calling the function with a negative value. This is the same idea as the spec's acceptance examples in Chapter 7. Documentation written as claims is documentation that can be verified, and the next steps show how.

## Try it

Choose a function you know, and read its documentation, or write a sentence describing it. Sort each sentence into one of the three kinds above. For each sentence the code contradicts or can't support, write what the source of truth (spec, tests, callers, or known defect) would say instead. Save the sorted sentences in a file called `doc-sentences.txt` in your practice folder.

---
