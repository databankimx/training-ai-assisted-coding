# What an Agent Is

Strip away the product names and an agent is three things working together. There's a model that decides what to do next. There are tools, which are the actions the agent can take in the world. And there's a loop that repeats: ask the model for the next action, run the action, record what happened, and ask again, until a stop condition is met.

That's the whole design. Every agent you use, however complicated its interface, has these three parts somewhere.

## The three parts

**The model** reads what the agent has seen so far, and returns the next action. The action is a choice of tool and its input, or a decision that the task is finished. The model doesn't run anything itself. It only proposes.

**The tools** are the actions the agent can take. A tool is a named function with inputs, such as `read_file` with a path, or `search` with a query. The model can only use the tools it's given. A tool the agent doesn't have is an action it can't take, no matter how well it reasons.

**The loop** connects the two. It sends the model what has happened so far, takes the action the model returns, runs the tool, records the result, and repeats. It also decides when to stop.

## One pass through the loop

Here is a task and a single trip around the loop. The task is to make a fines setting match a decision.

> **Goal:** Change the fine cap in `fines.txt` from 2000 cents to 1800 cents.
>
> **Pass 1.** The loop shows the model the goal and the empty history. The model returns the action `list_files`. The loop runs it, and the tool returns `fines.txt`. The loop records the result.
>
> **Pass 2.** The loop shows the model the goal and the one result so far. The model returns `read_file fines.txt`. The tool returns `cap 2000`. The loop records it.
>
> **Pass 3.** The model sees the current value and returns `write_file fines.txt cap 1800`. The loop runs it, and the file changes.
>
> **Pass 4.** The model sees the write succeeded and returns `done`. The loop stops, because the model has said the work is finished.

Each pass adds one entry to the history. The model's next choice depends on that history, which is why an agent can work through several steps without being told each one.

> **Aside: why the history is the agent's memory.**
> A model doesn't remember the last pass on its own. The loop sends the whole history again every time, so the model's "memory" is the list of what has happened. If an entry is missing from the history, the model acts as though it never happened. That's the same reason a long chat loses its early constraints in Chapter 3, and it's why an agent's log is a record of what the model was shown, as well as what it did.

## Which part decides what the agent may do

It's tempting to think the model decides what the agent can do. It doesn't. The model proposes, and the tools and the loop decide.

- A tool that isn't defined can't be called, whatever the model proposes.
- A tool that is defined runs whatever input the model gives it, unless the tool checks the input.
- A loop that doesn't check the model's proposal will run it.

So the boundary is the tool and the loop, not the model's good intentions. Chapter 14, step 2 is about defining that boundary well.

> **A note on the examples.** The goal and the passes are written out in full so you can follow them. A real agent's model returns its choice in a structured form, and the loop parses it. The shape is the same: a proposal, a check, an action, and a record.

## Try it

Choose a small task you could give an agent, such as renaming a file, updating one setting, or adding a missing line to a list. Write its passes in the same form as the example, with one line per pass: the model's proposed action, what the loop does, and what is recorded. End with the stop condition. Save your passes in a file called `passes.txt` in your practice folder, and mark the pass where the model could propose something you would not allow.

---
