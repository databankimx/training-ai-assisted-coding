## Summary: Security and Compliance

Some code decides who may see or do something, or protects a secret, or enforces a rule the law or a client requires. A generated version of that code can look complete and still allow what it should refuse. Specialists review it against a written requirement, and the review tests the boundaries and the refusals, not only the happy path. Generated changes go through the same gates as any other change, and the gates include dependency checks against an allow list. And generated code is never executed inside a loop or by a runtime evaluator.

These are the ideas to carry forward:

* **Test the refusals.** A rule that says "only the owner may read this" needs a case where someone else asks.
* **Read a compliance rule word by word.** "Older than 90 days" and "90 days or more" are different rules, and the boundary case shows which one the code follows.
* **Check every dependency's license before it's added.** A suggestion from an assistant is a question, not an approval.
* **Expect the gates to catch what the author misses.** Team review, static analysis, and scanning each have a blind spot, and the overlap is what protects you.
* **Keep execution out of the loop.** A string that is run as code can do anything the program can do, and no review sees it first.

### Check your understanding

*These questions are written for this course.*

```quiz
An order lookup checks that the caller is signed in, and returns the order for any signed-in user. Which test would best reveal the gap?
○ A request from an anonymous user, to confirm it is refused.
→ Not quite. That case tests the check that already exists. It can't reveal the missing one.
◉ A request by a signed-in user for an order that belongs to someone else, to confirm it is refused.
→ Right. The gap is the owner check, and only a case where the caller isn't the owner exposes it.
○ A request for an order that doesn't exist, to confirm the error message is clear.
→ Not quite. A missing order says nothing about whether the owner is checked.
```

```quiz
A rule says records older than 90 days are deleted. A record that is exactly 90 days old is in the table. What should the code do with it?
○ Delete it, because 90 days is the limit and the record has reached it.
→ Not quite. That is the reading of "90 days or more", which is a different rule from the one written.
○ Delete it, because a rounding error in the age calculation might make it look older.
→ Not quite. A rounding error is a defect to fix, not a reason to change the rule's boundary.
◉ Keep it, because the record is not older than 90 days, and the boundary case should be tested to show that.
→ Right. The written rule keeps a record at exactly 90 days, and a boundary test records which side the rule takes.
```

```quiz
An assistant suggests adding a package to a project, and the package has a copyleft license that is not on the team's allow list. What is the right next step?
○ Add the package, because the assistant suggested it and the suggestion solves the problem quickly.
→ Not quite. A suggestion is a question, and this one fails the team's rule before anything else is checked.
○ Add the package, and remove it later if a scan complains.
→ Not quite. Adding first and checking later leaves the license in the product, and the scan may never run.
◉ Hold the package, route it to review, and ask whether an approved package can do the same job.
→ Right. The allow list decides, and the review decides whether an exception is possible.
```

---
