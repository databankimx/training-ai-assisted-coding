# Scope and Approval

An agent with a write tool can change anything that tool can reach, and it can do so without asking. Scope limits what the tools can reach. Approval decides which actions wait for a person. Together they set the agent's real authority, and they are the difference between an agent that proposes changes and one that makes them.

This step shows the difference with a run. The starter's agent writes the file as soon as it proposes the write. The solution puts a gate in front of the write, and the run stops at the gate.

## Two kinds of limit

**Scope** is the set of things a tool can touch. A tool that writes to `config/` can't touch `secrets/`, whatever the model proposes. Scope is enforced by the tool, as Chapter 14, step 2 showed.

**Approval** is the set of actions that need a person's decision before they happen. A write to a file the team depends on might be in scope and still need approval, because the team wants to see it first. Approval is enforced by the loop, because the loop is what calls the tool.

A useful way to say it: scope asks "may the agent touch this?", and approval asks "may the agent do this now?"

## Run it

Press **Run** (or F5) on the starter and read the five lines. The first three show the agent finding the file, reading the cap, and writing the new value. The third line says `ok (no approval asked)`. The file changed, and nobody was asked.

The log doesn't show a problem. The goal was met, and the report looks like a success. That's the risk: an action that changes something important can look exactly like any other step in a successful run.

The expected output stops at the write. Press **Check** on the starter to see the difference. Then press **Run** on the solution. The write now goes through a gate, and the gate declines it. The file is unchanged, and the run stops with a message that says why.

> **A note on the code.** The starter and solution were written by hand to show the gate. They aren't a record of what any agent did. In the solution the gate's answer is fixed, so the output is repeatable. In a real agent, a person answers the question, and the run waits until they do.

## Where the gate goes

The gate must sit between the loop's decision and the tool's action. A gate placed in the prompt, such as "ask before writing", is a request, and the model can skip it. A gate in the loop is a check on every write, and the model can't skip it, because the loop runs the write only after the gate passes.

> **Aside: why approval is part of the loop.**
> The model is good at describing what it intends to do, and the loop is what does it. Putting the decision in the loop means the decision happens to every action of that kind, not only the ones the model remembers to mention. This is the same argument as Chapter 13's stops: a stop that depends on the agent's cooperation is not a stop.

## What to approve

Not every action needs approval. Approving every read makes the agent slow and the reviewer tired, and the approvals stop meaning anything. Approve the actions that are hard to undo, that touch shared things, or that cost money. Reads of your own project are usually fine without a gate. Writes to shared files, deletes, sends, and deployments usually need one.

> **Example.** Reads from `config/` pass without a gate. Writes to `config/` need approval. Any delete needs approval, and any change outside `config/` is refused without asking.

## Try it

Make a list of the actions an agent could take in a task you know. For each, write one of three rules: allowed without asking, needs approval, or refused. Give the reason in one phrase, such as "hard to undo" or "touches shared files". Then pick the one approval you would least like to skip, and write what the gate would show the person before they decide. Save your list in a file called `approvals.md` in your practice folder.

---
