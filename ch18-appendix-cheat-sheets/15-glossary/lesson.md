# Glossary

Terms used across the course, in alphabetical order. Each entry names the chapter where the term is explained in full.

**Acceptance example.** A concrete input with an exact expected output, written from the spec before any code. A set of them is an acceptance table. *Chapter 7.*

**Agent.** A model, a set of tools, and a loop that repeats until a stop condition. The model proposes actions, the tools act, and the loop decides what happens next. *Chapter 14.*

**Agentic workflow.** Work in which the assistant reads files, runs commands, edits several places, and decides its next step with some independence. *Chapter 13.*

**Approval gate.** A check in the agent's loop that asks a person before a certain action runs. It belongs in the loop, not the prompt. *Chapter 14.*

**Brief.** The written contract for an agent's run: scope, constraints, checkpoints, and done criteria. *Chapter 13.*

**Checkpoint.** A point where a run stops for a decision, such as reviewing a plan or a diff. Also, in refactoring, a point after one kind of change where the behavior is compared with the original. *Chapters 11 and 13.*

**Claim.** A sentence in a document, or a statement about behavior, turned into an input and an expected result that can be run. *Chapter 12.*

**Completion.** The assistant suggesting the next lines as you type. Shown as ghost text until accepted. *Chapter 4.*

**Context document.** A short markdown file that gives the assistant standing facts about a project. *Chapter 6.*

**Context window.** The amount of text the model can work with at once. What falls outside it is not visible to the model. *Chapter 3.*

**Diff.** A record of what changed between two versions of a file. Lines beginning with `-` were removed, lines beginning with `+` were added, and a leading space marks unchanged context. *Chapter 13.*

**Done condition.** The check that ends an agent's loop because the work is finished. It is separate from the step limit. *Chapter 14.*

**Ghost text.** A suggestion shown faded in the editor, not yet part of the file. *Chapter 4.*

**Hallucination.** Output that sounds correct and isn't: a method that doesn't exist, a fact that was never true. *Chapter 3.*

**Harness.** A small program that runs a set of cases and prints a result for each. The course's runnable steps use one. *Chapter 9.*

**Hypothesis.** A guess about the cause of a bug, which has to be tested before it is accepted. *Chapter 10.*

**Invariant.** A condition the code relies on for its answer to mean anything, such as a positive divisor. *Chapter 10.*

**Inline edit.** Selecting code and asking for one change to it, which the assistant proposes and you accept or reject. *Chapter 4.*

**Mutant.** The code with one realistic mistake, used to test whether a suite would catch it. *Chapter 9.*

**Prompt injection.** Instructions hidden in text an agent reads, such as a file or a web page, that try to steer it. *Chapter 13.*

**Red run.** Running a suite before the implementation exists, so that every test fails. A test that passes before the code exists is suspect. *Chapter 9.*

**Spec.** A written statement of what a piece of work must do: its purpose, inputs and outputs, errors, constraints, scope, and acceptance examples. *Chapter 7.*

**Stop condition.** A rule that ends a session or a run: a count of failing cases, a step limit, a done condition, or an error. *Chapters 14 and 16.*

**Surface.** The way you work with an assistant: completion, inline edit, chat, planning, or agentic work. *Chapter 4.*

**Token.** A piece of text the model treats as one unit, often a word or part of a word. *Chapter 3.*

**Training cutoff.** The date after which the model has no training data. Anything released later may be unknown to it. *Chapter 3.*

**Tool.** An action an agent can take, with a name, inputs, and checks enforced in code. The tool is the agent's real boundary. *Chapter 14.*

---
