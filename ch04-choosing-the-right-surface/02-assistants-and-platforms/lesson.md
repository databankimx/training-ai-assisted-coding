# Coding Assistants and AI Platforms

Two kinds of AI product get confused constantly, and the confusion causes real problems. Both use models. Both can produce text and code. They do different jobs, and they sit in different places in your work, so they follow different rules.

## Coding assistants

A coding assistant helps you write software. It works in your editor, your terminal, or a chat window, and it helps with the development process: writing functions, explaining code, suggesting tests, and proposing fixes. Its output goes into your source code. You review that output, commit it, and deliver it as you would any other change.

The thing that matters most is where the model's output ends up. It ends up in code you then own. The development rules apply to that code in full, including review, source control, and the required scans. The assistant is a tool you use while writing. It isn't part of the product.

## AI platforms

An AI platform is a service that a product calls while it runs. Think of a support tool that summarizes a customer's history before showing it to an agent, or a feature that drafts a reply from a template and a set of records. The model is part of the product's behavior, and the product sends it data every time a user triggers the feature.

The thing that matters most here is where the data goes. Every call sends data to a service at run time, so the data that a feature sends, and the service's terms for handling it, become part of the product's design. Building one is a development project with the same obligations as any other custom code: a quote, a review, source control, the scans, and an approval for any vendor you add.

## Why the difference matters

Suppose you use a coding assistant to write a function that summarizes customer records, and you paste a sample record into the chat to show the format. You've shared customer data with an AI tool, and the policy from Chapter 0 applies. That's a classification problem.

Now suppose you build a feature that sends customer records to an AI platform every time a user opens a screen. The data flows through your product, to a vendor, on every use. That's a design problem, and it needs an approved architecture and review, not only a careful prompt. It's also code that leaves the building, so Chapter 2, step 4 applies.

The same model can sit at the end of both. The rules differ because the position in your work differs.

## The check

When you meet a new AI product, ask where its output goes. If it goes into your code, which you review, commit, and deliver, it's a coding assistant, and the rules for assistant use apply. If your code calls it at run time, passing it data each time, it's a platform, and the development rules for custom code apply. Many products are both, so ask about each use separately.

> **Aside: why the confusion is so common.**
> Both kinds of product are sold with similar words, use similar models, and often come from the same vendor. A demonstration that writes a function and a demonstration that answers a customer look almost the same on screen. The difference is invisible until you ask where the output goes and what happens to the data on the way. That's why the question is the first thing to ask, not the last.

## Try it

Think of two AI tools you've used or heard about. For each, decide whether it's a coding assistant, a platform, or both in the way it's commonly used. Write your answers in a file called `assistant-or-platform.txt` in your practice folder, with one sentence on the question you asked to decide each one.

---
