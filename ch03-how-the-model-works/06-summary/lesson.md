## Summary: How the Model Works

This chapter explained the mechanism behind the errors you'll meet most often. The assistant works in tokens, within a window that holds only so much at once. It writes the most likely next name, which is how invented methods appear. Its knowledge stops at a training cutoff, so it can suggest code for the wrong version. And tidy output tells you about style, not correctness.

These are the ideas to carry forward:

* **A long conversation can drop its early constraints.** Repeat the important ones in the newest message, or start a fresh session.
* **Invented methods look ordinary.** They're built from real pieces, so a plausible name is not evidence.
* **Check every call the language doesn't obviously have.** The language's own reference is the source, and the version you target is the question.
* **The training cutoff is a snapshot.** Write the target version into every request that depends on one.
* **Formatting is a clue about style.** Examples with expected results, and edge cases, are the evidence.

### Check your understanding

*These questions are written for this course.*

```quiz
Halfway through a long session, the assistant starts suggesting a package that you ruled out at the beginning. What is the most likely explanation?
○ The assistant decided the package was better after all, and changed its mind.
→ Not quite. The assistant doesn't weigh your decisions over time in that way.
◉ Your early constraint may have dropped out of the context window, so the assistant no longer has it to work from.
→ Right. A long conversation can push the start of the session out of the window, which is why the constraint should be repeated in the newest message.
○ The package is now the right choice, because some time has passed.
→ Not quite. Time passing doesn't change what your project allows.
```

```quiz
An assistant suggests `fields.countNonEmpty()` for a Python list. Which check would catch it fastest?
◉ Look up the list methods in the language's documentation, or run `help(list)`, and confirm the method is there.
→ Right. The language's own reference shows what exists, and it doesn't depend on the assistant's guess.
○ Run the code and see whether it works.
→ Not quite. Running it will fail, but that tells you less than a check you can do before running anything.
○ Ask the assistant whether the method exists.
→ Not quite. The assistant will probably say yes, because it produced the name. A reference is the source to check.
```

```quiz
You write a function with a comment that says it returns the largest value in a list, and a teammate says it looks good. What evidence would actually show it works?
○ The teammate's approval, because a review by a person is always enough.
→ Not quite. A review helps, but the review needs something to check against, such as examples and their expected results.
○ The function's clean names and consistent indentation.
→ Not quite. Those show style, and style is not evidence of correctness.
◉ Examples with expected results, including edge cases such as an empty list and all negative numbers, which the function passes when run.
→ Right. Expected results, written before the code runs, are the check that a tidy function can still fail.
```

---
