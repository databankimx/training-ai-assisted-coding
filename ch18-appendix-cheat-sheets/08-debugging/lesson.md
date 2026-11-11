# Cheat Sheet: Debugging

*From Chapter 10. Use whenever something is already wrong.*

## A useful report has four parts

- **Observed.** The exact output, error text, value, and input. Copied, not paraphrased.
- **Expected.** What should happen, and where that expectation comes from.
- **Conditions.** Data, version, configuration, and any recent change.
- **Suspicion.** Your guess, labeled as a guess.

## Reading output

- Read from the top, and stop at the first line that differs from the expected output.
- The numbers in a differing line often name the quantity that is wrong.

## Testing a proposed fix

1. Write the fix's claim, and its assumption.
2. Check the reported case, then a case that breaks the assumption.
3. Check the invariant the code relies on: a zero divisor, an empty list, a negative value.
4. Accept the fix only when every case agrees with the spec.

## Common mistake

Testing the fix only on the reported case. The reported case is the one the fix was built around.
