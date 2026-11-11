# Prompting for Documentation

"Document this" is the most common documentation request, and it's the one that produces the least useful result. It doesn't name a reader, a source, or a set of claims. The assistant fills the gaps with a generic document that describes the code in general terms, and the document has nothing a reviewer can check.

A good documentation prompt does the same job as a good specification prompt from Chapter 5. It names what the document is for, where its facts come from, and what it must cover.

## Compare the two requests

> **Vague:**
> Document this method.
>
> **Specific:**
> Write the XML documentation comment for `FineCents`. The reader is a developer who will call it from a billing service and has not read its code. The facts come from the spec below, not from the code. Cover: the return unit, the free period, the per-day rate, the cap, and the error for negative days. Each sentence must be a statement a test could check. Don't describe how the method works internally.

The specific request names the reader, the source of the facts, the claims to cover, and the form each claim must take. The output can be checked against that list, which is what makes the document reviewable.

## The four parts of a documentation prompt

Every documentation prompt should say these four things.

**The reader.** Who will read the document, what they already know, and what they need to do after reading it. A caller needs the contract. A maintainer needs the reasons. A reviewer needs the claims they can check.

**The source.** Where the facts come from: the spec, the tests, a decision record, or a known list of behaviors. The code is the subject of the document, not the source of its facts, unless the code is the only source and the author has said so.

**The claims.** The list of things the document must state. A short list is better than "everything important," because it sets a scope the reviewer can check against.

**The form.** The format the team uses, such as the XML comment for C#, the docstring for Python, and the JSDoc comment for JavaScript. Chapter 5 showed the same point for prompts: name the form, or the assistant will choose one.

> **A note on length.** A documentation prompt can be short. The four parts take a few sentences, and the result is a document of a few lines. A long prompt doesn't make the document better. It makes the document longer, and a long document has more sentences a reviewer must check.

## Ask for the reasons, too

Documentation that only says what happens is half a document. A reader also needs the reason a rule exists, especially when the rule looks strange. "Charges nothing for the first three days" is a fact. "Charges nothing for the first three days, because the library allows a short grace period before a fine applies" is a fact with a reason, and the reason is what lets a future maintainer judge whether the rule still applies.

Ask the assistant for the reason only when the source gives one. A reason the assistant invents is worse than no reason, because it reads as a decision.

> **Aside: why a vague request invites a generic document.**
> Documentation is a common kind of text, and the common version of it is generic: "This method calculates the fine for an item." A generic sentence is safe, because it's true of almost any method, and that's exactly why it's useless to a reader. A specific request asks for the claims that only this method makes, and those are the ones a reviewer can check.

## Try it

Write a vague documentation request and a specific one for a function you know. Give the specific one the four parts. Save both in a file called `doc-prompts.txt` in your practice folder. Then count how many sentences the vague request would produce that a reviewer could check, and how many the specific one would produce.

---
