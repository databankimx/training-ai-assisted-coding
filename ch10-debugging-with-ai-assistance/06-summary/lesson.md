## Summary: Debugging with AI Assistance

Debugging with an assistant is an experiment. You describe what you observed, paste the output exactly, and form a hypothesis. A proposed fix is the hypothesis in code, and it's tested against cases that differ from the one it was built for. A fix that passes every case you tried can still break an invariant the code relies on, and the invariant is what the next input will test.

These are the ideas to carry forward:

* **Separate observation from suspicion.** Mark every guess, because an assistant reads a guess and an observation with equal weight.
* **Paste the exact output.** The numbers in a line often name the quantity that is wrong.
* **Read a fix as a claim.** Write down its assumption, and test an input that breaks the assumption.
* **Find the invariant.** Ask what the code needs to be true for its answer to mean anything, and check that input explicitly.
* **Test with a case you haven't used.** Rerunning the reported case confirms the fix for that case only.

### Check your understanding

*These questions are written for this course.*

```quiz
A report says "the totals are wrong." Which version gives the assistant the most useful starting point?
○ The totals are wrong, and I think the tax is being applied twice.
→ Not quite. The guess is useful as a hypothesis, but it's stated as a fact, and the report lacks the output that would test it.
◉ Observed: order 1042 shows a total of 84.50, and the line items add to 85.50. Expected: 85.50. Suspicion, unverified: tax may be applied twice.
→ Right. The observed output is exact, the expected value is given, and the guess is labeled as something to test.
○ Something is broken in the billing code since the update on Tuesday.
→ Not quite. A recent change is a useful condition, but without the numbers the assistant has nothing to test.
```

```quiz
A proposed fix passes the case it was built for, and fails two others. What does that tell you?
◉ The fix's claim is wrong for inputs outside its assumption, so it's a hypothesis that failed its test.
→ Right. A fix is a hypothesis, and failing cases are the test result that refutes it.
○ The fix is probably right, because it works for the reported case.
→ Not quite. The reported case is the one the fix was designed around, so it's the weakest evidence for the fix.
○ The other two cases are probably wrong, because the fix is correct.
→ Not quite. A test case that disagrees with a fix is evidence about the fix, and it should be examined before the case is discarded.
```

```quiz
A fix for a division works on every case you tried, including the reported one. Which check is most likely to find a remaining defect?
◉ Writing a case that breaks the invariant the division relies on, such as a divisor of zero, and seeing how the code fails.
→ Right. The invariant is the condition the fix assumes, and the case that breaks it shows the assumption the cases didn't test.
○ Running the same cases again, to confirm they still pass.
→ Not quite. Repeating the cases confirms only what they already showed.
○ Reading the fix once more, because the formula looks correct.
→ Not quite. A correct formula can still rely on an input it never checks, and reading it again won't reveal that.
```

---
