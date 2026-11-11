# Cheat Sheet: Prompts and Constraints

*From Chapter 5. Use before sending any request for code.*

## The six parts

1. **Language and version.** "C# for .NET Framework 4.8."
2. **Signature.** Name, inputs, and outputs with their types.
3. **Input and output contract.** Valid inputs, and what the output must mean.
4. **Errors and edge cases.** What happens when the input is wrong. The most often missing part.
5. **Constraints.** What must not happen, stated so it can be checked.
6. **Style and shape.** Naming, structure, comments. Matters least for correctness.

## Constraints that can be checked

| Vague | Checkable |
|---|---|
| Keep it simple | No method longer than 30 lines |
| Use good naming | Boolean methods start with Is, Has, or Can |
| Handle errors properly | Catch only the named exception type |
| Use only what's needed | Standard library only; no new packages |

## Follow-up rules

- Name the failure and the fix: "Starts from zero, so negatives return zero. Start from the first value."
- Say what must stay the same.
- Run the failing case and one passing case after each round.
- After two rounds that don't fix it, restart with one complete prompt in a new session.

## Common mistake

A vague error part. A default is chosen for you wherever the prompt is silent.
