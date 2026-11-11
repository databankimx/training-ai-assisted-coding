# Agentic Workflows

An agentic workflow is one where the assistant does more than answer. It reads files, runs commands, edits several places, runs tests, and decides what to do next from what it finds. You give it a goal, and it works toward the goal with a degree of independence.

That independence is the reward and the risk. The agent can finish in minutes what would take an afternoon by hand. It can also finish the wrong thing, touch files you didn't mention, weaken a test to get a green result, and report success, all without stopping to ask. Every step the agent takes is a change you have to be able to account for.

This chapter is about supervising that independence. You decide the boundaries in advance, you stop the agent at checkpoints, and you read what it did before you accept it.

## What you'll do

1. **What makes a task agentic.** The conditions under which a task suits an agent, and when it doesn't.
2. **Writing a brief for an agent.** Scope, constraints, and the done criteria, written before the run starts.
3. **Checkpoint supervision.** Plan, review, implement, review, test, review, and why each review is a stop.
4. **Reading the diff.** The most important review in an agentic workflow, with a checker you can run.
5. **Prompt injection.** Why an agent reading files and web pages can be told to do things by text it was never meant to obey.

The homework is a second diff from an agent, with more than one problem. You review it, and you write the checkpoints the run should have had. The summary has three quizzes.

The runnable step checks a diff for changes outside the task's scope and for removed checks, and prints a line for each file. The checker is simple on purpose, so you can see what it does.

---
