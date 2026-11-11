# Security-Sensitive Code

Some code decides who is allowed to do what, or protects what must stay secret. A bug in an ordinary feature annoys a user. A bug in this kind of code can expose another person's data, let someone impersonate a customer, or leave a secret readable by anyone with access to the repository.

Such code is written by people, reviewed by specialists, and tested against a written requirement. That's the rule for this chapter, and it applies whoever or whatever wrote the first draft.

## The categories

Five categories cover most of the code that needs a specialist's review.

**Authentication.** Proving who a user is. Signing in, checking a token, verifying a session.

**Authorization.** Deciding what an authenticated user may do or see. Chapter 8 showed a check that confirmed the user was signed in and not that the order was theirs.

**Cryptography.** Hashing, encrypting, signing, and generating keys and random values. Some of its mistakes look right in a test, because the output is still a string of letters and numbers.

**Secrets handling.** Where passwords, keys, and connection strings live, how they're loaded, and whether they reach logs, error messages, or source control.

**Input handling at trust boundaries.** Any place where data from outside, such as a request, a file upload, or a message from another service, is parsed or used to build a query, a command, or a path.

## Why the generated version looks right

Generated security code tends to look complete. It has the right names, the right library calls, and the usual structure. The failure is in what it allows, and that is invisible to a read-through that asks only whether the code looks like code that does security.

> **Looks right:** a function that checks a token, returns the user's data, and handles the error.
>
> **What to ask instead:** who may call this, against which record, and what happens when the token is valid for a different user than the record's owner.

The first question is about appearance. The second is about the rule, and the rule is what the specialist checks.

## Three ways a generated version goes wrong

**It uses a pattern from a tutorial.** Tutorials show the simplest correct-looking version. The simplest version often omits the check a real system needs, such as a limit on attempts, a comparison that takes the same time whatever the input, or a choice of algorithm that's out of date.

**It fills a gap with a default.** When the spec doesn't say what happens for an unknown user, the generated code picks something, such as treating the request as anonymous, or returning the record. The default is a security decision, and nobody made it.

**It builds a value from input.** Joining user input into a query, a path, or a command is a common generated pattern, and it's the one that lets an outside party change what the program does. Chapter 8 showed the same habit in a different form.

> **Aside: why the reviewer is a specialist, not just a second developer.**
> A developer who reads a change can check whether it does what the spec says. A security specialist asks what an attacker can make it do, and what the spec forgot to forbid. Those are different questions, and the second one needs training that most developers don't have. That's why the rule says specialists, not "another pair of eyes."

## What this means for an assistant

An assistant can help with this kind of code in the places where it is strongest: explaining a concept, listing the questions a reviewer should ask, and writing a test from a stated rule. It should not be the author of the rule itself, and it should not be the only source of the design. The design belongs to the people who answer for it.

When a team sees a generated security change, the first step is to route it to the specialist, not to test it and accept it on a green result.

## Try it

Choose a feature in your work that touches one of the five categories. List the decisions its generated version would make by default, without asking anyone. For each default, write the question a specialist would ask, and who in your organization you would route it to. Save your list in a file called `security-defaults.txt` in your practice folder.

---
