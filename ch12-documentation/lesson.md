# Documentation

Documentation written by an assistant looks finished. It's fluent, complete, and organized, and it reads as if the author knew the code well. The trouble is that it was written from the code the assistant could see, which is not the same as the behavior you intend, and not always the same as the behavior that actually happens.

This chapter treats generated documentation as a draft, to be checked against the code the way generated code is checked against the spec. A sentence in a document is a claim, and a claim has to be true before it's published.

## What you'll do

1. **The assistant sees the code, not your intent.** Why documentation from code can describe the wrong thing with complete confidence.
2. **Prompting for documentation.** The difference between a vague request and one that names the reader, the source, and the claims to cover.
3. **Reviewing documentation against behavior.** Turning each sentence into a claim you can run.
4. **Keeping documentation current.** How documentation drifts from the code, and how to catch it.

The homework is a documented module, where some sentences are not supported by the code. You find them with a claim check and correct them. The summary has three quizzes.

The runnable steps check each documented claim by running the code, and print a line for each claim, so an unsupported sentence is visible.

---
