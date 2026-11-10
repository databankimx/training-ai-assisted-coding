# Writing Acceptance Tests First

The strongest moment to write tests is before anyone writes the code. At that point the tests can't be shaped by the implementation, because the implementation doesn't exist yet. They can only come from the spec. A suite written first is a judge; a suite written afterwards is often a mirror.

This step covers that order: take the acceptance table, turn it into tests, and run them before the implementation is written. Every test should fail. If one passes before the code exists, the test is wrong, or the behavior it checks was never a requirement.

## From table to test

The acceptance table from Chapter 7 is already most of a test suite. Each row has an input and an expected output, and each error row has an expected error. The work is to give each row a name that states the rule, and to write it in the framework your team uses.

> Row: 4 days overdue owes 25 cents.
> Test: "25 cents per day after the grace period".
>
> Row: a negative number of days is an error.
> Test: "rejects negative days".

The name matters as much as the assertion. When the test fails, the name tells the reader which rule broke, without opening the code.

## The red run

Before the implementation exists, run the suite. Every test should fail. This is the red run, and it's the first real check on the suite.

A test that passes before the code exists is suspicious for one of three reasons. It might check a value that's always true, such as a non-negative fine. It might check something the spec never required. Or the placeholder implementation might happen to return the expected value. Each of those is a defect in the suite, and it's cheaper to find now than after the code is written.

Chapter 9, step 5 uses this order as a working method. For now, the rule is simple: do not write the implementation until the suite fails for the reasons the spec gives.

## What the tests should not do

Some habits make a suite worse, even when it's written from the spec.

**Don't copy the expected values from the implementation.** If the implementation is written later, its output is not a source of expected values, and any test that reads from it is circular.

**Don't write the tests to match a draft.** An early draft of the code is a guess. The tests should come from the spec, even when the draft seems reasonable.

**Don't add cases the spec doesn't require.** A test for a behavior nobody asked for becomes a requirement by accident, and it constrains the implementation for no reason.

## The error rows

Error cases need the same care as value cases, and they're the easiest to get wrong. A test that checks only that something throws can pass for the wrong error. A stronger test checks the kind of error the spec names, and the message if the spec names one.

> Weak: an exception is thrown.
> Stronger: an argument error that names the parameter is thrown.

## Try it

Take the acceptance table from your spec in Chapter 7. Write one test per row in your language, with a name that states the rule. Run the suite before writing any implementation, and record which tests fail and why. Save the suite and the red-run record in a file called `red-run.txt` in your practice folder.

---
