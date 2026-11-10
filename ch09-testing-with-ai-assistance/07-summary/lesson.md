## Summary: Testing with AI Assistance

A test suite is a claim that the code would fail for wrong answers. A generated suite often passes on wrong code, because its tests check easy values, compare the code with itself, or check that something happens rather than what. The way to check the claim is to make the code wrong on purpose, with mutants, and see whether the suite notices. Tests written from the spec, before the implementation, are the strongest form of this check.

These are the ideas to carry forward:

* **Passing is the weakest result a test can give.** Ask of each test which wrong code it would reject.
* **Write the tests from the spec, and run them before the code.** A test that passes before the code exists is suspect.
* **Mutants measure the suite.** A missed mutant names a gap, and the gap names the test to add.
* **Extend with the spec, not the code.** Reject added tests that confirm the code, that repeat an existing check, or that can't fail.
* **Watch for tampering.** A test whose expected value was changed to match the output has stopped checking the spec.

### Check your understanding

*These questions are written for this course.*

```quiz
A generated test checks that the fine for ten days is equal to the fine for ten days. What is the most accurate description of this test?
○ A strong test, because it checks that the function is deterministic.
→ Not quite. Determinism matters, but this test passes for any function that returns the same value twice, including the wrong one.
◉ A circular test, because its expected value comes from the code, so it can't tell a right answer from a wrong one.
→ Right. A test whose expected value is produced by the code under test can't fail for a wrong answer.
○ A boundary test, because ten days is near the grace period.
→ Not quite. Ten days is not on the boundary, and the test doesn't compare the code to any requirement.
```

```quiz
A reviewer runs a suite against three mutants, and the grace-period mutant is missed. What should the reviewer do next?
○ Accept the suite, because most mutants were caught.
→ Not quite. A missed mutant is a specific gap, and the count of caught mutants doesn't close it.
○ Delete the grace-period mutant, because it is unrealistic.
→ Not quite. The mutant describes a realistic mistake, and deleting it hides the gap rather than closing it.
◉ Ask which test would fail if the mutant were real, and write a spec-based test on the boundary where the mutant differs from the correct function.
→ Right. The missed mutant names the gap, and a test on the boundary, from the spec, is what closes it.
```

```quiz
An assistant, asked to make a failing test pass, changes the test's expected value to match the output. Which check would catch this?
◉ Comparing the suite's expected values with the spec, and reviewing the diff of any changed expected value.
→ Right. A changed expected value is a claim that needs a rule, and the spec is the source for that rule.
○ Running the suite again, because the tests will now pass and the problem is solved.
→ Not quite. Running the suite again confirms the change, and the change is the problem.
○ Reading the test names, because a renamed test would reveal the change.
→ Not quite. The names can stay the same, so the name check misses the change.
```

---
