## Summary: Choosing the Right Surface

A surface is the way you work with an assistant, and the choice depends on what the assistant can see, what it can change, and how you'll check the result. Completion and inline edit suit small changes you can see. Chat suits questions. Planning suits larger work that needs a reviewable design. Agentic work suits well-specified changes with clear checkpoints. Coding assistants change your code, which you then own, and AI platforms run inside your product, which makes the design a development project.

These are the ideas to carry forward:

* **Choose the surface before the prompt.** Five questions, answered honestly, point to a surface. Habit is the thing they replace.
* **What the assistant can see and change decides the risk.** More reach means more ways to be wrong, at scale.
* **Ask where the output goes.** Into your code, it's a coding assistant. Into a running product, it's a platform, and the development rules apply.
* **The data question can come first.** Sensitive data can rule out a surface before any other question is asked.
* **Planning is the reviewable step.** A plan is a hypothesis, and it should be checked like one.

### Check your understanding

*These questions are written for this course.*

```quiz
You need a small change to one method, and the test that covers it already exists. Which surface fits best?
○ Agentic work, so the assistant can run the test for you.
→ Not quite. Agentic work fits larger, well-specified changes with checkpoints. This change is small and visible, so the reach of an agent is more than it needs.
◉ Inline edit, because the change is small, visible, and quick to check with the test.
→ Right. The size of the change, what you can see, and the speed of the check all point to inline edit.
○ Planning, so the change is reviewed before it's made.
→ Not quite. Planning helps with larger work. A small change doesn't need a separate plan, and the test already gives the review.
```

```quiz
A team wants to send customer records to an AI service every time a user opens a screen in their product. Which statement is correct?
◉ This is an AI platform inside a product, so it is a development project that needs a quote, an approved design, review, and the required scans.
→ Right. The service runs at run time, so the data flow is part of the product, and the development rules apply.
○ This is a coding assistant, because the team is using an AI tool, so the usual assistant rules apply.
→ Not quite. The output goes into the product's behavior at run time, not into code that the team reviews and commits, so it isn't a coding assistant use.
○ This is a chat question, so the usual classification rules are enough.
→ Not quite. Customer data flowing through a product on every use needs an approved design, not only a classification.
```

```quiz
Before you open a tool for a task that might involve sensitive material, which question should you answer first?
○ How long the task will take.
→ Not quite. Time matters for planning, but it doesn't decide whether a surface may be used at all.
○ Which surface you use most often.
→ Not quite. Habit is what this chapter asks you to replace, so it shouldn't decide the choice.
◉ How sensitive the data and code are, because that may rule out a surface entirely.
→ Right. Sensitive material can rule out a surface before any other question matters, so it comes early in the sequence.
```

---
