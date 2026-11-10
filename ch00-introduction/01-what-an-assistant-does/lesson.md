# What an Assistant Does When It Writes Code

When you ask an AI assistant for a function, it doesn't open a reference book, run a test, or check the library documentation. It writes an answer one small piece at a time, and each piece is chosen because it is a likely next piece, given everything before it. That's the whole trick. Everything else in this course is a consequence of it.

## Text in, text out

A **language model** is a program that has learned patterns from a very large amount of text. Some of that text was code, and some of it was documentation, forum posts, and explanations. When you send a message, the model reads your text and predicts what should come next.

The pieces it works with are called **tokens**. A token is a chunk of text, often a word, part of a word, or a symbol such as a bracket or a semicolon. Your question is broken into tokens, and the model writes its answer one token at a time. Each new token is chosen based on the tokens that came before it.

That is why an assistant can produce a plausible-looking method in a few seconds. It is not reasoning from a list of facts about your project. It is continuing a pattern, and the pattern it learned came from millions of examples of real code.

## Why "completion" is the right word

Developers often call this **completion**, because the model completes the text you started. Type `public static int Add(` into an editor with an assistant running, and the assistant predicts how the rest of that line is likely to continue.

Completion works well when the pattern is common. Adding two numbers, reading a file, or sorting a list appear in millions of examples, so the predicted code is usually right. It works less well when the pattern is rare, specific to your company, or depends on a version of a library the model never saw.

> **Aside: why the answer sounds so sure.**
> The model was trained to predict text that looks like the text it has read. Most of that text is written in a confident, tidy style, because explanations and documentation are usually written that way. The model learned the style along with the content. So a wrong answer and a right answer often arrive in the same calm tone. Confidence is a feature of the writing, not a measure of how true the writing is.

## What the model does not do

The assistant does not check its answer against your compiler. It does not look up the method you're calling. It does not know what version of a library your project uses, unless you tell it. It does not know whether a method name changed last year.

Some tools add extra steps around the model. They may search your files, run a build, or read documentation. Those steps are useful, and later chapters cover them. But the underlying model still produces text by prediction, and the checks still have to come from you.

## Try it

Ask an AI assistant two questions, using only public, general information:

1. A question you know the answer to, such as how to print "Hello, world!" in Python.
2. A question about a specific library version you are not sure about.

Compare the two answers. Notice whether the tone changed between them. If it didn't, you've just seen the aside above in action.

---
