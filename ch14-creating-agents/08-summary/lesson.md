## Summary: Creating Agents

An agent is a model, a set of tools, and a loop. The model proposes, the tools act, and the loop decides what happens next, so the boundary of what an agent may do is the tools and the loop, not the model's intentions. A sound loop has a done condition and a limit, and it gates the actions that need a person. Its log records what was proposed, what the gate decided, what the tool did, and why the run stopped. And an agent never runs the code the model writes.

These are the ideas to carry forward:

* **The tool is the boundary.** A tool that can't reach something can't be steered into reaching it.
* **Every loop needs a done condition and a limit.** A limit without a done condition finishes the run in the wrong state.
* **Approval belongs in the loop.** A gate written in the prompt is a request, and a gate in the loop is a check.
* **The log is the reviewer's evidence.** Each step needs what was proposed, what was decided, and what happened.
* **Don't run generated code inside the loop.** Execution turns a proposal into an effect the stops never see.

### Check your understanding

*These questions are written for this course.*

```quiz
An agent's loop has a step limit, but no done condition. The model finishes the task at step 3, and the run continues until step 10. What is the most accurate description of this run?
○ A successful run, because it finished the task within its limit.
→ Not quite. The task finished at step 3, but the loop didn't know it, so the run went on and reported the limit as its stop.
◉ A run whose stop was caused by a missing done condition, and whose log will show the same kind of step over and over after the goal was met.
→ Right. The limit is a backstop, and without a done condition the loop keeps going after the work is complete.
○ A failed run, because the model should have stopped the loop at step 3 by itself.
→ Not quite. The model proposes actions, and the loop is the part that decides to stop. A loop without a done check has no way to act on the model's finish.
```

```quiz
A design puts a rule in the prompt: "ask a person before deleting any file." What is the most accurate assessment?
○ The rule is enforced, because the model reads and follows its prompt.
→ Not quite. A prompt is a request, and the model can skip it. Nothing stops a delete that the model proposes without asking.
○ The rule is enforced, because the tool will refuse the delete if the prompt says no.
→ Not quite. The tool doesn't read the prompt. It runs what the loop passes it.
◉ The rule is not enforced, because the gate belongs in the loop, where every delete passes a check before it runs.
→ Right. A gate in the loop applies to every delete, and it doesn't depend on the model remembering the rule.
```

```quiz
An agent's log shows that a write happened, with the line "step 4: write_file config.txt -> ok". Which information is missing that a reviewer needs most?
◉ What the gate decided, and why, before the write ran.
→ Right. A complete entry records what was proposed, what the gate decided, what the tool did, and the result, so the reviewer can see the decision.
○ The time the step took, so the reviewer can judge how long the agent spent.
→ Not quite. Timing can help, but it doesn't say whether the write was allowed.
○ The model's full reasoning text, so the reviewer can check its logic.
→ Not quite. The reasoning is useful to read, but the decision that matters is the gate's, and the log must record it.
```

---
