## Summary: Introduction

Chapter 0 covered the ideas the rest of the course depends on. An assistant predicts text, so it can sound certain when it's wrong. You own every line you submit, and no tool takes that responsibility away. The company policy starts from one assumption: all data is CONFIDENTIAL until proven otherwise.

These are the ideas to carry forward:

* **An assistant predicts text.** It doesn't check facts, read your project, or know your library version unless you tell it.
* **Confidence is a writing style.** A wrong answer and a right answer often sound equally sure.
* **Ownership stays with you.** If your name is on the change, you're responsible for understanding it.
* **Setup is the first check.** Copilot is built into current editors, but you still confirm it is present, signed in, and working.
* **Company work uses company accounts.** The free tier is for learning on sample code.
* **Keep the structure, remove the specifics.** A safe prompt keeps the problem and drops the names, servers, and credentials.

### Check your understanding

*These questions are written for this course.*

```quiz
A colleague says, "The assistant wrote this function, so it must be fine." Which response fits the ownership rule?
○ That's a good point, since the assistant is probably more careful than most people.
→ Not quite. The assistant's output is a prediction, and it isn't checked by the assistant itself.
○ Nobody can be expected to understand code an assistant wrote, so it should go in without review.
→ Not quite. That's the opposite of the rule. Review applies to every change.
◉ The name on the change is what matters, so the author needs to be able to explain the function and its behavior.
→ Right. Responsibility stays with the person who submits the code, whatever produced the first draft.
```

```quiz
Your team's AI tool is working, but you find an answer that seems unusually confident about a library function you have never used. What is the best next step?
◉ Check the function against the library's documentation before you rely on it.
→ Right. An assistant can't check its own answer against your project or your library version.
○ Accept it, because confident answers are usually right.
→ Not quite. Confidence is a feature of the writing, not a measure of accuracy.
○ Ask the same question again until the answer changes.
→ Not quite. Asking again produces another prediction, which may be equally wrong.
```

```quiz
You want to ask an approved tool for help with a failing import. Which version of the question follows the policy?
○ "Customer Acme Corp's import fails on server PRD-DB-07 with the production password. Why?"
→ Not quite. This includes a customer, a server name, and a credential, none of which should leave the company.
◉ "A customer record with a long company name fails to import on a shared database server. What are the common causes?"
→ Right. It keeps the problem and removes the identifying details.
○ "Our import fails. Here is the full log file, including the connection string, so you can see everything."
→ Not quite. A connection string is a credential, and a full log file may contain customer data.
```

---
