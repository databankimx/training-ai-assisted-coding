# Homework: Completing a Test Suite

An assistant wrote a test suite for the fines function. It has four tests, and they all pass on the function. Your job is to find out what the suite misses, close the gaps, and explain each added test by the mutant it catches.

The starter runs the suite against four mutants of the function, which are the realistic mistakes from the earlier steps. Each mutant is caught if any test fails for it. Some mutants are missed, and each missed mutant names a gap.

## The spec

The fines function charges nothing for the first three days after the due date. After that it charges 25 cents per day, up to a cap of 2000 cents. A negative number of days is an error.

## Run it

Press **Run** (or F5) on the starter and read the four lines. Two mutants are missed. The grace-period mutants change the boundary of the free days, and the suite never checks a day near that boundary.

Find the missing tests. For each missed mutant, write the test that would catch it, from the spec, before you look at the solution. Write it in the starter's style: a name that states the rule, and an expected value from the spec, not from the function.

Then press **Check** on the starter, and press **Run** on the solution. The solution adds two tests, one on each side of the grace period, and every mutant is caught.

Before you write your tests, check each one. Could the test fail for a mutant that the suite already catches? If yes, it's redundant, and it's worth dropping.

> **A note on the code.** The starter and solution were written by hand to show the gaps and the fix. They aren't a record of what any assistant produced. A generated suite will have its own gaps, and the mutant technique finds them the same way.

## What to hand in

Write your work in a file called `suite-gaps.txt` in your practice folder. For each missed mutant, write:

- **The mutant.** One sentence on the mistake it makes.
- **The gap.** The rule the suite didn't check, and why the existing tests missed it.
- **The test you added.** Its name and expected value, with the spec line that gives the value.

Then answer one question: if you had added a test on the cap boundary instead, would it have closed either of the grace-period gaps? Explain why or why not.

---

~~~spoiler
Answer key. Your test names will differ. What matters is that each added test has an expected value from the spec, and that you can name the mutant it catches.

**The gaps.** The two grace-period mutants are missed for the same reason: the suite has no test on either side of the free days. Day zero is tested, but day zero sits far from the boundary, and every grace mutant returns zero for it. A grace mutant that is one day long or two days short changes only the days near the boundary, so the suite has to check those days.

**Test one: the last free day.** Name: "zero within the grace period, on the last free day". Expected value: zero at day three, from the spec's rule that the first three days are free. This catches the mutant that is two days short, because at day three that mutant charges 25 cents.

**Test two: the first chargeable day.** Name: "25 cents on the first chargeable day". Expected value: 25 at day four, from the spec's rule that the fine is 25 cents per day after the free days. This catches the mutant that is one day long, because at day four that mutant charges nothing.

**Why the cap test doesn't help.** The cap test checks day two hundred, where every mutant that changes only the grace period still reaches the cap. Both grace mutants give 2000 at that point, so the cap test can't tell them apart from the correct function. A test has to sit where the mutants disagree, and the boundary of the free days is where they do.

**The redundant test.** A test that asserts the same value as an existing test, such as a second check that day zero costs nothing, adds to the count and catches no new mutant. The reviewer should drop it, and the note should say why.

**What good work looks like.** Each missed mutant is named, each gap is explained in terms of the rule, each added test has a spec-based value, and the redundant test, if you wrote one, is identified and removed.
~~~

---
