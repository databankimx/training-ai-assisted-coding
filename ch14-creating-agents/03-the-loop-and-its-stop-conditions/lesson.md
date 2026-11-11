# The Loop and Its Stop Conditions

The loop decides when the agent stops, and it's the part most often left unfinished. A loop that only asks the model for the next action will keep going for as long as the model keeps proposing actions. Sometimes that's forever.

Every loop needs two kinds of stop. A **done condition** ends the run when the work is finished. A **limit** ends it when the run has gone on too long, whatever the reason. A loop with only the first kind can run forever. A loop with only the second kind stops at the limit even when the work finished several steps earlier, and the log shows nothing wrong until someone reads it closely.

## What happens without a done condition

The loop below is a small agent in a sandbox. It has three tools: list files, read a file, and write a file. The stand-in for the model proposes one action per step. The goal is to change the cap in `fines.txt` from 2000 to 1800.

Here is one step of the loop, in plain terms, as a sequence of checks.

> 1. Ask the stand-in for the next action.
> 2. Run the action, and record its result.
> 3. Check whether the loop should stop.
> 4. If not, go back to step 1.

Step 3 is where the stop conditions live. Without a done check, step 3 only asks whether the step count has reached the limit.

## Run it

Press **Run** (or F5) on the starter and read the log. The first three lines show the agent finding the file, reading the cap, and writing the new one. The file now says 1800, so the goal is met.

Then the log keeps going. The stand-in keeps asking to read the file, and nothing in the loop knows the work is finished. The run stops only at the step limit, and the last line says so.

The expected output is the same first three steps, followed by a done step, and a stop that names the done condition. Press **Check** on the starter to see the difference. Then press **Run** on the solution. The stand-in now proposes `done` after the write, and the loop checks for it.

> **A note on the code.** The starter and solution were written by hand to show the stop conditions. They aren't a record of what any model produced. The stand-in is a fixed script, which is why the output is the same every time. A real model's choices vary, and the loop's stop checks work the same way.

## The two stops, side by side

Each stop has a job, and each needs to be written down.

- **Done.** The model proposes `done`, the loop stops, and the log records why. Use this when the work is complete.
- **Limit.** The step count reaches a number you chose in advance. Use this as a backstop, so a run can't go on forever, and the log records that the work may be incomplete.

A stop that only ever fires on the limit is a sign of a missing done condition. The log will show the agent doing the same thing over and over, after the goal was met.

## Errors need a stop too

A third kind of stop is easy to forget: an error. If a tool fails, the loop should decide whether to retry, stop, or ask a person. A loop that records an error and carries on will often repeat the failed action until the limit.

> **Example.** A write fails because the file is locked. A loop that ignores the failure asks the model what to do next, and the model proposes the same write again. The loop should stop on the second failure, record both, and report that the write could not be completed.

> **Aside: why a limit is a backstop, not a plan.**
> A step limit protects you from a run that never ends. It doesn't tell you whether the work was done. A run that reaches the limit has used up its budget without a verdict, and the honest report is "incomplete", not "finished". Treat the limit as the last resort, and make the done condition the normal way out.

## Try it

Write a loop for a task of your own, in plain steps, with its done condition, its limit, and one error stop. For each stop, write the log line it would produce. Then name the one case where the limit would fire even though the work was complete, and say which done condition would have prevented it. Save your loop in a file called `loop.md` in your practice folder.

---
