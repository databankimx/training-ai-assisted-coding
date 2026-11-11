# Authorization: Who May See What

Authentication answers "who are you?" Authorization answers a second question that comes after it: "may you have this?" The two are easy to confuse, and generated code often gets the first right and the second missing. The code checks that someone is signed in, and then returns whatever record was asked for.

This step shows the difference with a run. The rule is simple: a user may read only their own orders. The lookup has to enforce it on every request.

## Three checks that look like one

Here are three versions of the same request, each with a different check.

> **Check A: is anyone signed in?** The lookup refuses an anonymous request. This is authentication, and it's necessary.
>
> **Check B: does the order exist?** The lookup returns "not found" for an order that isn't there. This is correct, but it tells the caller whether an order number exists, which is a small disclosure to weigh.
>
> **Check C: does the order belong to this user?** The lookup refuses an order whose owner is someone else. This is authorization, and without it, any signed-in user can read any order by changing the number in the request.

A lookup that performs checks A and B looks complete. A reviewer who sees both checks may approve it, and the flaw is the one check that isn't there.

## Run it

The starter has a lookup with two orders. Ana owns order 1, and Ben owns order 2. Press **Run** (or F5) and read the four lines.

The first line is correct: Ana reads her own order. The second is the failure. Ben, who is signed in, reads Ana's order and sees its total. The third line shows that the anonymous check works. The fourth shows a missing order.

The expected output refuses Ben's request. Press **Check** on the starter to see the difference. Then press **Run** on the solution, which adds check C, and the cross-user read is refused.

> **A note on the code.** The starter and solution were written by hand to show the rule. They aren't a record of what any assistant produced, and the cases are chosen to show the failure, not to prove the lookup is safe. A real test suite would include more users, more orders, and requests that try every field.

## What the failing case shows

The failure is in a case that uses a valid signed-in user and a real order. A test that only uses Ana, reading her own order, passes. A reviewer who checks only the happy path would approve the lookup.

The case that breaks it is the one with a different user and the same order. That's the case to write first for any access rule: the user who should be refused, asking for the thing they shouldn't see.

## Where the check belongs

The check belongs next to the data access, so that every path to the record passes through it. A check placed only in the screen that shows the order is a check on one path, and another path, such as an export or an API, may skip it.

> **Aside: why the check is about the record, not the request.**
> A request says who is asking and what they want. The rule is about the relationship between the two and the record. A lookup that checks the request's user but never looks at the record's owner has checked half of the rule. The owner is a fact about the data, and the lookup must read it on every call.

## Try it

Choose a record in your own work that has an owner, such as an order, a document, or a ticket. Write three test cases: the owner reads it, another signed-in user reads it, and an anonymous request reads it. Write the expected result for each before you check any code. Save the cases in a file called `access-cases.txt` in your practice folder, and note which case would be easiest to forget.

---
