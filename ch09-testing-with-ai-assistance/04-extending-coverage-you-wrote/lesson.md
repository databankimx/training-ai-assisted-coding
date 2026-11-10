# Extending Coverage You Wrote

Once a suite exists, an assistant can help extend it. It can suggest the cases you didn't think of, fill in a table of inputs, or write the tests for a rule you've just added. This is a good use of the tool, and it's also where a suite most often gets worse without anyone noticing, because new tests look like progress.

The rule for this step is simple: an added test has to earn its place by catching something. A test that only confirms what the code already does adds to the count and nothing else.

## Give the assistant the spec and the suite

Ask for additions the same way you asked for the suite. Give the spec, give the existing tests, and say which rules the suite doesn't cover yet. Don't ask for "more tests." That request invites tests that confirm the code, because the assistant reads the code as the most available source of truth.

> Weak request: Add more tests for this function.
>
> Better request: Here is the spec and the current suite. The suite has no test for a day on the grace period's boundary, and none for a bad input other than a negative number. Add one test for each gap. Take each expected value from the spec, not from the function. Don't change or remove any existing test.

The better request names the gaps, the source of the expected values, and what must not change. It's the same pattern as the follow-up cycle in Chapter 5.

## Check each addition against a mutant

Before you accept an added test, ask which mutant it catches. Run the mutant harness from the previous step, and see whether the new test changes the result. A test that catches a mutant the suite already caught is redundant. A test that catches a mutant the suite missed is the one worth keeping.

If an added test catches nothing, it may still be valid. It may be a test of a behavior the spec doesn't require, or it may be a restatement of an existing test with different numbers. Either way, it's a candidate for deletion, and the reviewer decides.

## Reject tests that confirm the code

Some additions look like coverage and aren't. Look for these patterns in any suggested test.

- **The expected value came from calling the function.** `expected = fine(5)` followed by `assert fine(5) == expected` can't fail.
- **The test repeats a check with different numbers, and the spec never named the numbers.** Five hundred tests of the same rule is not five hundred rules.
- **The test checks a value the spec doesn't define.** A test for a fine of exactly 1234 cents, with no rule that produces it, is a test of the implementation.
- **The test is added so the suite passes.** If a new test fails on the current code, the code may be wrong, and the test is right. Fix the code, or change the spec deliberately. Don't delete the test.

## Example: the gaps in a suite

Here is a suite that has four tests. The spec has six rules and boundaries. Two gaps are clear: day four, the first day of the fine, and day eighty-three, the first day of the cap, are not tested.

> Added: "25 cents on the first chargeable day" with day four expecting 25. This catches the grace mutant, and it comes straight from the spec.
>
> Added: "reaches the cap at 83 days" with day eighty-three expecting 2000. This catches a cap applied one step late, and it comes from the spec's arithmetic.
>
> Rejected: "returns the same fine as before" with a call to the function as its own expected value. It can't fail, so it adds nothing.

The two accepted tests each catch a specific mutant. The rejected one catches nothing. That's the reason to check every addition, rather than counting them.

> **Aside: why coverage numbers mislead.**
> Coverage measures which lines ran during the tests. It doesn't measure whether the tests would notice a wrong answer. A suite can reach every line and still check nothing that matters, which is the pattern of the circular test in the previous chapter. A coverage percentage is a useful number for finding untested code. It isn't evidence that the tests are right.

## Try it

Take the suite you wrote for your spec. Ask the assistant to add tests for the gaps you found, using the request pattern above. Sort the suggested tests into three groups: caught a mutant the suite missed, caught nothing, and confirmed the code. Keep only the first group, and write one sentence on each rejected test. Save the sorted list in a file called `additions.txt` in your practice folder.

---
