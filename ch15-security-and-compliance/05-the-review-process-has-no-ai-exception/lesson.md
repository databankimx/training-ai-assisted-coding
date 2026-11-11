# The Review Process Has No AI Exception

A generated change goes through the same gates as any other change. Team review, the standards checks, static analysis, and dependency scanning all apply, and none of them is waived because a model wrote the code. Chapter 2, step 4 described the delivery rules, and this step shows how the gates work on a generated change, and why the rule exists.

The reason is simple to state. The gates catch what a single author misses, and an assistant's output is a single author's output with no memory of the team's rules. A change that skips a gate because it "looks clean" is the change most likely to carry the defect the gate exists to find.

## The gates, in order

A generated change passes through the same sequence as any other.

1. **The author reads it.** The person who asked for the change reads every line before it goes into a change request. Their name is on it.
2. **Team review.** A colleague reads the change against the spec and the brief, and asks the questions from Chapter 8, including the security questions from this chapter.
3. **The standards checks.** Automated checks for the team's conventions, such as naming, structure, and the banned patterns in the standards file.
4. **Static analysis.** A tool reads the code without running it, and flags patterns such as unchecked inputs, unsafe calls, and suspicious comparisons.
5. **Dependency scanning.** Each package is checked for known vulnerabilities and for its license, as the previous step showed.
6. **The tests.** The team's tests and the acceptance examples from the spec.

Every gate produces a result, and the change cannot move forward while a gate has an open finding. A finding can be resolved by a fix or by a recorded decision, and the decision has an owner.

## What a gate catches that the author doesn't

An author reading a generated change sees what the change says. A gate sees patterns across the whole project, against rules written down in advance. Each gate has a different blind spot, which is why there are several.

> **Team review** catches a wrong assumption about how a caller uses the code, because the reviewer knows the caller.
>
> **Static analysis** catches an unchecked value passed into a sensitive call, because the tool reads every path, not only the one the author tested.
>
> **Dependency scanning** catches a package with a known vulnerability, because the scanner knows the advisory and the author may never have heard of it.

## Why "the tests pass" is not an exception

A passing test run is one of the gates, and it isn't a substitute for the others. The tests check the behavior someone wrote down. The gates check properties nobody wrote down: that a value is validated, that a package is licensed, that a secret isn't in the source. A generated change can pass every test and fail the static analysis, and the analysis is right.

> **Aside: why the gates are separate tools.**
> If one tool did everything, one blind spot would be everyone's blind spot. Separate gates with separate rules fail in different places, so a defect has to get past several of them to reach production. The defense works by overlap, and removing one gate for a class of changes removes the overlap for that class.

## What an exception would look like, and why it's refused

Some teams are tempted to make an exception for generated code, such as a faster path for small changes, or a lighter review when the author "checked it carefully". Those exceptions are refused, for three reasons.

- The author's check is not independent. The author wrote the prompt, accepted the output, and judged it, and each of those steps can share the same blind spot.
- An exception for a class of change becomes the path that changes take when the deadline is close. The most dangerous change is the one that feels too small for review.
- The gates produce records. A gate that was skipped produces no record, and the audit that follows can't show that the control ran.

## Try it

Take a change you made recently, real or invented, and list the gates it passed or would pass. For each gate, write one defect that gate would catch and the author might miss. Note any gate your team doesn't run for this kind of change, and what the risk of that gap would be. Save your list in a file called `gates.md` in your practice folder.

---
