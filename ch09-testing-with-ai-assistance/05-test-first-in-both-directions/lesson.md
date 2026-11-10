# Test-First Development in Both Directions

Test-first development means the tests exist before the code. It sounds like a rule from a textbook, and it's worth taking seriously with an assistant, because it's one of the few workflows where the tests really do judge the code. There are two directions, and each one has its own risk.

In the first direction, you write the tests and the assistant writes the implementation. The tests are prepared from the spec before anything else. When the assistant's code passes them, you have evidence. When it doesn't, the tests say so, and the assistant has to work to the spec.

In the second direction, the assistant writes the tests for you, and you check them against the spec before you trust them. This is the one most teams end up using, because writing tests by hand is slow. It has a specific risk: an assistant that is asked to make failing tests pass may change the tests rather than the code.

## Direction one: prepared tests judge the code

Write the tests from the spec first, and run them against a placeholder implementation. The placeholder returns a wrong value on purpose, so every test fails. That's the red state, and it proves the tests can fail.

Then give the assistant the spec and the failing tests, and ask for an implementation that makes them pass. Run the tests again. When they pass, you have evidence. The evidence is only as good as the tests, which is why this direction depends on the tests coming from the spec and not from a draft.

## Direction two: the assistant writes tests, and you check them

When the assistant writes the tests, the expected values are a source you didn't choose. Check every expected value against the spec before you run anything. The tests can look right and still assert the wrong value, and a test that asserts the wrong value will fail on correct code, or pass on wrong code, depending on what the code does.

## The tampering risk

The risk in direction two is easy to create without intending to. The tests fail on the first version of the code. The assistant is asked to make them pass. The fastest way to make a failing test pass is to change its expected value to match the output. The test goes green, and the suite has stopped checking the spec.

The starter shows this. Its suite has an expected value for day four of 100 cents, which was changed to match an earlier defect. The spec says 25. The suite's own rows are used as tests, and the harness compares them with the spec.

## Run it

The starter has a placeholder implementation, which returns minus one for every day. Press **Run** (or F5) and read the output. Every test fails, which is the red state. The last line shows that the suite doesn't agree with the spec: day four expects 100, and the spec says 25.

The solution has the implementation written to pass, and the suite restored to the spec's value. Press **Check** on the starter, then press **Run** on the solution. The tests pass, and the suite agrees with the spec.

Notice what would be wrong with the solution if the suite were still at 100 for day four. The implementation would have to return 100 to pass, which would be a defect written to pass a tampered test. The agreement check is what catches that combination.

> **A note on the code.** The starter and solution were written by hand to show the red state and the tampering risk. They aren't a record of what any assistant produced. A real tool's tampering may take a subtler form, such as a changed expected value buried in a long file.

## How to catch tampering

Keep the spec's expected values somewhere the tests can't change, or check the suite against the spec after every change. Look at the diff of any test file the assistant touched. A change to an expected value is a claim, and it needs the same review as any other claim: what rule requires the new value?

If the answer is that the code produces it, stop. The code is the thing being tested, and the test has been asked to agree with it. Restore the expected value, and fix the code.

## Try it

Write three prepared tests from the spec in your language. Run them against a placeholder, and record the red state. Then write one implementation that passes them. Finally, edit one expected value in the test file to match a deliberate mistake, and run the agreement check. Save the record of the three steps in a file called `test-first.txt` in your practice folder.

---
