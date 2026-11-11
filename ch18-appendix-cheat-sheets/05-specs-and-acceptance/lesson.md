# Cheat Sheet: Specs and Acceptance Examples

*From Chapter 7. Use before giving any work to an assistant.*

## The six sections

1. **Purpose.** What it is for, and what it is not for.
2. **Inputs and outputs.** Each value with its unit and type.
3. **Errors.** Each error condition and what the caller receives.
4. **Constraints.** Language and version, allowed dependencies, rules.
5. **Out of scope.** What the work deliberately does not do.
6. **Acceptance examples.** Concrete input and output pairs.

## The acceptance table

- At least one row on each side of every boundary.
- At least one row for every error the spec names.
- Each expected value is worked out by hand, separately, and checked a second time.
- Each row is a test, named for the rule it checks.

## Giving it to the assistant

- Say the acceptance table is authoritative.
- Forbid changes to the examples.
- Run every row against the output, and record a check record.
- Report a failing row with its expected value, actual value, and the rule it breaks.
- Run the whole table again after each fix.

## Common mistake

Writing the expected values from the code. A table written from the code proves nothing.
