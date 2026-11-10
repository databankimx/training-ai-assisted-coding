# Reviewing a Generated Test Suite

A test suite is a claim about the code: these tests would catch the wrong code. You can check that claim without reading the code at all, by making the code wrong on purpose. A deliberately broken version of the function is called a mutant. A suite that catches every mutant is doing its job. A suite that misses one has a gap, and the gap is named by the mutant it missed.

This technique is called mutation testing, and it's the most useful review you can run on a generated suite. It answers the question the reviewer actually needs answered: would these tests notice a real mistake?

## What a mutant is

A mutant is the code with one small, realistic change. The change should be the kind of mistake a person or an assistant would make. Common mutants are an off-by-one in a boundary, a missing check, a removed limit, and a value swapped for another.

The three mutants in this step are the mistakes the fines function is most likely to make:

- **Grace period one day long.** The boundary is off by one, so the fine starts a day late.
- **No cap.** The limit is missing, so large overdue periods cost more than the maximum.
- **No error.** The negative-days check is missing, so a bad input is accepted.

## Run it

The starter has a generated suite of four tests, run against each mutant. Each mutant is caught if any test fails for it. Press **Run** (or F5) and read the three lines.

The grace mutant is missed. Every test in the starter suite passes on it, because the suite never checks a day on the boundary. The cap and the error mutants are caught, because those tests check a value and an error that the mutants change.

The expected output is what a suite written from the spec produces. Press **Check** on the starter to see the mismatch, then press **Run** on the solution. The spec suite checks day three and day four, which sit on each side of the grace period, and it catches all three mutants.

> **A note on the code.** The starter and solution were written by hand to show the mutants. They aren't a record of what any assistant produced. Use the same technique on your own suite: make the code wrong in a realistic way, and check whether the suite notices.

## What a missed mutant tells you

A missed mutant is a specific gap, not a general sense that the suite is weak. It names the behavior nobody checks. The grace mutant is missed because no test checks a day on the boundary, so the review's next question is always the same: which test would fail if this mutant were real?

If you can't answer that, the suite needs a test. If you can, and the suite still misses the mutant, the test has the wrong expected value.

## A reviewer's checklist for suites

- For each rule in the spec, is there a test that fails if the rule is broken?
- Does each boundary have a test on both sides?
- Does each error the spec names have a test that checks the error, not only that something happened?
- Does every test name a rule, so a failure says what broke?
- Would at least one test fail on each realistic mistake you can think of?

## Try it

Write three mutants of your own for the spec you wrote in Chapter 7. Each one should be a realistic mistake, and it should differ from the three in this step. Run your suite against each one, and record caught or missed for each. For any missed mutant, write the test that would catch it. Save the mutants and the results in a file called `mutants.txt` in your practice folder.

---
