# Logging and Review

An agent's log is the record a reviewer reads after the run. It's the only account of what happened that doesn't depend on the agent's summary. If the log is missing a step, the review can't see it. If the log is vague, the review can't judge it.

A good log entry answers three questions for each step: what the model proposed, what the loop decided, and what the tool did. The log in Chapter 14, step 4 answered the third question and left out the second, which is why the approval never appeared in it.

## What one entry should contain

Here is the same step logged three ways.

> **Too thin:**
> `write fines.txt`
>
> **Shows the action, not the decision:**
> `step 3: write_file fines.txt -> ok`
>
> **Complete:**
> `step 3 | proposed: write_file fines.txt | gate: needs approval, declined by reviewer | tool: not run | result: needs approval, not written`

The first entry says what happened, and nothing else. The second says what the tool returned. The third says what was proposed, what the gate decided and why, what the tool did, and the result. A reviewer who sees the third entry can answer every question about the step without asking anyone.

## A complete log of a run

Here is a short run with an approval gate, in the complete form. The task is the same fines change from the previous steps.

```
step 1 | proposed: list_files | gate: allowed (read) | tool: ran | result: fines.txt
step 2 | proposed: read_file fines.txt | gate: allowed (read) | tool: ran | result: cap 2000
step 3 | proposed: write_file fines.txt | gate: needs approval, declined by reviewer | tool: not run | result: needs approval, not written
stop   | reason: write needs approval | steps used: 3 of 10
```

Read the log from top to bottom, and each line answers the same questions in the same order. The stop line says why the run ended and how much of the budget was used. If the run had finished, the stop line would say `done`, and the reviewer would know the goal was reached.

## What a reviewer looks for

Read the log the way you'd read a diff: look for the steps that changed something, and check each one.

- **Writes, deletes, and sends.** Each should have a gate line. A write with `gate: allowed` needs a reason, and "the model thought it was fine" is not a reason.
- **Errors and retries.** A repeated step after an error is a loop, not progress. Check whether the loop stopped on the second failure.
- **Steps the brief didn't mention.** A tool call the task didn't need is a question.
- **The stop line.** A run that ends on the limit has an incomplete result, however the last step looks.

> **Example of a review note.** "Step 3 proposed a write and the gate declined it. The run stopped correctly. The task needs a person to approve the change, and the reviewer should decide whether the change is wanted before the agent is asked again."

## Logs are for people, and they can leak

A log records what the agent saw and did. That can include file contents, paths, and anything the tools returned, which may be confidential. Treat the log the same way you'd treat the output of a tool you ran on company data: keep it in the place your policy allows, and don't paste it into an unapproved tool to summarize it. Chapter 2 covers the rule.

> **Aside: why a log has to be written as the run happens.**
> A log written from memory after the run is a summary, and summaries lose the failures. Each entry should be written at the moment the loop takes the step, so the record is what happened, including the steps the agent would rather not mention.

## Try it

Run the starter from the previous step with its gate in place, or write three log lines by hand for a three-step run of your own. Put each line in the complete form, with proposed, gate, tool, and result. Then write a review note for the one step that needs a person's decision. Save the log and the note in a file called `run-log.md` in your practice folder.

---
