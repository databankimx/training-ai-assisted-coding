# Cheat Sheet: Refactoring

*From Chapter 11. Use for any change meant to keep behavior the same.*

## Scope the request

- Name the scope: one method, one file, one module.
- Name the change: one rename, one extraction, one duplicate check.
- List what must not change: outputs, errors, order of side effects, public names, rounding and types.

## Side effects to check for each kind of change

| Change | Usual side effect |
|---|---|
| Rename | A changed string, log message, or serialized name |
| Structural change | A moved boundary (`>` became `>=`), an early return that skips cleanup |
| Merged duplicate | Two different rules merged into one |

## Checkpoints

1. Make one kind of change.
2. Compare the new code with the original on cases you chose.
3. Include cases on every boundary, and a case that reaches each branch.
4. Stop at the first failing checkpoint, and find the change that caused it.

## Common mistake

Comparing only the typical cases. Boundary cases are where refactoring changes behavior, and the control cases that never reach a branch prove nothing about it.
