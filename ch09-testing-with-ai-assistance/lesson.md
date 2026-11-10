# Testing with AI Assistance

A test is the one part of a project that is supposed to disagree with the code. It asks a question the code has to answer correctly, and it fails when the answer is wrong. An assistant can write tests quickly, and the tests it writes often look thorough. They have clear names, they cover several cases, and they pass. That's exactly why they need a reviewer.

This chapter is about using an assistant for tests without letting the tests become a mirror of the code. Chapter 5 gave you the rule that the expected value must come from the specification. This chapter applies that rule to the whole test suite.

## What you'll do

1. **Why generated tests look finished.** The ways a suite can pass and still prove nothing.
2. **Writing acceptance tests first.** Taking the acceptance table from the spec and turning it into tests before any code exists.
3. **Reviewing a generated test suite.** Checking a suite against the defects it's supposed to catch, using mutants: deliberately broken versions of the code.
4. **Extending coverage you wrote.** Using the assistant to add cases to a suite you've written, and checking what it adds.
5. **Test-first development in both directions.** Prepared tests that judge the assistant's code, and the assistant writing tests for you, with the risk that the tests change to match the code.

The homework is a suite with gaps. You find the gaps with mutants and add the cases that close them. The summary has three quizzes.

The tests in this chapter use a small harness that prints one line per test, so you can see the results without a test framework. Real teams use NUnit, pytest, or Jest, and the ideas carry over unchanged. The harness is here so that a result is visible in the runner.

---
