# Security and Compliance

Chapter 2 covered what must not leave the company. This chapter covers what must not be wrong in the code itself. Some code can fail in ways that don't crash, don't fail tests, and don't look unusual, and the cost of the failure falls on someone else: a customer whose data was read, an auditor who finds a missing control, or a company that ships a library with a license it can't use.

An assistant is good at producing code that looks complete. For security and compliance, looking complete is the least useful property, because the failure modes are about what the code allows, not about how it reads.

## What you'll do

1. **Security-sensitive code.** The categories that people write, specialists review, and an assistant should not write without that review.
2. **Authorization: who may see what.** Runnable: an order lookup that checks the user is logged in, but not that the order is theirs.
3. **Compliance-sensitive logic.** Runnable: a retention rule that deletes records on the wrong side of its boundary.
4. **Dependency hygiene.** Runnable: a license check that flags a copyleft dependency before it's added.
5. **The review process has no AI exception.** How generated changes reach the team's checks.
6. **Never run generated code through an agent.** A short reminder of Chapter 14, applied to security.

The homework reviews a generated change, classifies each finding, and writes a fix for each one. The summary has three quizzes.

The runnable steps check behavior with the same harness as earlier chapters. None of them shows a working attack. Each shows a rule being kept or broken, and a line for each case says which.

---
