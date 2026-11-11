# Code That Leaves the Building

Everything in this course so far has been practice: invented examples, run on your own machine. Most of the code you'll write at DataBank is different. It may be a script that ends up in a client's environment, a change to a product integration, or a tool that a client will depend on for years. Once that code leaves the building, it becomes DataBank's support obligation.

The full rules are in [Development Rules of Engagement](development-rules-of-engagement.md), in this repository. This step covers the parts an AI-assisted developer is most likely to meet, and it doesn't replace that document. Read the full version before you deliver anything.

## Work starts with a quote

Custom development is billable professional services. Any work that needs custom code requires a development quote, and development leadership must approve that quote before it goes to anyone outside DataBank. A quote is the definition of done for the work, and it's the main defense against scope creep.

This applies to new code, changes to existing code, bug fixes that need code changes, and reviews or repairs of client-created code. It applies even when the change looks small. A fix that an AI tool produced in five minutes still needs a quote, because the cost is the support it creates, not the time it took to write.

## Source control comes before delivery

Custom code must be in the correct DataBank GitHub Enterprise repository before it reaches a client, whether the client gets source code, binaries, or deployed functionality. If you're not on the development team and don't have direct access, the development team takes the code into the repository, normally before or during review.

Keep secrets, credentials, customer data, and environment-specific values out of source control. If one of them has already been committed, report it. Don't just delete it and hope nobody noticed.

## Review is interactive

Every piece of custom code is reviewed before delivery, and the review is a conversation. The reviewer checks that the code works, meets the standards, can be maintained, and that you understand it well enough to explain, debug, and support it. A reviewer should not approve code because it compiles or looks neat.

The rules are direct about AI-assisted code. It needs the same review as code you wrote by hand. Polished output is not evidence of correctness. "The AI wrote it" is not an acceptable explanation for a production problem, a failed review, a security finding, or a support call. You own the code you deliver.

## Automated scans must pass

Three checks are required before delivery: the standards policy scan, SonarQube, and Snyk. Each catches a different kind of risk. A passing local build is not a substitute for any of them, and delivery does not bypass them.

## Dependencies need a license check

Before you add a third-party or open-source dependency, confirm that its license allows closed-source commercial use, and that it doesn't carry unacceptable security risk. Copyleft or unclear licenses must be escalated before use. The rules say directly that dependencies must not be added simply because an AI tool suggested them. That's the case where an assistant is most likely to lead you wrong, because it has no view of your license policy.

## The AI rules that apply to code

The rules restate the policy for AI-assisted work. Use only approved tools and company accounts. Keep confidential material out of unapproved systems. Treat AI output as untrusted until you've reviewed it. Verify generated code against the real dependencies and APIs. And never execute AI-generated code at runtime as a shortcut around the normal review, source control, and CI process. Chapter 14 covers why that rule exists, and Chapter 15 covers the review that goes with it.

## Try it

Imagine you've been asked to write a small script that a client will run in their environment, and you plan to get most of it from an AI tool. Write a checklist in a file called `delivery-checklist.txt` in your practice folder. It should list, in order, every step the rules require before the script reaches the client. Then compare your list with the delivery readiness checklist in section 15 of the development rules. Did you miss any items? Which items would you have been tempted to skip, and why?

---
