# Confidential Data and Company Accounts

This is the most important step in the chapter. Everything else in the course assumes you have understood it. The company's AI Acceptable Use Policy is the full set of rules. This step explains the parts you'll use every day, in plain language. It doesn't replace the policy, and you should read the full version: [AI Acceptable Use Policy](https://workforcenow.adp.com/mascsr/wfncontenttools/file-management/file/JTJGc3RhdGljJTJGY2xpZW50cyUyRmNvbnRlbnQlMkZBSStBY2NlcHRhYmxlK1VzZStQb2xpY3kucGRmJTNGMTc3MTM0NzA4NjE4MQ==).

## The main rule: treat everything as CONFIDENTIAL

The policy starts from one assumption: **all data is CONFIDENTIAL by default**. That applies to data that seems harmless, data you think is public, and data you're not sure about. Unless someone has explicitly cleared a piece of information as non-sensitive, treat it as confidential.

This is the reverse of how most people think. We tend to assume something is fine until we see a reason it isn't. The policy asks you to assume the opposite. If you're not sure, the answer is to leave it out, or to ask.

## What the policy asks of you

Here are the parts that matter most when you're using an assistant:

- **Use approved tools only.** AI tools are approved by IT. Access to approved tools is granted by your manager.
- **Use company accounts for company work.** Personal accounts are not for company-related work.
- **Don't enter customer data, passwords, or confidential project details** into any public or unapproved tool.
- **Use placeholders or general descriptions** when you need to describe a problem that involves sensitive details.
- **Don't use a new AI tool until IT has approved it.** If you find one you'd like to use, ask your manager, and your manager will route the request to IT for review.
- **Report problems immediately.** If you think sensitive data went into a tool it shouldn't have, or an AI output caused a problem, report it to IT and Information Security through the helpdesk. Don't wait to see whether it gets better.

Violations can lead to disciplinary action. The policy says so, and it's worth taking seriously, because the consequences are real.

## What counts as confidential

The policy describes the categories, and you'll need to recognize them in your own work:

- Customer names, account details, and anything else that identifies a customer
- Passwords, keys, tokens, and connection strings
- Confidential project details, including plans, designs, and unreleased features
- Proprietary business logic and internal system details that outsiders should not see

Notice the last item. Even a description of how an internal system works can be sensitive. A question like "why does our document import fail on this server?" may reveal more than you intend.

## Rewriting a prompt safely

Here's the move you'll make over and over. Suppose you want help with a bug. The first version of your question contains details that shouldn't leave your organization:

```text
Our customer Acme Corp's invoices fail to import on server PRD-DB-07. The connection string is set to the production account. Why?
```

The safe version keeps the problem and removes the identifying details:

```text
A document import fails for a customer record with a long company name. The import service runs on a shared database server. Which common causes produce this kind of failure, and how would I check each one?
```

The second version is still useful. It describes the shape of the problem, and the assistant can help you reason about it. It doesn't include a customer, a server name, or a credential. That's the pattern: keep the structure, remove the specifics.

## Practice data for this course

Every exercise in this course uses invented or sample data. You don't need company code to learn the techniques, and you should never paste company code into an AI tool while working through the course, even if the tool is approved. If you find yourself wanting to use a real project, stop and rewrite the example with sample data first.

## Where to go with a question

If you're not sure whether something is allowed, don't guess. Leave it out of the prompt, and ask. The helpdesk is the right place for questions about tools and data, and your manager is the right place for questions about access. The full contact details are on the employee portal, so you'll always have the current ones.

## Try it

Take the following prompt and rewrite it so it is safe to send to an approved AI tool. Keep the problem, and remove or replace anything that identifies a person, customer, server, or credential:

```text
John Smith in Finance says our payroll export for the Dallas office crashes when the password field has a hash sign. The export script is at \\fin-share\payroll\exports\run.ps1. Can you fix it?
```

When you've finished, compare your version with the rule: keep the structure, and remove the specifics. There's no single right answer, but a good rewrite won't contain a person's name, a server path, or a password field value.

~~~spoiler
Here's one way to rewrite it:

```text
A nightly export script fails when a password field contains a special character. The script runs from a shared network folder. What are the likely causes, and how would I test each one?
```

The rewrite keeps the problem: an export fails when a password contains a special character. It removes the person's name, the office, the server path, and the actual password value. The structure is still there, so the assistant has enough to reason about.
~~~

---
