## Summary: First Interaction

Chapter 1 gave you four habits that the rest of the course builds on. Write the signature and the rule before you ask for the body. Read every suggestion before you accept it, and trace one example by hand. Write your expectations before you look at the code. When a suggestion is wrong, name the fault, or write the fix yourself.

These are the ideas to carry forward:

* **The signature and the comment are the specification.** A clear name and a clear rule give the assistant the most to work with.
* **Tab means you accept it.** The check has to happen before you press Tab, not after.
* **Expectations come first.** Write what the function should return before you look at what it does.
* **Refine with a specific request, or write it yourself.** Ask for one named change, and stop after three rounds that don't converge.

### Check your understanding

*These questions are written for this course.*

```quiz
You accept an assistant's suggestion because it looks well written. Later, a test fails. What went wrong?
○ The assistant wrote code that was too clean to check.
→ Not quite. Clean code can still be wrong, and tidy formatting is not evidence of correctness.
◉ The suggestion was accepted before it was checked against expectations, so nothing tested it.
→ Right. Pressing Tab means you accept the suggestion, so the check has to come before it.
○ The assistant should have known the test was coming.
→ Not quite. The assistant only sees the code and comments around your cursor, not your tests.
```

```quiz
A suggestion for a function gets every example right except one. What is the best next step?
◉ Name the one fault in a specific request, and check the new version against the same examples.
→ Right. A narrow request with a clear expectation is quick to check, and it keeps the rest of the function stable.
○ Accept it, because almost every example passes.
→ Not quite. A failing example is a finding, and it should be resolved before you rely on the function.
○ Ask again with the same wording, in case the next answer is different.
→ Not quite. The same request tends to produce the same kind of answer, so change the request, or write the fix yourself.
```

```quiz
Why do you write the expected results before you ask the assistant for the function?
○ Because writing examples is faster than reading code.
→ Not quite. Writing examples takes time, and the reason for doing it is different.
○ So the assistant has more examples to learn from.
→ Not quite. The assistant doesn't learn from your examples in this session, and they're there for you to check against.
◉ So your expectations come from the rule, not from whatever the suggestion happens to return.
→ Right. An expectation you write after seeing the output is only a record of the output, not a test of it.
```

---
