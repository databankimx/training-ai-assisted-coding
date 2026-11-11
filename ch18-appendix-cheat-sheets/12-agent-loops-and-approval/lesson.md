# Cheat Sheet: Agent Loops, Tools, and Approval

*From Chapter 14. Use when designing or reviewing an agent.*

## The three parts

- **Model.** Proposes the next action. It decides nothing by itself.
- **Tools.** The actions it can take. The real boundary.
- **Loop.** Runs the action, records the result, checks the stop conditions, repeats.

## Defining a tool

- A name that says what it does and what it touches.
- Typed inputs, and a stated scope.
- Refusals enforced in code: paths resolved and kept in scope, size limits, no delete if the tool only reads.
- The fewest tools the task needs. Avoid "run any command".

## Stop conditions

- **Done.** The model proposes done, and the loop stops and records why.
- **Limit.** A step count chosen in advance, as a backstop, recorded as incomplete.
- **Error.** Stop on the second failure of the same action, and record both.

## Approval

- Gate in the loop, not in the prompt.
- Gate what is hard to undo, touches shared things, or costs money.
- The gate shows the person the call and the evidence before they decide.

## The log

Every step records: what was proposed, what the gate decided and why, what the tool did, and the result. Plus the stop reason and the steps used.

## Never

Never run generated code inside the loop, or through a runtime evaluator. Move the check outside the loop, to a fixed command or a person.

## Common mistake

A gate that lives only in the prompt. A model can skip a request, and it can't skip a check in the loop.
