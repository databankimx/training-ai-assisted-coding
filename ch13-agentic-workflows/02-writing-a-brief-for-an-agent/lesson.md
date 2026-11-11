# Writing a Brief for an Agent

An agent's brief is the contract for the run. It says what the agent may touch, what it must not change, where it must stop, and what counts as finished. A brief written after the run is a summary of what happened. A brief written before it is the standard the run is judged against.

The brief is closer to a spec than to a prompt. Chapter 7's spec asks what the code must do. The brief asks what the agent may do, and when it must hand control back to you.

## The four parts

**Scope.** The files, modules, and behaviors the agent may change. Name them. "The Orders module, and nothing outside it" is a scope. "The relevant code" is not.

**Constraints.** The things that must not change, and the rules the work must follow: the language version, the dependencies allowed, the tests that must not be edited, and any file that is off limits.

**Checkpoints.** The points where the agent must stop and report before continuing. Each checkpoint names what the agent shows you: the plan, the diff, or the test results.

**Done criteria.** The checks that decide whether the work is finished. They should be things the agent can run and you can read: the build passes, the named tests pass, the acceptance examples pass, and the diff touches only the scope.

## An example

> **Weak brief:**
> Rename ShippingCost to ShippingCents everywhere, and make sure everything still works.
>
> **Brief for an agent:**
> Scope: the Orders module, in the `src/Orders` folder. Nothing outside it.
> Constraints: do not edit any test file. Do not change behavior, only names. Do not add packages.
> Checkpoints: (1) show the list of files you intend to change, before any edit. (2) show the diff, before running the tests. (3) show the test results, before you summarize.
> Done when: the build passes, the Orders tests pass with no edits to them, and every changed file is under `src/Orders`.

The weak brief has no scope, no test rule, and no stop. The agent can finish it by changing any file it likes, including the tests, and report success.

The strong brief gives the agent three stops, and each stop is a point where you can say no. The done criteria are checks you can run yourself, so the agent's report isn't the only evidence.

> **A note on the done criteria.** "Everything still works" is not a done criterion. The agent will decide what "works" means, and the decision will be its own. A criterion is done when a command, a test, or a diff can settle it without the agent's opinion.

## Write the brief before the run

The brief should exist as a file before the agent starts, so the scope and the stops are fixed, and so you can review them. An agent that writes its own brief tends to write a brief it can satisfy.

> **Aside: why an agent needs stops that it can't skip.**
> An agent that is told to stop at a checkpoint may still continue if the checkpoint seems unimportant to it, or if it has convinced itself that the next step is obvious. The stops are part of the brief because the brief is the thing you control. If a stop matters, say so in the brief, and check that the agent respected it, using the record of what it showed you.

## Try it

Choose a small change in your own work that could be given to an agent. Write a brief with all four parts: scope, constraints, checkpoints, and done criteria. Check that every done criterion can be settled without the agent's opinion. Save the brief in a file called `BRIEF.md` in your practice folder.

---
