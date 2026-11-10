## Summary: Writing the Spec

A spec is a written promise about what a piece of work must do, and it's the document you check the assistant's output against. It has six sections: purpose, inputs and outputs, errors, constraints, out of scope, and acceptance examples. The acceptance table is the part that makes the spec checkable, and the output is checked against every row, not against a reading of the code.

These are the ideas to carry forward:

* **A file outlasts a chat.** Decisions in a conversation are buried in the transcript. Decisions in a spec can be reviewed, handed over, and relied on.
* **Units and errors are the usual gaps.** Write the unit of every value, and say what every error does.
* **Examples come from the spec, and cover both sides of each boundary.** Work every expected value out separately, because a wrong example teaches the wrong answer.
* **Give the assistant the spec, and forbid changes to the examples.** The acceptance table is the authority, not the code.
* **Run the whole table after every fix.** A check that covers only the rows you changed is a choice, and the choice is where defects hide.

### Check your understanding

*These questions are written for this course.*

```quiz
A team has agreed, over a long chat, that a discount applies before tax. Which step is most likely to prevent the rule from being lost?
○ Keep the chat open, so the rule remains available to anyone who needs it.
→ Not quite. The rule would still sit in a transcript that nobody reviews, and a new session won't have it.
◉ Write the rule into a spec, with an acceptance example, and review it before the code is generated.
→ Right. A written rule can be reviewed, handed over, and checked against the output.
○ Tell the assistant the rule once more at the start of each new session.
→ Not quite. Repeating it in conversation still leaves no reviewable record, and the rule can drift each time it's retyped.
```

```quiz
A spec has a rule that a fine applies after a grace period. Which acceptance examples best test that rule?
○ A value well into the fining range, such as 100 days overdue.
→ Not quite. A middle value tests the rule where generated code is most likely to be right, and misses the threshold.
○ Only one example, to keep the table short.
→ Not quite. One example rarely covers both sides of the threshold, so an off-by-one error can hide.
◉ Examples on both sides of the grace period threshold, such as three days and four days overdue.
→ Right. Boundaries are where generated code most often goes wrong, so the examples belong on both sides.
```

```quiz
An assistant's output passes most of an acceptance table but fails one row. What is the best next step?
◉ Report the failing row with its expected value, its actual value, and the rule it breaks, then run the whole table again after the fix.
→ Right. A precise follow-up gives the assistant a target, and a full run catches any new failure the fix causes.
○ Read the code carefully, because the failing row is probably a rare case.
→ Not quite. Reading the code tends to accept a method that looks right, and the row is the evidence.
○ Change the failing row's expected value to match the output, since the spec may have been wrong.
→ Not quite. The acceptance table is the authority. If the spec is wrong, fix the spec deliberately, not the test to match the output.
```

---
