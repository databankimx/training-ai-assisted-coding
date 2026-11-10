# Roadmap: AI-Assisted Coding Training

Status: draft for review. Nothing in this course has been written yet, apart from this roadmap and `resume.md`. No lesson files will be created until the outline is approved.

## Purpose

This course teaches developers to use AI coding assistants effectively, safely, and with their judgment intact. It is not a course about one tool, one language, or one product. The tools will change. The habits in this course are meant to survive the change.

The course has two audiences, and the design serves both. Some learners have never opened an AI assistant. Others use one every day and have never been taught how to use it well. The early chapters build a shared mental model, so both groups start from the same place by Chapter 3.

## Guiding principles

1. **You own the output.** Every chapter reinforces this. If a learner remembers one thing, it should be that the name on the pull request is the name that answers for the code.
2. **Tool-neutral.** Lessons describe approaches and surfaces (inline completion, chat, planning, agentic work), not a single product. Where a product is named, it is named as an example of a surface, and the lesson says so. The approved-tool list is not a curriculum. It changes, and the course should not need rewriting when it does.
3. **Company accounts only.** Every lesson that involves an AI tool reminds learners that work at DataBank happens only through company-provided accounts, and that the AI Acceptable Use Policy applies. This is a standing rule, not a single lesson.
4. **Build one skill on the last.** Each chapter adds one new kind of work. Specifications grow longer, and the learner's share of the work grows with them. By the later chapters, the learner writes the specification and the assistant does much of the typing.
5. **Verify with behavior, not appearance.** A solution that looks right is not evidence. Every practical step ends with something the learner runs, tests, or checks against expected results.
6. **Teach the theory where it explains the behavior.** Each main lesson includes at least one clearly marked aside into the underlying idea, such as why models hallucinate, what a context window is, or why a confident answer can still be wrong.

## Audience and prerequisites

Learners are expected to be comfortable opening a terminal, a text editor, and their IDE. They are not expected to know any particular language well. Every lesson defines terms the first time they appear, and explains acronyms on first use.

