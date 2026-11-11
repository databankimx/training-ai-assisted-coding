# Checkpoint Supervision

Supervising an agent means stopping it at the right places and deciding what to do at each stop. The sequence that works best is plan, review, implement, review, test, review. Each review is a real decision point, and each one can end the run.

The sequence sounds slow. It's faster overall, because a wrong plan caught at the first review costs a sentence to correct, and the same mistake caught at the final review costs a revert and an afternoon.

## The six stops

**Plan.** The agent proposes the files it will change and the steps it will take. Review the plan against the scope. If the plan touches a file outside the scope, the run stops here, and the brief is corrected before anything else happens.

**Review the plan.** Check the plan against the brief's constraints. Does it propose a new dependency? Does it plan to edit a test? A plan that fails either check is corrected, not partly accepted.

**Implement.** The agent makes the changes the approved plan describes. Nothing beyond the plan should appear. If the agent starts doing more, that's a stop, not a bonus.

**Review the diff.** Read the change before anything runs. This is the most important review in the workflow, and the next step covers it in detail. A diff that touches an unexpected file, removes a check, or changes a value the brief didn't mention is rejected or corrected here.

**Test.** Run the done criteria: the build, the named tests, and the acceptance examples. Record the results. A test run the agent reports on its own is not a substitute for running it yourself.

**Review the results.** Decide the outcome. If everything passes and the diff is clean, accept. If something fails, decide whether to correct the implementation, return to the plan, or stop and redesign the task.

## What each decision looks like

At each stop there are three options, and each one needs a reason in writing.

- **Continue.** The checkpoint passed, and the next step is the one the brief allows.
- **Correct.** The checkpoint found a problem, and the fix is small and inside the scope. Give the agent the corrected instruction, and check the same stop again.
- **Stop.** The checkpoint found a problem the scope can't absorb, or the task has turned out to be different from the brief. Discard the branch, rewrite the brief, and start again.

> **Example.** An agent is asked to rename a property in the Orders module. At the plan stop, it lists a file in the Billing module. The decision is to correct: remove the Billing file from the plan, and note that the brief's scope was clear. At the diff stop, the rename is correct, but a test file has been edited to match. The decision is to correct again: revert the test change, and rerun the test stop.

> **Aside: why stopping is part of the work.**
> An agent doesn't get tired, and it doesn't feel the cost of a long run. The stops exist for the reviewer. Each one is a moment when you are the one deciding, with the evidence in front of you, rather than reading the result after the fact. The supervision is the part of the workflow that keeps the decision with the person who answers for the code.

## Try it

Write the six stops for a small task of your own, with the question you'd ask at each one and the decision you expect to make. Then write one example of a plan you would correct, and one diff you would stop. Save the stops and examples in a file called `checkpoints.md` in your practice folder.

---
