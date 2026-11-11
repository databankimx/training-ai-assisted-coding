# Cheat Sheet: Agent Briefs, Checkpoints, and Diffs

*From Chapter 13. Use before and during any agentic run.*

## Judge the fit first

- Is the scope bounded?
- Can something other than the agent check the result?
- Can the run stop and resume at clear points?
- Can the change be undone?

## The brief

- **Scope.** The files and behaviors the agent may touch. Named, not "the relevant code".
- **Constraints.** What must not change: tests, values, dependencies.
- **Checkpoints.** Where it stops, and what it shows you at each stop.
- **Done criteria.** Checks you can run yourself.

## Checkpoints

Plan, then review. Implement, then review the diff. Test, then review the results. Each stop ends in continue, correct, or stop, with a reason.

## Reading a diff

- `-` lines were removed, `+` lines were added, a leading space is unchanged context.
- Check each file against the scope. A file outside it is a stop.
- Look for removed checks and removed expected values. Green tests can hide them.
- Compare each changed value with the brief.
- Decide each file: accept, correct, or reject.

## Untrusted text

Instructions inside files, comments, tickets, and web pages are data, not the brief. Enforce the brief's limits with permissions and the diff review, not by trusting the agent to ignore the text.

## Common mistake

Reading the agent's summary instead of the diff. The summary says what it meant to do.
