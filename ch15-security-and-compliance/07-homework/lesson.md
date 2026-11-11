# Homework: Security Review of a Generated Change

An assistant wrote a refund function from a short request: "add a refund for an order." It runs, and the first refund looks correct. Your job is to review it as a security reviewer would, classify each finding, write a fix for each one, and confirm the fixed function with the cases the rule requires.

Write your work in a file called `security-review.md` in your practice folder. For each finding, record the category, the line, the case that shows it, and the fix.

## The rule

A refund must be requested by the order's owner, for an amount greater than zero and no more than what is left on the order. A refund request must never write a payment card number to the log. A refused request is logged, as every request is, and the refusal is still a refusal.

## Run it

Press **Run** (or F5) on the starter and read every line. Compare each line with the rule.

The first refund is correct. The other three are not. Ben refunds Ana's order. Ana refunds a negative amount, which would add to the order. Ana refunds more than the order has left. And every line of the log shows a card number.

Read the code next. The defects are marked in the comments, but don't stop there. Find the line that causes each wrong result, and say which rule it breaks.

## Classify the findings

Use three categories. A finding can belong to one category, and some findings belong to more than one.

- **Authorization.** Who may do the action. A check that the caller is the owner belongs here.
- **Input validation.** Whether the values are allowed. A check that the amount is positive, and within what is left, belongs here.
- **Secret exposure.** Whether sensitive data reaches a place it shouldn't, such as a log, an error message, or a response. The card number in the log belongs here.

For each finding, write the category, and say why it isn't another category. A finding that you can't place in one of the three may be a finding you haven't understood yet.

## Fix each finding

Fix each one in the smallest change that makes the rule hold, and run again after each fix. Doing them one at a time means each run shows what one change did.

- The owner check: refuse any request whose caller is not the owner.
- The amount check: refuse an amount that is zero or negative, or more than what is left.
- The log: remove the card number. Log that a refund was requested, and by whom, without the card.

Press **Check** on the starter to see the mismatch. Then press **Run** on the solution. The solution keeps the log line but removes the card number, and it refuses every case the rule forbids. Compare the solution's output with the expected output.

## What to hand in

Your review should contain:

- **Each finding,** with its category, the line that causes it, the rule it breaks, and the case that shows it.
- **Each fix,** and the output after it.
- **A short paragraph** that answers two questions. Which finding would a team's standard review most likely miss, and which gate from the previous step would catch it? Which finding is the most serious, and why does the log finding still count, even though nobody can refund money through it?

---

~~~spoiler
Answer key. Your wording may differ, but each finding must name a category, a line, and a rule. The solution is one reasonable fix, not the only one.

**Finding one: the owner is never checked.** *Category: authorization.* The line `orders[orderId] = ...` runs for any caller. Ben refunds Ana's order because nothing compares the order's owner with the caller. The rule says the owner alone may refund. The case is Ben refunding order 1. The fix is a check that the caller is the owner, before any change is made.

**Finding two: the amount is never checked.** *Category: input validation.* The line `order.Total - amount` accepts any number. A negative amount increases the order's total, and an amount above what is left makes it negative. The rule says the amount is greater than zero and no more than what is left. The cases are minus five and fifty, after a refund of ten has already been made. The fix is a range check before the subtraction.

**Finding three: a card number in the log.** *Category: secret exposure.* The first line of the function writes a payment card number to the log on every request. Anyone who can read the log can read the card. The rule forbids it. The case is any request at all, since every line of the output shows the number. The fix is to log the request without the card, which is what the solution does. A log entry about the request is still useful, because it records who asked and for which order.

**Why the log finding still counts.** A reviewer might say that nobody can take money through the log, so the finding is minor. It isn't. A card number in a log is a stored copy of a secret in a place with weaker controls than the card system, and it can be copied, backed up, and read by people who should never see a card. The severity is about the exposure, not only about the money.

**The gate that would catch the owner finding.** Team review, against the spec, is the first gate. A reviewer who asks "who may call this?" finds it. Static analysis may also flag an unchecked caller, depending on the tool. The point of the gates is that one of them catches it when the author doesn't.

**Common mistakes.** Fixing the log and leaving the owner check, because the log looked like the most obvious problem. Classifying the owner check as "logic" rather than authorization, which hides it from the security review. Writing the amount fix as "greater than zero" alone, and missing the upper bound. Treating a refused request as a success in the log, which hides the refusal from the reviewer.

**What good work looks like.** A review where each finding has a category and a line, each fix is checked by a case, the log finding is taken seriously, and the paragraph names the gate that would have caught the owner finding.
~~~

---