The course uses several languages (Python, C#, JavaScript, and others). A learner works in the language they know. Solution files may be in a different language, which is deliberate. It forces the learner to judge whether the assistant's output is correct, not whether it matches a template. See "Homework design" below.

## Format and runner

The course has its own runner. Practical steps need to run code, and the learner needs to pause, edit, and run examples without leaving the lesson. The runner should follow the TypeScript runner's design where it fits, with changes for a multi-language course.

Proposed runner behavior:

- **Navigation.** Chapters and steps in a sidebar, with the lesson text beside an editor and an output pane. The learner can move forward and back without losing edits within a session.
- **Runtimes.** Each step declares its runtime in `lesson.json` (for example, `python`, `node`, `dotnet`, `g++`, `cargo`). The runner checks that the runtime exists, reports clearly when it does not, and never installs anything without an explicit switch, the way the TypeScript setup script does.
- **Run and Check.** Run executes the step's file and shows output. Check compares output against the expected result in `lesson.json` where one exists. Where a language has a compiler check (TypeScript, C#, Rust), Check can also run that.
- **Pausing for practice.** A step can mark a "try it yourself" block. The runner keeps the lesson open and the editor active while the learner works.
- **Next button.** The lesson pane, whether docked or popped out, has a Next button that moves to the following step, even when that step is in a different chapter. Next goes to the next lesson in catalog order and wraps to nothing at the final step.
- **Ephemeral edits.** Edits live in memory until Reset, as in the other runners. Nothing is written into the repository. Progress is stored outside the repository, in the user data folder.

Open for review: whether the runner should be built on the TypeScript runner's Electron shell and reused across languages, or whether a lighter approach works. Reuse saves effort and keeps the look consistent. A lighter approach might suit a course that is less about running code. See Open decisions.

## Lesson structure

Each chapter follows the course pattern:

- `lesson.md` at the chapter root, with the chapter introduction.
- Numbered steps, each with `lesson.json` (title, runtime, minutes, objective, prerequisites, expected output), `lesson.md`, and where relevant a starter file and a solution file.
- A summary with three quizzes. The quizzes test understanding by applying a concept to a new case, not by repeating the text.
- A homework folder (`NN-homework`), with one folder per exercise. Homework is marked in the lesson metadata with `"section"` and `"spoiler": true` where a worked answer exists, so the runner hides it until the learner asks.

Prerequisites refer to other lessons by exact title. Titles must match exactly, and the course checker should enforce this.

### Quiz format

Quizzes follow the existing pattern. A fenced `quiz` block contains each question. Every question has exactly one correct option, marked `◉`. Wrong options are marked `○`. Each option is followed by feedback beginning with `→`. Each quiz tests a single idea.

The checker fails any quiz with zero or several correct options. This check was added after a real error in the TypeScript course, and it stays.

Quiz feedback follows the tone rules. Wrong answers are explained kindly and specifically. A learner should never feel corrected for not knowing something.

## Writing tone

This applies to every lesson, summary, quiz, homework prompt, and code comment in the course. The full rules are in `resume.md`. In brief: thorough and verbose where a beginner needs the explanation, beginner-friendly, dry humor, occasional self-deprecation (sparingly), jokes that mock tools and conventions but never the reader, and US English throughout. Documentation uses hyphens rather than em dashes, and no emojis appear anywhere.

## Homework design

Homework grows in difficulty and in the amount of specification the learner writes. This is the course's main arc, so it is set out here in more detail than the other chapters.

Stage 1, early chapters: the learner writes a short prompt in chat or in the editor, and checks the result against a known answer. The exercise is small enough to verify by reading.

Stage 2, middle chapters: the learner writes a specification in a markdown file (`SPEC.md`), gives it to the assistant with a short context document, and reviews the result. The learner also debugs at least one defect that the assistant introduced on purpose, or by accident.

Stage 3, later chapters: the learner writes a multi-part specification with explicit inputs, outputs, error behavior, and constraints. They generate code in one language from a spec, then test it, review it, and debug it. Solutions are in a different language.

Stage 4, capstone: the learner takes a larger specification, breaks it into checkpoints, runs an agentic workflow under supervision, and writes the review notes a team lead would expect.

### Checking homework across languages

When the solution is in a different language, comparing text does not work. The course needs a language-neutral way to check behavior. Proposed approach, for review:

- Each exercise ships with a small set of test vectors in JSON: inputs and expected outputs, plus a few error cases.
- The runner executes the learner's code against those vectors through a small per-language harness that the course provides.
- The check reports which vectors passed and which failed, not whether the code matches the solution.

This keeps the solution in any language and keeps the check fair. It also matches the course's own principle that behavior is the evidence. The harnesses add work, so we should decide how many languages get one before we start. See Open decisions.

### Specification files

From Stage 2 on, learners write `SPEC.md` files. Each spec should cover purpose, inputs and outputs, error behavior, constraints (language version, dependencies, licensing), and what is out of scope. A spec template is provided in the early stage and removed by the later stage, so the learner has to produce the structure without a fill-in-the-blank form. That removal is deliberate.

## Chapter outline

The outline below replaces the earlier draft. It keeps the same core topics, reorders them so each builds on the last, and adds the spec and homework arc. Chapter 0 is an introduction. Chapters 1 to 14 are the body of the course. An appendix collects reference material.

### Chapter 0: Introduction

Covers what an AI coding assistant is, at the level needed for everything that follows, and what this course will and will not do.

- 0-01: What an assistant does when it "writes code" (tokens, completion, why it sounds confident). Includes a theory aside.
- 0-02: What the course covers and does not cover, and how the stages work.
- 0-03: The ownership rule. You own every line you deliver.
- 0-04: Getting Copilot running in Visual Studio 2026 and VS Code. Covers the free tier, the sign-in, and a check step that proves Copilot is present. Menu paths are verified when drafted.
- 0-05: Confidential data and company accounts. The policy in practical terms, with the CONFIDENTIAL-by-default rule and a link to the employee portal.

Homework: none. Each step ends with a "Try it" block, and the chapter summary has three quizzes.

### Chapter 1: Your First Interaction

The learner gets a tool working and uses it on something small and verifiable. The goal is the habit of reading before accepting.

- 1-01: Setting up an approved tool through a company account. The lesson names the policy and the company account requirement, and does not depend on any one product.
- 1-02: Inline completion on a tiny, obvious function.
- 1-03: What accepting a suggestion means.
- 1-04: Rejecting, refining, and writing it yourself.

Homework (Stage 1): complete a three-function module with inline completion, and verify each function against examples written first.

### Chapter 2: Rules of Engagement

Nothing else in the course works without this chapter. It covers the AI Acceptable Use Policy in practical terms.

- 2-01: The policy in practice. What may and may not go into a prompt.
- 2-02: Data classification by default, with worked examples of allowed, not allowed, and grey-area cases.
- 2-03: Company accounts versus personal accounts, and why the difference matters.
- 2-04: A quick test for whether something is safe to paste, and what to do when you are not sure.

Homework (Stage 1): a sorting exercise. The learner classifies a list of sample prompts and explains each decision. The answer key is in the runner.

### Chapter 3: How the Model Works (and Why It Gets Things Wrong)

The theory chapter. Developers who understand hallucination and training cutoffs make better choices for the rest of the course.

- 3-01: Tokens, context windows, and what generation actually is.
- 3-02: Hallucination: invented methods, stale APIs, confident nonsense.
- 3-03: Training cutoffs and why the assistant does not know your library version.
- 3-04: Why well-formatted output is not evidence of correctness.

Homework (Stage 1): a deliberate hallucination hunt. The learner receives generated code and lists every claim about an API, then checks each one against documentation.

### Chapter 4: Choosing the Right Surface

A practical map of the ways to work with an assistant, and how to choose before writing a prompt. Covers the difference between coding assistants and AI platform tools, since learners confuse them.

- 4-01: The surfaces: completion, inline edit, chat question, planning, and agentic work.
- 4-02: Coding assistants and AI application platforms. Different jobs, often confused.
- 4-03: Choosing the surface before the prompt.
- 4-04: A decision exercise across five tasks.

Homework (Stage 1): match five tasks to surfaces, justify each, and compare with the answer key.

### Chapter 5: Writing Effective Prompts

Prompt quality is the largest single lever on output quality. This chapter teaches the anatomy of a prompt, using a spec-like structure.

- 5-01: A prompt is a specification. The anatomy: language and version, signature, input and output contract, constraints, error handling, and style.
- 5-02: Weak and strong prompts compared across two languages.
- 5-03: Constraints as protection against the assistant's defaults.
- 5-04: The follow-up cycle, and when to stop iterating.
- 5-05: Prompts for tests and documentation, previewed here and developed later.

Homework (Stage 1 to 2 bridge): write a prompt for a small function, run it, then tighten the prompt in two rounds. Turn in all three prompts and the outputs.

### Chapter 6: Context Documents

The assistant does not know your codebase. This chapter teaches the markdown context document, a short standing brief for the assistant. It is underused and worth a full chapter.

- 6-01: Why the assistant needs context: no memory across sessions, no access to internal APIs.
- 6-02: Anatomy of a context document: purpose, key types, entry points, patterns, conventions, what to avoid, and examples.
- 6-03: Writing a context document for a small, invented module.
- 6-04: Using it: pasting, attaching, and session scope.
- 6-05: Keeping it current. A context document that is out of date misleads the assistant with confidence.

Homework (Stage 2): write a context document for a module the learner has not seen before, then use it to generate a small feature. The learner reports where the document helped and where it was missing.

### Chapter 7: Writing the Spec

The first full specification chapter. The learner writes a `SPEC.md` and gives it to the assistant.

- 7-01: Why a written spec beats a long chat. Specs persist, can be reviewed, and can be handed to someone else.
- 7-02: The spec template: purpose, inputs and outputs, errors, constraints, out of scope, acceptance examples.
- 7-03: Acceptance examples as the bridge between spec and tests.
- 7-04: Giving a spec to the assistant, and checking the output against each acceptance example.

Homework (Stage 2): write a spec for a small parser from a short description. Generate the code from the spec, then find and fix at least one defect the assistant introduced.

### Chapter 8: Reviewing Generated Code

The reading chapter. Generated code looks authoritative, and this chapter teaches systematic skepticism.

- 8-01: Reading before running.
- 8-02: Hallucinated and stale APIs: how to spot them and how to verify.
- 8-03: Common failure modes: broad exception handling, blocking on async, ignored cancellation, hardcoded values, and unnecessary complexity. Examples are drawn from several languages.
- 8-04: A review checklist that works in any language.
- 8-05: Code that passes every check and is still wrong.

Homework (Stage 2): review three generated functions against a checklist, with defects seeded in each. The learner writes a review note for each.

### Chapter 9: Testing with AI Assistance

Tests first, then the assistant. Agent-written tests often look complete and miss the cases that matter.

- 9-01: Why generated tests look finished and often are not.
- 9-02: Writing acceptance examples and test cases before the implementation.
- 9-03: Reviewing a generated test suite: boundary cases, error paths, and the assertions that prove nothing.
- 9-04: Using the assistant to extend coverage the learner wrote.
- 9-05: Test-driven development with an assistant, in both directions (added 2026-11-10). Prepared tests judge the assistant's code: the learner writes the failing tests first, the assistant writes the implementation, and the tests decide whether it passes. The assistant writes the tests for the learner: the learner checks them against the spec before trusting them. The step covers the main risk of the second direction, which is an assistant that changes the tests to make them pass rather than fixing the code, and how to spot it in a diff.

Homework (Stage 2 to 3): given a spec and a generated test suite with gaps, add the missing cases and explain each one. The test vectors for this exercise are language-neutral.

### Chapter 10: Debugging with AI Assistance

Using the assistant when something is already wrong.

- 10-01: Describing a bug: the information a useful prompt contains.
- 10-02: Pasting the actual error and output, not a summary of them.
- 10-03: Reading the assistant's hypothesis before accepting its fix.
- 10-04: When the fix is wrong, usually because the assistant missed an invariant you did not state.

Homework (Stage 3): a seeded bug in a program written in one language, with a misleading symptom. The learner debugs it with the assistant, records each hypothesis and its result, and writes the root cause. The solution is in a different language, and the check is behavioral.

### Chapter 11: Refactoring with AI Assistance

Supervised cleanup, one concern at a time.

- 11-01: Why broad refactoring prompts go wrong.
- 11-02: Where the assistant does well: naming, structure, duplication.
- 11-03: Telling behavior-preserving changes from behavior-changing ones in a diff.
- 11-04: Checkpoints during refactoring.

Homework (Stage 3): a module with three refactoring opportunities. The learner handles each separately, with a behavior test run after each change.

### Chapter 12: Documentation

Documentation is a draft, not a source of truth.

- 12-01: The assistant can see the code you give it, not your intent.
- 12-02: Prompting for documentation, compared with a vague "document this."
- 12-03: Reviewing generated documentation against the actual behavior.
- 12-04: Keeping documentation current as code changes.

Homework (Stage 3): document a module from its spec and tests, then check the documentation against the behavior. The learner marks every sentence that the code does not support.

### Chapter 13: Agentic Workflows and Security

Agentic work brings the highest reward and the highest risk, so the security material lives here, alongside the workflow it governs.

- 13-01: What makes a task agentic.
- 13-02: Writing a brief for an agent: scope, constraints, done criteria.
- 13-03: Checkpoint supervision: plan, review, implement, review, test, review.
- 13-04: Reading the diff. This is the most important review in an agentic workflow.
- 13-05: Prompt injection from files and web content, and why agents are particularly exposed.
- 13-06: Security-sensitive and compliance-sensitive code. Authentication, authorization, cryptography, and regulated logic are written by people, reviewed by specialists, and implemented against the written requirement.
- 13-07: Dependency hygiene: license vetting, copyleft, and the package-source checks that apply to closed-source commercial software.
- 13-08: Never feed generated code into a runtime evaluator. The lesson explains the risk: remote code execution by design, no sandbox, no audit trail, and no CI gate. It does not include a working example of the pattern.
- 13-09: The review process has no AI exception. Team review, standards checks, static analysis, and dependency scanning apply to every change, regardless of origin.

Homework (Stage 4 begins): a staged agentic task on a spec the learner wrote. The learner sets explicit checkpoints, stops at each one to review, and writes a diff review.

### Chapter 14: Knowing When to Stop, and the Capstone

The judgment chapter, followed by the course's final project.

- 14-01: Where assistance is most valuable: familiar domains, quick validation, cheap fixes.
- 14-02: Stop conditions: repeated failure to converge, editing more than writing, not understanding the output, deadline pressure.
- 14-03: The handoff from prototype to production.
- 14-04: Skill atrophy and deliberate unassisted practice.
- 14-05: A decision framework to use before each task.

Capstone (Stage 4): a larger specification, implemented across two languages with a context document, a spec, generated code, a test suite, a debugging session, a refactoring pass, documentation, and a written review. The learner submits the spec, the prompts used, the generated outputs, the review notes, and a short reflection on where the assistant helped and where it did not. The capstone is graded against behavior and against the quality of the learner's review, not against the amount of code produced.

## Appendix: reference material

Not chapters. Referenced throughout.

- The approved-tool list, linked and not reproduced, since it changes.
- The DataBank AI Acceptable Use Policy, linked from Chapter 2.
- Context document and spec templates. The early templates are full, and later ones are reduced.
- A glossary of terms used across the course.

## Things to avoid carrying over from the C# supplement

The C# supplement is useful reference, but it has problems this course should not repeat:

- Its runtime evaluation example is a working demonstration of the risk. This course describes the risk and does not provide a working pattern.
- Its screenshot placeholders and vendor-specific steps tie the lessons to one product. This course uses placeholders for surfaces, and names products only as examples.
- Its context document references assume resource files that do not exist in this course. Any context document used here will be written for this course.
- Its heading contains inline HTML. Headings here are plain.

## Open decisions for review

1. **Runner base.** Reuse the TypeScript runner's Electron shell for all languages, or build a lighter runner? Reuse is consistent. A lighter build may fit better if few lessons need an editor.
2. **Language coverage for harnesses.** Which languages get a behavioral test harness at launch? Proposed starting set: Python, C#, and JavaScript, since they cover the most lessons. Others follow as needed.
3. **Runtime requirements.** Confirm the minimum version for each language, such as Python 3.12 (already the Python course's requirement) and Node 24 (the TypeScript course's requirement). Pin the same versions across courses where possible.
4. **Spec template fade.** Confirm the plan to remove template scaffolding in Stage 3. Some reviewers may prefer to keep the template longer.
5. **Capstone grading.** Decide who grades the capstone, and whether grading is pass or fail, or graded on a scale.
6. **Chapter 0 length.** Decide whether the theory in Chapter 3 should move into Chapter 0, so that the introduction holds the entire mental model before any practice.
7. **Resume update.** Once this roadmap is approved, `resume.md` should be updated to record decisions 4 and 5 and the stage model. Not done yet, pending review.

## Next steps

1. Review this roadmap together, and settle the open decisions above.
2. Approve or revise the chapter outline.
3. Write the runner design document, in the same style as the TypeScript `RUNNER-DESIGN.md`, covering the open runner decisions.
4. Update `resume.md` with the decisions made.
5. Write Chapter 0 and Chapter 1 after the outline is approved, one file at a time, with review between files.
