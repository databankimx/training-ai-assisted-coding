# From Prototype to Production

A prototype proves an idea can work. Production means someone relies on it, and when it fails, someone has to explain why. Assistants make prototypes very fast, and that speed is the trap. A prototype that took an afternoon looks finished, and the pressure to ship it grows with the speed of its making.

The gap between the two is a list of specific things, and each one has a gate in the course.

## What a prototype usually lacks

**A spec.** The prototype was built from a conversation. Production needs a written spec with the rules, the errors, and the acceptance examples, as Chapter 7 required.

**Tests that judge it.** A prototype is often checked by running it and looking. Production needs tests written from the spec, and a suite that catches the boundary cases, as Chapter 9 required.

**A review.** The author has read the code, and the author is the one most likely to miss what the author assumed. Production needs a second reader against the spec, as Chapter 8 required.

**Its dependencies checked.** A prototype pulls in whatever packages were quick. Production needs each license and each known vulnerability checked, as Chapter 15 required.

**Its errors designed.** A prototype prints an exception and carries on. Production needs each failure to have a defined behavior, a message, and a log line that can be read.

**Its data handled.** A prototype uses sample data and a local file. Production needs the real data's rules applied: where it's stored, who can read it, and how long it's kept, as Chapter 2 and Chapter 15 required.

**An owner.** A prototype has a maker. Production has a person who answers for it when it breaks, and who can say what it's for.

## Walk the gap in order

The gaps are not equally urgent, and the order matters. Close them in the order the team's gates need them, not in the order they're easiest.

1. **Write the spec first.** Everything else checks against it, so it comes before the tests.
2. **Write the acceptance examples and tests from the spec.** The prototype's behavior is compared with the spec, and any difference is a finding.
3. **Review the code against the spec.** A reviewer reads the prototype with the spec open.
4. **Check the dependencies, data, and errors.** These are the gates from Chapter 15, and they can stop a release on their own.
5. **Name an owner, and write down what it's for.** Without this, the first incident has no one to call.

Skipping to step five, because the prototype works, is the most common way a prototype reaches users without the rest.

## An example of the gap

A prototype answers questions about shipping costs for a small shop. It works, and the shop's staff use it. Here is what production would add, and what would go wrong without each step.

> **Spec:** Without it, nobody can say whether the answer "forty-two cents" is right, because nobody wrote down the rule.
>
> **Tests:** Without them, a change to the tier table can break a customer's quote and no one notices.
>
> **Review:** Without it, a unit mistake in the weight conversion stays until a customer disputes a bill.
>
> **Dependencies:** Without a license check, a library the prototype pulled in may not be usable by the company.
>
> **Errors:** Without a defined error, an unknown weight shows the staff a stack trace, and they guess the price.
>
> **Owner:** Without a name, the first failure is reported to no one.

Each line is a gap the prototype didn't need to close to answer its question, and each one matters the moment a customer depends on the answer.

> **Aside: why a working prototype hides its gaps.**
> A prototype is judged by whether it works on the cases its maker tried, and those cases are the ones the maker thought of. The gaps are in the cases nobody tried, the rules nobody wrote, and the failures nobody designed for. Working on the common path is exactly what a prototype is for, and it's exactly what production can't rely on.

## Try it

Take a prototype from your work, or invent one. List what it lacks in the seven categories above, and mark each gap as closed, open, or not needed, with a reason. Then pick the first gap you would close, and write the step from the walk-through that closes it. Save your list in a file called `prototype-gaps.md` in your practice folder.

---
