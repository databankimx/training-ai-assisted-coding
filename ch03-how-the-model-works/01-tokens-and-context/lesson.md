# Tokens and Context

When you send a message, the assistant doesn't read it the way you do. It reads a sequence of tokens. This step explains what those are, and what follows from the fact that the assistant can only work with a limited number of them at a time.

## What a token is

A **token** is a piece of text the model treats as a single unit. It's often a whole short word, such as `print`, but it can be part of a longer word, a space, a punctuation mark, or a fragment of code. The exact split depends on the model, so the same sentence can produce different token counts in different tools.

Some examples show the idea. The word `print` is usually one token. The word `unhappiness` might be split into two or three. A line such as `print("hello")` is several tokens: the function name, the opening bracket, the string, and the closing bracket, possibly with a space in there too.

A rough rule for English prose is that a token is about three or four characters. For code, the ratio varies. Symbols, brackets, and unusual names take more tokens than ordinary words. The rule is only an approximation, and you don't need to count tokens by hand. You need to know that the count exists, and that it limits what fits.

## The context window

The **context window** is the amount of text the model can work with at one time. It holds everything the assistant can see: your messages, its earlier answers, any files or documents you've attached, and any instructions the tool adds. The window has a fixed size. If the conversation grows beyond it, something has to give.

Think of the window as a desk. You can put a lot on it, but not everything. When the desk fills up, something has to come off, and the tool decides what to take.

> **Aside: why the desk has a limit.**
> The model's attention works across every token in the window at once. The more tokens there are, the more work each new token needs, and the more the model has to weigh one part of the conversation against all the others. Larger windows exist, and tools keep increasing them, but the principle doesn't change. A window is a finite budget, and every token inside it competes for the model's attention.

## What happens when the conversation is long

When a conversation gets long, the tool may drop or summarize the earliest messages to make room. The assistant then answers from what's left. It doesn't tell you that it has lost a constraint you set at the start. It just produces an answer that no longer reflects that constraint.

Here is a common version of the problem. You begin a session by saying, "Use C# 12, and don't add any packages." Forty messages later, the assistant suggests a package and writes code that needs a newer language version. Nobody decided to break the rule. The rule had simply left the window.

This is why long chats drift. The early instructions are still there in the transcript you can see, but they may not be in the window the assistant is working from. The chat looks the same to you. It isn't the same to the model.

## What to do about it

- **Put the constraints in the newest message.** A constraint at the top of a long session is the one most likely to have been dropped. Repeat the important ones when you make a new request.
- **Start a new session for a new task.** A fresh session has room for the constraints and the code you need, and nothing else.
- **Keep the spec in a file, not in the chat.** A specification you can paste at the start of any session is more reliable than one you typed forty messages ago. Chapter 7 covers this in full.
- **Notice when the answer drifts.** If the assistant starts ignoring something you clearly asked for, suspect the context before you suspect the model.

## Try it

Pick a task you've worked on in this course, one you've already finished. Write down three constraints you set for it, in order of importance. Then imagine a conversation forty messages long on the same task, and ask yourself which of the three would be the first to fall out of the window, and why. Write your answer in a file called `context-notes.txt` in your practice folder.

If you have access to an approved tool, you can test the drift yourself. Start a session with a constraint, such as "answer in exactly three bullet points," then ask a dozen unrelated questions and ask for a short answer. Note whether the constraint held, and how many messages it took before it didn't. Don't paste anything confidential into the test. Use invented questions only.

---
