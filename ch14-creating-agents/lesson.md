# Creating Agents

Chapter 13 used agents from the outside. You wrote the brief, stopped at the checkpoints, and read the diff. This chapter opens the agent up. You'll see the parts an agent is made of, and you'll build a small one in a sandbox, so the risks from Chapters 13 and 15 stop being abstract.

Building an agent is also the fastest way to understand why the supervision in Chapter 13 matters. Once you have written the loop yourself, you can see every point where it could go wrong, and you can see why each stop, log, and approval exists.

## What you'll do

1. **What an agent is.** A model, a set of tools, and a loop, with a worked example of each.
2. **Defining tools.** The name, the inputs, what the tool may and may not do, and why the tool is the real boundary.
3. **The loop and its stop conditions.** Runnable: a loop that stops at a step limit, and what happens without one.
4. **Scope and approval.** Runnable: a write that needs a person's approval, and what happens when the gate is missing.
5. **Logging and review.** How to record each step so a person can read what the agent did.
6. **Never run generated code through an agent.** Why the rule exists, and what it looks like to break it, without a working example of the pattern.

The homework is a small agent, built from a spec, with a log you review afterwards. The summary has three quizzes.

The runnable steps use a stand-in for the model. It's a short rule that chooses the next action, so the examples are deterministic. The loop around it is the same shape a real agent uses, and the rest of the chapter explains what the stand-in replaces.

---
