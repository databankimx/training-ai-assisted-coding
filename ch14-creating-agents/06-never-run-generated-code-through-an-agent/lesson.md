# Never Run Generated Code Through an Agent

Some designs give an agent a tool that runs code. The agent writes a small program, the tool executes it, and the result goes back into the loop. It sounds like a shortcut, because the agent can check its own work by running it.

This course does not teach that design. This step explains why, and it describes the risk in terms of the parts of the agent. It deliberately doesn't show a working version, because the working version is the risk.

## Why the design is tempting

An agent that can run code can check its answers. A calculation that would take the model several steps to reason through can be executed in one. A test that the agent writes can be run immediately. The loop feels more capable, and the results feel more reliable, because they come from a program.

Those are real benefits, and they're the reason the design keeps appearing. The trouble is what the design gives the model: a way to run any program it can write, with whatever permissions the tool has.

## What goes wrong

Look at the parts of the agent from the first step. The model proposes. The tool acts. The loop decides. A tool that runs generated code breaks each part.

**The tool is not a boundary.** Chapter 14, step 2 said the tool is the real limit on what the agent can do. A tool that executes any code has no limit that the tool can enforce. Whatever the program can do, the agent can do. The scope rules from the earlier steps stop applying to anything the program does.

**The model's output is now an action.** A proposal to run a program is a proposal to run arbitrary code. Injected text from Chapter 13, step 5 becomes dangerous here in a way it isn't elsewhere. A file that tells the agent to "verify this by running the cleanup script" can make the agent run it.

**The loop cannot see what the program did.** The log records that the program was run and what it printed. It doesn't record the files it changed, the connections it opened, or the data it read, unless the tool is built to report them. The review in the previous step has nothing to read.

**There is no gate that matches the risk.** An approval gate on "run code" would ask a person to approve arbitrary programs one at a time, which means the person must read and judge every program. That's the review the design was meant to avoid.

**The check is not independent.** The agent writes the program and then runs it to check its own work. The program's output is evidence only if the program is right, and the agent wrote both. That's a circular test, the same pattern as Chapter 9.

## Why the rule holds in this course

The course's rule has a simple form: generated code is reviewed, committed, tested, and scanned, like any other code, and it is not executed as part of an agent's loop. Running a generated program to see whether it works is a development step, done by a person, in an environment built for that purpose, with the usual tests and checks around it.

The rule doesn't forbid a person from running code the assistant wrote. Chapter 8 and Chapter 9 are full of that. It forbids the loop from running it on the model's say-so.

> **Aside: why the risk is bigger than it looks.**
> Running a program is the one action that can do anything. A file can be wrong, and a diff can be reviewed. A program that runs can read secrets, send data, change other programs, and do all of it before any review sees it. The agent's stops and approvals operate on proposals, and a program run in the loop turns a proposal into an effect that the stops never see.

## What to do instead

When an agent needs a result that a program would give, build the check outside the loop. A person runs the test. A tool with a narrow, specific job returns the number, and the tool's inputs are checked. The agent reads the result as data.

> **In the loop, not allowed:** a tool that runs whatever program the model writes, and returns its output.
>
> **Outside the loop, allowed:** a person runs the project's tests and pastes the summary into the brief for the next checkpoint.
>
> **In the loop, allowed:** a tool that runs one fixed test command from the project, with no input from the model, and returns the pass or fail count.

The last example is still a tool that runs something, so it needs the usual review. It's allowed because the command is fixed by the project, not written by the model. The model chooses whether to run the tests, and it can't change what the tests are.

## Recognizing the pattern

If you're reviewing an agent's design and you see any of these, stop and ask the question before anything else.

- A tool whose input is code, a script, or an expression written by the model.
- A tool named for execution, such as "run", "eval", or "execute", without a fixed command behind it.
- A design note that says the agent "verifies its work by running it".
- A test the agent writes and then runs as its only check.

Each of these is the same design in a different form. The fix is the same: move the execution out of the loop, and let the loop read results from a check that a person or a fixed command controls.

## Try it

Take an agent design you know, real or invented, and list every tool it has. For each tool, say whether its input could contain code the model wrote. For any tool that could, write what the fixed alternative would be, and where the execution would move. Save your review in a file called `execution-review.md` in your practice folder.

---
