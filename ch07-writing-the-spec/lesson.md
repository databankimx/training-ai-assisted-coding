# Writing the Spec

Chapter 5 treated a prompt as a specification, and Chapter 6 gave the assistant standing context about a project. This chapter combines them into a single document you write yourself: a `SPEC.md` file that says what one piece of work must do, and how you'll know it does.

This is the first chapter where the specification does the heavy lifting. Up to now, the assistant has written the code and you've checked it. From here on, the most important thing you produce is the spec, and the code is the part you check against it.

## What the spec is for

A spec is a promise, written down before the work starts. It tells the assistant what to build, tells the reviewer what to check, and tells the person who inherits the code what it was supposed to do. A spec that does all three can be read by someone who wasn't in the conversation, which is the test of whether it's finished.

The spec also tells you when you're done. Without one, "done" means the code looks reasonable and the assistant has stopped asking questions. With one, "done" means every acceptance example passes.

## What you'll do

1. **Why a written spec beats a long chat.** What a file gives you that a conversation can't.
2. **The spec template.** The sections a spec needs, and what each one prevents.
3. **Acceptance examples.** Concrete input and output pairs, and how they become tests.
4. **Giving the spec to the assistant.** How to hand it over, and how to check the output against every example.

The homework is a spec for a small parser, written from a short description, followed by generated code, and a defect hunt. The summary has three quizzes.

Each step uses the same running example: the fines calculator from the Chapter 6 homework, with a new grace-period feature. The feature is small enough to hold in your head, and it has the kinds of edge cases that make specs worth writing.

---
