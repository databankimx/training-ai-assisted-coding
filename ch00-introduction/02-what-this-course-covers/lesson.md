# What This Course Covers

You now know roughly what an assistant is doing when it writes code. The next question is what this course will do with that knowledge. Short answer: it will teach you to get useful work from an assistant, and to be the person who decides whether that work is good enough to ship.

## What the course teaches

The course follows the path a piece of AI-assisted work takes, from start to finish:

- **Choosing the right way to work.** Some tasks need a quick suggestion, and some need a plan. Picking the wrong one wastes time.
- **Writing clear requests.** A request is a specification in disguise. The clearer it is, the less the assistant has to guess.
- **Giving the assistant context.** The assistant doesn't know your project. You teach it what it needs to know, in a document it can read.
- **Reviewing what comes back.** Generated code looks authoritative. You learn to read it as a skeptic.
- **Testing, debugging, refactoring, and documenting.** Each of these is a place where an assistant can help, and each has its own traps.
- **Working in larger steps.** Later chapters cover agentic tools, which take several actions on their own, and how to keep them under supervision.
- **Security, compliance, and judgment.** Some work should not be handed to an assistant at all, and you need to recognize that work when it appears.

The course is written around the ideas, not around one product. Products change quickly. A habit like "write the requirements before you ask for the code" will still be useful after the buttons have moved.

## What the course does not teach

This course does not teach you to program in a language from scratch. It assumes you can read basic code, or that you're willing to learn as you go. If you want to learn a language properly, our own tutorials are the place to start:

- [C# and OnBase](https://github.com/databankimx/training-csharp-and-onbase)
- [JavaScript](https://github.com/databankimx/training-javascript)
- [Python](https://github.com/databankimx/training-python)

The examples in this course use Python, C#, and JavaScript, because those are the languages most of us use. Each lesson with code shows the same example in each language, and you choose which one you see. The techniques apply to any language, though. A prompt with clear constraints works just as well for Rust or Java as it does for C#. If you work in a language we don't provide examples for, the lessons still apply. You'll translate the examples yourself, and that translation is good practice.

It does not give you a list of the one correct tool to use. The company's list of approved tools changes, and the course is written so that it does not need a rewrite when the list does. Where a lesson names a tool, it names it as an example of a kind of tool.

It does not replace your team's own review process, and it does not replace your manager's judgment about what you should be doing with AI in your role.

## How the stages work

The homework grows over the course, and that growth is deliberate:

1. **Early chapters.** You make short requests with known answers, and check the results by reading and running them.
2. **Middle chapters.** You write a specification in a markdown file and give it to the assistant along with a short context document. You begin to debug what comes back.
3. **Later chapters.** Your specifications become longer and more detailed. The examples may be written in a different language from the one you use, so you have to judge the result on its behavior, not its appearance.
4. **The capstone.** You take a larger specification through the whole process: planning, generating, testing, debugging, refactoring, documenting, and reviewing.

By the later stages, the assistant does much of the typing. Your part is to write a clear specification and to check the result.

## What you need

You will need a machine with Visual Studio 2026 and/or VS Code, and access to a company-provided AI tool. Step 4 of this chapter covers the setup. Later chapters will also ask you to install a language runtime, such as Python or Node.js. Each lesson lists what it needs.

## Try it

Write one sentence describing a task you do at work that you think an assistant might help with. Don't include any names, customer details, or internal system names. Keep the sentence general, such as "I write a summary of a meeting every week." You'll come back to this sentence in the capstone.

---
