# Cheat Sheet: Testing With AI Assistance

*From Chapter 9. Use on every generated test suite.*

## Ask of each test

- Which wrong code would this test reject? If none, it is not a test of the answer.
- Is the expected value from the spec, or from the code?
- Does it check the boundary, the error, or only an easy value?

## Mutants

A mutant is the code with one realistic mistake.

1. Choose realistic mistakes: an off-by-one boundary, a missing check, a removed limit.
2. Run the suite against each mutant.
3. Caught means some test fails. Missed names a gap.
4. For each missed mutant, write the test that would reject it, from the spec.

## Before the code exists

- Write the tests from the spec, and run them first.
- Every test should fail. A test that passes before the code exists is suspect.

## Extending a suite

- Ask for additions by naming the gaps, not by asking for "more tests".
- Check each addition against a mutant. Keep only those that catch something new.
- Reject tests whose expected value is produced by calling the function.

## Watch for tampering

A changed expected value needs a rule from the spec. "The code produces it" is not a rule.

## Common mistake

Counting passing tests, or coverage, as evidence. A suite that reaches every line can still check nothing that matters.
