## Summary: Agentic Workflows

An agentic workflow gives the assistant a goal and lets it work toward it with some independence. That independence is worth having only when the task has a bounded scope, a check the agent can't grade for itself, clear places to stop, and a change that can be undone. The brief states the scope, the constraints, the checkpoints, and the done criteria before the run. Supervision means stopping at the checkpoints, and the diff is the most important of them, because it shows what the agent did rather than what it says it did.

These are the ideas to carry forward:

* **Check the fit before the run.** Scope, independent checks, stops, and reversibility decide whether a task suits an agent.
* **Write the brief first, and make the done criteria runnable.** A criterion that depends on the agent's opinion isn't a criterion.
* **Stop at each checkpoint, and decide in writing.** Continue, correct, or stop, each with a reason.
* **Read the diff before any test runs.** A removed check can make a test run green.
* **Treat text the agent reads as data.** Instructions in files and web pages are not the brief, and the permissions and the diff review are the defenses.

### Check your understanding

*These questions are written for this course.*

```quiz
A task asks an agent to "modernize the reporting code." Which question should stop the task from going to an agent?
○ Whether the agent knows the language the code is written in.
→ Not quite. The language is a detail. The question that matters is about scope and checks.
◉ Whether the scope is bounded and the result can be checked by something other than the agent.
→ Right. "Modernize" has no bounded scope, and without an independent check, the agent decides what done means.
○ Whether the task takes more than an hour to complete.
→ Not quite. Length alone doesn't decide fit. A long task with clear scope and checks can suit an agent.
```

```quiz
An agent's diff passes the tests, but one test file has two assertions removed. What is the right decision for that file?
○ Accept it, because the tests pass and the result is green.
→ Not quite. A green result after a removed check shows nothing, because the check that would have failed is gone.
○ Keep the removal, and change the code so the remaining tests still pass.
→ Not quite. That is the tampering pattern. The test is the evidence, and the code should be judged against it.
◉ Reject the test change, revert it, and judge the code against the original assertions.
→ Right. A removed check is a reject, and the original test stays as the standard the code must meet.
```

```quiz
A file in an agent's brief is out of scope, and the agent says the change was harmless. What is the most useful response?
◉ Stop the run at the next checkpoint, revert the change, and correct the plan so the file is not touched again.
→ Right. The brief is the contract, so the change is reverted, and the plan is corrected before the run continues.
○ Accept the change, because the agent knows the codebase better than a reviewer does.
→ Not quite. The brief sets the scope, and the agent's judgment about harmlessness isn't a reason to exceed it.
○ Ignore the file, and review only the files inside the scope.
→ Not quite. An out-of-scope change can still break the brief, and it has to be seen to be decided.
```

---
