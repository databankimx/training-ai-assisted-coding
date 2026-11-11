## Summary: Knowing When to Stop

An assistant pays back when the domain is familiar, the check is quick, and the fix is cheap. A session has stopped converging when the same failure keeps returning, when the edits outgrow the request, when you can't explain the output, or when the schedule is driving the prompts. The recovery is a restart from the spec, a smaller scope, or a person who knows the domain. A prototype the assistant helped build needs a spec, tests, a review, dependency checks, designed errors, handled data, and an owner before it reaches users. Skills fade when they're never used, so some work stays unassisted. And before each task, six questions in order decide the next step.

These are the ideas to carry forward:

* **Judge the fit before the tool.** Familiar domain, quick check, and cheap fix decide whether the assistant pays back.
* **Count the failures after every round.** If the count doesn't fall in two rounds, stop the session.
* **Close the prototype gaps in order.** The spec comes first, and an owner comes last but is never optional.
* **Keep some work unassisted.** The reviewer's judgment is the part that gets scarcer as code gets cheaper.
* **Answer the six questions in writing before the task.** The decision is cheapest to get right before the pressure starts.

### Check your understanding

*These questions are written for this course.*

```quiz
A developer has asked an assistant for the same fix five times. The failing case is the same each time, and the code has grown with each round. Which stop condition applies, and what is the best recovery?
○ Deadline pressure, so the developer should shorten each prompt and ask for the fix faster.
→ Not quite. The schedule isn't the sign here. The same failure returning and the code growing are.
◉ Repeated failure to converge, so the developer should write the failing case and the rule it breaks, and restart from a complete spec.
→ Right. The same case failing and the code growing are the signs of repeated failure, and a restart from the spec replaces another round.
○ Editing more than writing, so the developer should accept the latest version and move on.
→ Not quite. Accepting a version that still fails the same case doesn't fix the failure, and it ignores the failing count.
```

```quiz
A team wants to put a prototype that an assistant helped build into use by customers, because it works on the cases the developer tried. Which step should come first?
◉ Write the spec, so that the behavior can be compared with a written rule before anything else.
→ Right. The spec is the first gap to close, because the tests, review, and gates all check against it.
○ Ship it to a small group of customers, and fix whatever breaks.
→ Not quite. A small group still depends on the answers, and the gaps are the cases no one tried.
○ Name the owner, so that someone is responsible for the first incident.
→ Not quite. An owner matters, but it doesn't check anything. The spec comes first in the walk-through.
```

```quiz
A developer uses an assistant for every task, and now finds it hard to review a generated change without the assistant's help. What is the most useful next step?
○ Stop reviewing generated changes, since the assistant can review them better.
→ Not quite. The reviewer's judgment is what answers for the code, and handing it over removes the last check.
○ Use the assistant more, so the reviewing skill comes back through practice with its suggestions.
→ Not quite. Practice with the assistant's answers doesn't rebuild the judgment that checks them.
◉ Keep some work unassisted, such as reviewing a change against the spec and predicting the cases by hand, and keep that practice in a regular routine.
→ Right. A skill fades through disuse, and deliberate unassisted practice keeps the judgment in use.
```

---
