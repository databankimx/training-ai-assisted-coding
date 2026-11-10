## Summary: Context Documents

An assistant can't see your codebase, your conventions, or the reasons behind your code. A context document is a short markdown file that supplies those facts, and it's the cheapest way to improve the quality of generated code. It has seven sections: purpose, key types, entry points, conventions, patterns, what to avoid, and examples. A team-wide standards file uses the same idea at a larger scope, with an opening line, non-negotiable rules, conventions, and a definition of done.

These are the ideas to carry forward:

* **The gaps are predictable.** The assistant lacks memory across sessions, your internal code, your conventions, and your reasons. Each gap produces a typical mistake.
* **Write the document from sources, not memory.** Each section should trace to the code, a test, a ticket, or a decision.
* **Examples are the most useful section, and the most likely to go stale.** Check them against the real module.
* **Give the document early in the session.** A document placed after the request is read too late to change the answer.
* **A stale document misleads with confidence.** Tie it to the code in review, rerun its examples as tests, and date it.

### Check your understanding

*These questions are written for this course.*

```quiz
A context document says a method returns cents. A colleague changed it last month to return dollars. Which outcome is most likely if nobody updates the document?
◉ The assistant writes code that treats the return value as cents, and the mistake looks reasonable because it matches the document.
→ Right. A stale document produces confident output that matches its own wrong rules, which is why the drift is hard to see.
○ The assistant notices the mismatch and asks which unit is correct before it writes anything.
→ Not quite. The assistant works from the document it was given, and it doesn't check the document against the code.
○ The assistant ignores the document, because it can tell the document is out of date.
→ Not quite. The assistant has no way to test the document against the code, so it follows the document.
```

```quiz
You want an assistant to follow a context document for a feature request. Which placement is most likely to work?
○ Paste the document at the end of the message, after the request, so the request comes first.
→ Not quite. A document placed after the request is read as an addition to a frame that's already set, which weakens its effect.
○ Paste the document in a separate, earlier session, and expect the assistant to remember it.
→ Not quite. Each session starts without the document unless you give it again.
◉ Give the document at the start of the session, before the request that depends on it.
→ Right. The document sets the frame, and the request is read inside it.
```

```quiz
Which rule is most useful in an examples section of a context document?
○ Write the examples as general principles, so they cover many cases.
→ Not quite. A principle can be applied in many ways. A concrete example pins down one answer, which is what the assistant needs to match.
◉ Write each example as an input and an output you have checked against the real module.
→ Right. A verified example gives the assistant an exact target, and a wrong one teaches the wrong answer with the document's authority.
○ Leave the examples out, so the document stays short and the assistant decides the outputs.
→ Not quite. Examples are the most useful part of the document, and removing them gives the assistant the freedom to guess.
```

---
