## Summary: Writing Effective Prompts

A prompt is a specification. The six parts (language and version, signature, input and output contract, errors and edge cases, constraints, and style) decide what the assistant must do, and each missing part is a default the assistant chooses for you. Constraints rule out the defaults that don't fit your project. The follow-up cycle refines a prompt one part at a time, and a restart with one complete prompt beats a third correction stacked on the first two.

These are the ideas to carry forward:

* **Name the six parts before you send.** Most bad output traces back to a part you left out, and the error behavior is the one people leave out most.
* **Write constraints you can check.** "Use only the standard library" can be verified. "Keep it simple" can't.
* **Keep what works.** Every correction should say what must stay the same.
* **Restart when corrections stack up.** Two follow-ups that don't fix the problem are a signal to write one complete prompt and start again.
* **Name the independent source for tests and documentation.** The specification decides the expected values, not the code.

### Check your understanding

*These questions are written for this course.*

```quiz
Which prompt is most likely to produce a function that returns a sensible result for an empty list?
○ Write a function that returns the largest number in a list.
→ Not quite. This prompt doesn't say what an empty list should do, so the assistant chooses for you.
◉ Python 3.12. A function called `largest` that takes a list of integers and returns one integer. If the list is empty, raise `ValueError` with a message that says so.
→ Right. The language and version, the signature, and the error behavior are all stated, so none of them is left to a default.
○ Write the cleanest possible function for the largest number, using the best practices.
→ Not quite. "Cleanest" and "best practices" describe style. They don't say what the function must do for an empty list.
```

```quiz
A follow-up to a generated function reads "This is wrong, try again." What is the most useful change?
○ Ask the assistant to explain why its answer is wrong.
→ Not quite. An explanation may help, but it doesn't tell the assistant which part of the prompt to change or what must stay the same.
○ Send the same prompt again, in a new session, without changes.
→ Not quite. Nothing has changed, so the output will probably be the same kind of wrong.
◉ Name the failure and the fix, and say what must stay the same, such as the method name and the exception message.
→ Right. A precise correction with a keep-clause gives the assistant a target and a boundary.
```

```quiz
You're writing tests for a function that a colleague has already implemented. Which instruction most protects the tests from being circular?
◉ Each expected value comes from the specification, not from the function's code.
→ Right. The specification is an independent source, so a test that passes is evidence, not a copy of the output.
○ Write tests that cover every line of the function.
→ Not quite. Coverage tells you what ran, not whether the expected values are right.
○ Write the tests in the same file as the function, so they stay in sync.
→ Not quite. Location doesn't affect whether the expected values come from the specification.
```

---
