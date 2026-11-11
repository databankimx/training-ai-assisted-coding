# Homework: Build a Small Agent From a Spec

An assistant built a small agent from a spec. The starter is that agent, and it runs. It doesn't match the spec, and it has three defects against it. Your job is to read the spec, run the starter, find the three defects, fix them, and read the log of the fixed run.

Write your work in a file called `agent-review.md` in your practice folder. Keep the three defects, the fix for each, and the log of the fixed run.

## The spec

The agent has three tools: list files, read a file, and delete a file. It works on a folder that holds `notes.txt` and `temp.txt`.

1. The step limit is **5**. A run that reaches it stops with a message saying so.
2. Each log line has the form **`[n] call -> result`**, where `n` is the step number.
3. A **delete needs a person's approval**. If the approval is declined, the file is not deleted, and the run stops with the message `stopped: delete needs approval`.

The task is to read `notes.txt`, then delete `temp.txt`. The spec doesn't say what happens after that, and the stand-in for the model keeps proposing a delete. The spec's limit and gate are what end the run.

## Run it

Press **Run** (or F5) on the starter and read every line. Compare each line with the spec, not with your idea of what an agent should do.

Some lines will be wrong in more than one way. A delete ran without a gate. The log has a different shape from the spec. And the run went on past the limit the spec sets. Find each one, and write it down as a claim: the spec says X, the starter does Y.

The starter's comments name the defects. Don't rely on them alone. Read the code and find where each behavior comes from.

## Fix the three defects

Fix each defect in the smallest change that makes the spec hold, and run again after each one. Doing them one at a time means each run shows the effect of one change, which is the checkpoint habit from Chapter 13.

- **The limit.** Set it to the spec's value.
- **The log format.** Print each line the way the spec describes.
- **The delete.** Put an approval gate in front of the delete, and stop the run when the gate declines.

Press **Check** on the starter to see the mismatch. Then press **Run** on the solution. Compare the solution's log with the expected output, and compare your own fixed run with the solution.

## What to hand in

Your review should contain:

- **The three defects,** each as a claim in the form "the spec says X, the starter does Y," with the line that shows it.
- **The fix for each,** and the log after each fix. Keep the log from the run after the third fix.
- **Your review of the log.** Name the step that needed a person's decision, what the gate showed the person, and what you would have needed to see before approving it.

Then answer one question: if the delete had been approved, which of the spec's three rules would the run have broken, and which would still hold?

---

~~~spoiler
Answer key. Your claims and wording may differ, but each defect must name the spec line it breaks and the code that breaks it.

**The three defects.**

- *The limit is 20, and the spec says 5.* The starter's loop runs until step 20, so the run goes on for fifteen more steps after the point where it should have stopped. The fix is to set the limit to 5. The log then ends at step 5, and the stop message reports the limit, not the gate.
- *The log format is `step n: call -> result`, and the spec says `[n] call -> result`.* A reader comparing the log with the spec would find a format they can't parse without guessing. The fix is to change the print line. Nothing in the agent's behavior changes, but the format is part of the contract a reviewer relies on.
- *The delete runs without a gate.* The starter removes `temp.txt` and logs `deleted (no approval asked)`. The spec requires a person's approval. The fix is a gate in front of the delete, which declines in this example and stops the run.

**The fixed log.**

```
[1] list_files -> notes.txt, temp.txt
[2] read_file notes.txt -> keep this
[3] delete_file temp.txt -> needs approval, not deleted
stopped: delete needs approval
```

The solution produces this log. The step limit is not reached, because the gate stops the run at step 3. Note that the limit still matters: if the gate were approving, the agent would have had two more steps before the limit, and a run that kept proposing deletes would stop at step 5.

**The review of the log.** Step 3 needs a person's decision. The gate should show the person the call, the file, and what the file contains, so the decision is made with the evidence. A reviewer approving the delete would want to see that `temp.txt` is scratch, that nothing else depends on it, and that the delete can be undone or is acceptable without undo.

**The two questions.** If the delete had been approved, the approval rule would have been obeyed, because the person decided. The step limit would still hold, because the loop counts steps whatever the tools return. The log format would still be the spec's. A delete that is approved is still a change, and the log must show it.

**Common mistakes.** Fixing only the defect that is most visible, which leaves the others in place. Changing the spec to match the starter, such as raising the limit to 20 because the run seemed to need it. Treating the gate as a prompt instruction rather than a check in the loop. Reading the log for success instead of for the steps that changed something.
~~~

---
