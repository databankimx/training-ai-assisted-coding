# Grey Areas

Most cases are easy once you've practiced. Some aren't. The policy sets a default, that data is confidential until it has been cleared, and it names several examples. It can't list every case, and some of the most common questions fall between its examples.

This step gives you a method for those cases. It doesn't give you a rule to memorize, because the cases will keep changing. Learn the method, and you'll handle the next case you haven't seen.

## The method

Ask three questions, and write down the answers. Writing them down matters, because it slows you down enough to notice what you assumed.

1. **Who could be identified, and by what?** Look for names, faces, account numbers, badge numbers, email addresses, and anything that points at one person, even indirectly. A job title in a small team can identify someone.
2. **What could someone do with it if it reached the wrong place?** A general question about a sorting algorithm does no harm. A system diagram with an internal address gives someone a map of a network.
3. **Has anyone with the authority to clear it cleared it?** Only an explicit clearance from the Information Security team counts, and so does an earlier approval that clearly covers this kind of item. Publication alone doesn't count, and neither does a policy example. Your own belief that something is probably fine doesn't count either.

If the answers to questions 1 and 2 are "nothing" and "very little," and question 3 is covered by an existing clearance, the item is usually allowed. If any answer is unclear, the item is ask-first.

## Four cases the policy doesn't settle directly

**An anonymized log.** You've replaced every name and number with a placeholder, but the log still shows a sequence of events that only one internal system produces. Question 1 looks clean. Question 2 is the one to think about. The sequence describes how an internal system behaves, so treat it as a system detail, and ask first unless the same sequence appears in public documentation.

**A screenshot with a name in the corner.** The screenshot is of a public tool, but a person's name appears in the corner of the window. You can crop the name out. If you can't crop it cleanly, or the screenshot shows anything else internal, don't use it.

**A question about a product you use.** A question such as "why does this setting behave differently in version 3?" about a commercial product is usually allowed. It contains no company data, and public documentation covers the product. The question becomes ask-first if you add details of how your company has configured it.

**A piece of code you wrote for a client, rewritten with invented names.** The code's logic is the client's work, even with the names changed. Question 3 is the one that matters here. Client code is not allowed, and changing the names doesn't clear it. If you need help with the logic, describe the problem in general terms without the code, and ask whether the rest is allowed.

## When to stop and ask

Stop when any of these is true:

- You can't answer one of the three questions without guessing.
- The item came from a client, and you don't know whether the client's agreement allows you to share it.
- You're tempted to paste it because the AI tool is "probably fine" or "approved for something similar."
- You feel rushed. The rules count time pressure as no reason to skip a check.

Asking is the right response in each of these cases. A question to your manager or a helpdesk ticket takes minutes. A disclosure you can't take back can take much longer to deal with.

## Try it

Take the four cases above, and write your answers to the three questions for each one in a file called `grey-areas.txt` in your practice folder. Don't classify them yet. Write the answers to the three questions first, then decide. Then pick one of your own from work, anonymize it in your head, and run the three questions on it. Write down the answer, and whether you'd ask first.

---
