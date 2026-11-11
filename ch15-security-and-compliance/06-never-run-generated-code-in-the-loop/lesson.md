# Never Feed Generated Code Into a Runtime Evaluator

A runtime evaluator is any part of a program that takes a string and runs it as code: an eval function, a script engine, a dynamic compiler, or a tool that executes a command built from text. Chapter 14, step 6 explained why an agent must not use one for its own generated code. This step applies the same rule to any system, and it describes the risk without a working example of the pattern.

## Why the rule is absolute

Executing a string is the one operation that can do anything. A file can be wrong and a diff can be reviewed, but a program that runs can read secrets, open network connections, change other programs, and delete data, all before a reviewer sees any of it. The text that reaches the evaluator decides what the program does, and in this design that text came from a model, which may have been steered by input it should not have trusted.

Three properties make the risk hard to contain.

- **No sandbox is enough.** A sandbox that is strict enough to be safe also stops most of what the code was meant to do.
- **No audit trail is complete.** The log records that code ran. It doesn't record every file read, connection, or side effect unless the runtime is built to report them.
- **No review happens first.** The gates from the previous step run on the change before it is merged. Code that is generated and executed at runtime never passes through them.

## Where the rule is at risk

The rule is easy to state and easy to break by accident. These are the designs where it is most often at risk.

**A feature that lets users write formulas.** A spreadsheet-style calculator that evaluates whatever the user types is a runtime evaluator. The formula is text, and the text decides what runs.

**An agent that verifies its own work by running it.** The agent writes a program, runs it, and reads the output as proof. Chapter 14, step 6 covered this case.

**A configuration file that contains code.** A setting that is evaluated, rather than read as data, is code with a file extension. It can be changed by anyone who can change the file.

**A template system that compiles templates from user input.** The template becomes a program, and the program runs on the server.

**A debugging or admin tool that takes a command from a text box.** The box accepts the same power as a shell.

> **Aside: why "it's only a formula" is the usual argument.**
> The people who add a runtime evaluator rarely intend to run arbitrary code. They intend to run arithmetic. The evaluator is the fastest way to build arithmetic, and it accepts more than arithmetic. The rule is not about intent. It's about what the evaluator accepts, and what an attacker can make it accept.

## What to do instead

When a feature needs a calculation from text, use a parser that accepts only the grammar you intend, and that rejects anything outside it. The parser reads the text as data, and it returns a value or an error. It never runs the text as a program.

When an agent needs a result, use a fixed check outside the loop, as Chapter 14 described. When a configuration needs a value, read it as data with a schema, and reject a file that doesn't match.

## What the review asks

When a generated change adds or touches an evaluator, a template, or a command built from text, the review asks four questions before anything else.

- Where does the text come from, and who can change it?
- What does the evaluator accept, beyond what the feature needs?
- Could the text reach the evaluator without a person reading it first?
- Is there a parser or a fixed command that would do the job without executing text?

If the answer to the last question is yes, the change is redesigned. The review doesn't approve an evaluator because the feature needs one.

## Try it

Find one feature in a project you know that takes text and does something with it. Decide whether the text reaches an evaluator, a template, or a command. If it does, write the parser or the fixed alternative that would replace it, and the one input the parser must reject. Save your answer in a file called `evaluators.md` in your practice folder.

---
