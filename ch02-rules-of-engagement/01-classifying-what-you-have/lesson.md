# Classifying What You Have

Before you paste anything into an AI tool, you have to decide what it is. That sounds like a formality, and it's the step most often skipped. The policy's first rule is that all data is CONFIDENTIAL by default. So the question is never "is this secret?" It's "has this been cleared as non-sensitive?" If nobody has cleared it, treat it as confidential.

This step gives you four answers, and you'll use them throughout the course:

- **Allowed.** Nothing in it identifies a person, a client, a system, or a credential, and it contains no company information. A generic question about a programming language is an example.
- **Allowed after removing details.** The underlying problem can be shared once you replace the identifying details with placeholders. The policy's own example is a customer report where you use placeholders instead of names and account details.
- **Not allowed.** It contains customer data, credentials, personal information, confidential project details, or client code, and you can't meaningfully remove those details without losing what the item is.
- **Ask first.** The item is company information that isn't obviously sensitive, or it's something you can't classify with confidence. Ask your manager, or open a helpdesk ticket, before it goes anywhere near an AI tool.

## Client code and our own IP

The confidential-data rules protect two kinds of material. Client code and client data are the first. DataBank's own intellectual property is the second, and it's easy to overlook because nobody outside the company is involved.

DataBank's intellectual property includes:

- **Product source code.** DataBank product code is never delivered externally, and that rule is stricter than the one for custom project code. Pasting a product module into an AI tool to ask a question about it is a disclosure, even though you intended no harm.
- **Proprietary algorithms and internal datasets.** The policy says not to use proprietary algorithms or datasets without proper authorization. A clever internal method for matching records is proprietary, even if it is only a few lines long.
- **Unreleased plans.** Roadmaps, unannounced features, pricing ideas, and design sketches for products that haven't shipped.
- **Internal tools and their designs.** How an internal tool is built, what it calls, and how it is configured.

Third-party material is the other side of the same rule. A library's source code, a licensed dataset, or a paid course's examples may not be yours to paste anywhere. Asking how to use a public library is fine. Pasting its licensed source into a tool, or asking for a copy, may not be.

The question to ask is the one that matters most for IP: would a competitor, or someone outside the company, gain something from seeing this? If the answer is yes, and you can't describe the problem without it, the item is not allowed.

## Worked examples

Here are four items with the reasoning shown. Read the reasoning as carefully as the answer, because the reasoning is what you'll reuse.

**1. "How do I read a CSV file in C# and skip the header row?"**
Allowed. It's a general question about a language, with no company data, no names, and no systems. It would be the same question in any company.

**2. A stack trace from a production error, showing a server name, a customer account number, and the database connection string.**
Not allowed as written. The connection string is a credential, and the account number is customer data. The problem itself, an exception in a data import, might be askable. Once you remove the server, the account number, and the connection string, the rest of the trace is allowed after removing details. Keep the exception type, the method name, and the line of code. Replace everything else with placeholders.

**3. The database schema for an internal ticketing system.**
Ask first. A schema describes how a company system is built, and the policy treats internal system details as confidential. You might be allowed to share the general shape of a table with invented names. You can't decide that for yourself, so ask.

**4. A list of invented sample customers, with invented names and invented order totals, that you made for a practice exercise.**
Allowed. Nothing in it is real. The point of this step is to be sure of that, and that's why it's worth checking. If you wrote the data yourself and it matches nothing real, it's allowed. If you copied the names from a real list and only changed the numbers, it isn't.

## The check to run every time

Before you paste anything, ask yourself five questions in order. The first "yes" decides the answer.

1. Does it contain a name, an identifier, or a contact detail for a person?
2. Does it contain a credential, a key, a token, or a connection string?
3. Does it describe a client, a customer's data, or client code?
4. Does it contain DataBank product code, a proprietary algorithm, or an unreleased plan?
5. Does it describe an internal company system, process, or decision that nobody has cleared?

If any answer is yes, stop. Remove the details that cause it, and classify again. If you can't remove them without losing the question, the item is not allowed. If you're unsure about any of the five, it's an ask-first item.

## Try it

Sort these ten items into the four categories. Write your answers in a file called `classify.txt` in your practice folder, one line each, with the reason in a few words. Then check your answers against the answer key below, which is behind a spoiler. Don't open it until you've finished.

1. A question about how to format dates in JavaScript.
2. A pull request diff from a client's project, to help you understand a bug.
3. An error message from a public open-source library, with no company details.
4. Meeting notes from last week's planning meeting, which name a client and a budget.
5. A sample YAML file you wrote for a training exercise, with made-up service names.
6. A screenshot of a dashboard that shows an employee's name in the corner.
7. A draft of an internal announcement about a reorganization that hasn't been published.
8. A module of DataBank product source code, copied to answer a question about how it works.
9. A configuration file with a password in it.
10. A paragraph from a published company blog post that's already on the public website.

~~~spoiler
Answer key. Each answer includes the reason. Check your reasons as well as your categories.

1. Allowed. A general question about a language, with no company data.
2. Not allowed. It's client code, and the client's agreement decides who sees it.
3. Allowed. Nothing in it identifies anyone or anything at DataBank.
4. Allowed after removing details. Remove the client's name and the budget, and keep the planning content.
5. Allowed. Everything in it is invented, and that's the reason it's allowed.
6. Allowed after removing details. Crop the name out. If you can't do that cleanly, the screenshot is not allowed.
7. Ask first. It's an unpublished internal announcement, and nobody has cleared it.
8. Not allowed. Product source code is proprietary, and sharing it with an AI tool is a disclosure, even when the question is innocent.
9. Not allowed. A password is a credential, and no placeholder fixes that.
10. Allowed. It's already published, which is the clearance the policy asks for.
~~~

---
