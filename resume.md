# Resume: AI-Assisted Coding Training

This file is for picking up work after a restart. It records where things stand, what was decided, what we've already learned from the other courses, and what's next. Read it in full before writing anything.

## IMPORTANT: Writing tone

Every lesson, summary, quiz, and homework prompt in this course must follow this tone. It applies to all content, not only the introductions.

- **Thorough and as verbose as necessary.** Explain the why, not only the what. Cut padding, but never cut an explanation a beginner needs to follow the next step.
- **Beginner friendly.** Assume the reader knows how to open a terminal and a text editor, and nothing more. Define a term the first time it appears, and explain acronyms on first use.
- **Wry sense of humor.** Light, dry, and conversational. A joke can make a point memorable, but it should never be the point.
- **Occasionally self-deprecating.** The author may admit to mistakes, bad habits, or the time an assistant confidently produced nonsense. Use this sparingly, and never as a way of making the reader feel small.
- **Jokes at the expense of coding absurdities, never at the expense of the reader.** Mock the tool, the code, the convention, or the industry habit. Never mock someone for not knowing something. A reader who has just learned something should feel clever, not corrected.
- **US English only.** Color, center, behavior, favorite, organize, license (noun and verb). Check every sentence, including headings, code comments, and quiz feedback. Do not use British spellings such as colour, centre, behaviour, or organise.
- **Asides into theory.** Most lessons should include at least one aside into the underlying theory: why the tool behaves as it does, what the model is doing, where an idea came from, or what the trade-off is. Put these in clearly marked asides, so the practical path stays easy to follow.

## Status

- Chapter 0 is approved. Chapter 1 is drafted in `ch01-first-interaction/`: the introduction, four steps (setup, inline completion, read before accepting, reject/refine/write), a homework step, and the summary. Its code examples use the `~~~examples` block (C#, Python, JavaScript tabs), and the runner renders them. The expected outputs were worked out by hand and must be confirmed by running each solution before Chapter 1 is released. The runner design is in `RUNNER-DESIGN.md`.
- The Chapter 0 policy questions and the Copilot setup check are resolved (see Decisions).
- Committed to git by Scott after the Chapter 1 runner work. Verified on Scott's Windows PC: npm install, the Chapter 1 solutions (C#, Python, JavaScript), the runner, and the Check button (syntax errors, output mismatch, passing solution, C#, and homework with syntax-only checks). Still open: (1) the setup script, to be tested on a clean VM after the work is merged to main; (2) the README: an initial version is drafted, with direct-run instructions for each sample file. Review needed: the two verbatim sections link to `development-rules-of-engagement.md` and to the AI policy in the C# repository, and neither file is in this repository yet.
- Runner milestone 1 was written, then extended, and it now runs on Scott's Windows PC. It has code-step support, the solution gate, and the Source pane with highlighting.
- `.gitignore` now excludes `resources/`. Lessons link to the employee portal for the policy rather than reproducing it.
- The DataBank AI Acceptable Use Policy (v1.7) is in `resources/DataBank-AI-Acceptable-Use-Policy.md`, which is local only. Lessons quote it by its own terms, not from memory.
- The C# course already has a short supplement on this subject (`CSharp.Supplemental.AiAssistedDevelopment`). It is reference only. Don't copy it. Its runtime-evaluation example is a working demonstration of the risk, and this course must not reproduce it.

## Locations

- **Course root:** `C:\Development\training\training-ai-assisted-coding`
- **Roadmap:** `roadmap.md` in the course root. Chapter outline, runner plan, homework stages, open decisions.
- **Policy (local only, gitignored):** `resources/DataBank-AI-Acceptable-Use-Policy.md`
- **TypeScript course (structure and runner model):** `C:\Development\training\training-typescript`. Its README, QUICKSTART, `setup.ps1`, `RUNNER-DESIGN.md`, and lesson runner are the model to follow where they fit.
- **JavaScript course:** `C:\Development\training\training-javascript`. Its runner has the feature set we want to borrow from. Its architecture need not be copied.
- **Python course:** `C:\Development\training\training-python`. Its `claude-resume.md` is the model for this file.
- **C++ course:** `C:\Development\training\training-cpp`
- **C# and OnBase course:** `C:\Development\training\training-csharp-and-onbase`. Its AI supplement is the starting point for content, not a template to follow closely.
- **Other courses:** `C:\Development\training\training-c`, `training-java`, `training-rust`
- **Company rules:** `development-rules-of-engagement.md`, in the TypeScript, C++, Python, Java, C, and Rust repositories. The section on AI tools applies to every lesson in this course. Read it before writing any lesson about tool use.

Read the other repositories for reference only. Don't write into them.

## What we've already learned from the other courses

Read this section before proposing a structure. It records decisions and bugs from the other courses, so this course doesn't repeat them.

### Lesson structure and content

- A chapter has one or more steps. Each step is a lesson. Each chapter has an introduction (`lesson.md` at the chapter root), numbered steps, a summary with quizzes, and homework. Homework lives in a `NN-homework` folder, with one folder per exercise. The TypeScript runner lists homework under its chapter.
- Each step has `lesson.json` (title, runtime, minutes, objective, prerequisites, expected output), `lesson.md`, and for code steps a starter file and a solution file. Prerequisites refer to other lessons by their exact title, so titles must match exactly.
- Quizzes use a fenced `quiz` block. Every question has exactly one correct option, marked `◉`, and the feedback line after each option starts with `→`. The TypeScript course's lesson test fails when a quiz has zero or several correct options. An option marked `○` with "Right." as its feedback causes this, and it happened once already.
- Summaries end with three quizzes that test understanding, not recall. Write them as applications to a new case, not as restatements of the text.
- Each MD lesson file ends with a horizontal rule (`---`).
- Lessons don't refer to a textbook. Where a topic comes from a book or specification, explain it in our own words.
- Documentation uses hyphens, not em dashes. The Python course's convention is the same, so reuse it.

### Code and expected output

- The expected output in `lesson.json` and the printed output in the lesson must match what the program prints. Hand-worked outputs were wrong several times across the course. A number worked out in your head should be confirmed by running the program before it goes in a lesson.
- Always give a worked example a threshold that actually separates the cases. A value of 6 passes a "greater than 5" filter, so the example printed the wrong list until the threshold was changed to 7.
- Where a count depends on the data, don't state it. Use a seeded list of values so the output is repeatable, and state only the counts that are fixed by the algorithm.
- Starter files should compile and run. A starter that calls a function that doesn't exist yet fails the check and confuses the reader. Use a placeholder that compiles, with a TODO comment.
- Quiz questions and "try it yourself" items must be possible to do as written. A question that asks the learner to change a variable from outside its scope isn't a question.

### TypeScript-specific lessons

- A TypeScript file with no `import` or `export` is a global script, and its top-level names share one scope with the browser's own global names. `name`, `status`, and similar names clash with them. Add `export {};` to any browser script that has no imports, which makes it a module. The fix was made across chapters 20 to 24, after the checker reported the clashes.
- Use `import type` for type-only imports, because `verbatimModuleSyntax` requires it.
- Use no parameter properties and no enums, because `erasableSyntaxOnly` rejects them. Node 24 runs `.ts` files directly, which is why the TypeScript course runs its Node steps without a build step.
- The TypeScript runner pins TypeScript to 6.0.3 exactly. TypeScript 7 is a native compiler with no `tsserver.js`, so VS Code's language service can't use it. Revisit when VS Code supports it.

### JavaScript-specific lessons

- The JavaScript course uses `solution.md`, not `solution.js`, and has no `lecture.md`. Its lessons must contain `javascript` and `text` code blocks, which `check-curriculum.js` requires.
- Homework is marked in the lesson metadata with `"section"` and `"spoiler": true`. Without those fields, the runner shows the exercises as ordinary steps and doesn't hide the worked answer. This happened in a new chapter and was fixed.
- Visualizers are named in the lesson metadata with `visualizerAlgorithm`. The names are not all the same as the lesson folder names: the quicksort visualizer is `quick-sort`, not `quicksort`. Check the metadata before you copy a name.

### Setup and tooling

- Setup scripts clone the repository when they are run from outside it, then run the clone's own copy. Keep this behavior.
- Never delete `package-lock.json` to recover from an install failure. That undoes the locked install. The JavaScript script did this, and it was removed from the TypeScript script.
- The JavaScript setup script called a function it never defined, in its recovery path. Test every branch of a setup script, not only the happy path.
- Installing software needs an Administrator PowerShell only when the script actually installs something. Make installation opt-in with a switch such as `-InstallMissing`, so a plain run only checks the machine.
- `npm ci` installs the locked versions. `npm install` can change them. Use `npm ci` in setup scripts.
- Electron's binary can fail to download, and the common fix is to rebuild the native modules with the compiler environment loaded. Python 3 is needed by node-gyp, and the Build Tools installer doesn't include it.
- Progress is stored outside the repository, in the user data folder, and never committed.

### Python-specific lessons

- The Python course requires Python 3.12 or later, keeps lessons Windows-focused with a pointer to the book's appendix for macOS and Linux, and uses `"UTF-8"` as the encoding everywhere.
- Lesson code and the `.py` file must match. A `\n` printed by the code must appear in the lesson snippet, or the reader sees different output.
- Pylint and NOSONAR comments stay in the code file. Lessons mention them in a note only, and code blocks in lessons never show them.
- Step folders hold only the files that the step adds or changes.

### Process

- Review one file at a time. Report the findings, wait for approval, then edit. The Python course worked this way, and the author responded well to it.
- Keep a record of what was decided and why. Several bugs came back because an earlier decision wasn't written down.
- Check each run of the course, not only the files. The TypeScript test passed while a quiz error stayed hidden until the homework was opened, because the test didn't cover that lesson.

## Decisions

### Setup script

- The setup script assumes every supported tool is needed, and installs all of them by default.
- The learner can name a language, or a list of languages, to limit the installs to the tools they need. Discussion deferred until we reach the setup script.
- To reconcile for that discussion: the lessons-learned section says installs should be opt-in behind a switch such as `-InstallMissing`, so a plain run only checks the machine. The new direction installs everything by default. Both can hold if the switch controls installation and the language list controls scope, but this needs a decision.

### Scope and audience

- The course is a cross-language track on using AI coding assistants well. It is not a course about one language, and it is not tied to one product.
- The audience is everyone in the company, developers and non-developers alike. The author's principle: anyone can do development, but everyone follows the rules. The first chapters address both experienced and new users. By Chapter 3 the paths converge.
- The repository is public and intended for internal users, but anyone can see it. Lessons must therefore assume an outside reader. They must not contain internal hostnames, credentials, or internal documents. Internal links are added only as needed, and the author looks them up at that time.

### Tools and accounts

- Approved tools, per the author: Claude, ChatGPT, and GitHub Copilot. Lessons do not name or limit themselves to these. The policy will change, and the course must remain current without a rewrite.
- Paid GitHub Copilot seats are assigned to developer roles only.
- Free-tier GitHub Copilot is permitted for all staff, per the author. Chapter 0 wording: the free tier is fine for learning with sample code; for any DataBank work, use a company-provided account.
- AI tools are approved by IT. Access to approved tools is granted by managers, per the author. Chapter 0 uses this two-step wording.
- OBASS, the internal OnBase assistant built on Claude, is exposed to general users. Lessons refer to it generically, as "an internal assistant built on Claude," unless the author later approves naming it.
- Work use is restricted to company-provided accounts. This rule appears as a standing reminder in every AI-related lesson.
- Editors: Visual Studio 2026 (the latest version once validated against our code) and VS Code. Other IDEs are allowed, and the setup chapter says so directly.
- Sign-in: most learners use github.com. GHE users already know their login process, so the setup chapter does not walk through GHE sign-in.
- Copilot setup, checked against current Microsoft and GitHub material: Copilot is built into current VS Code releases (from 1.116), so no extension install is needed there. Visual Studio 2026 includes Copilot, but Microsoft's setup page still tells users to confirm it is installed (Extensions > Manage Extensions, or the GitHub Copilot component in the Visual Studio Installer). Sign-in is through Tools > Options > GitHub > Accounts in Visual Studio. Chapter 0 should show the check step, not assume it. Menu paths change, so verify them again when the lesson is drafted.
- Chapter 0 covers setting up GitHub Copilot in Visual Studio and VS Code, including the free tier. The confidential-data rules must be stressed in Chapter 0.
- The author has tested that Copilot is built in. Chapter 0 keeps the prove-it check anyway, so learners confirm it on their own machines.

### Confidential data

- Use the policy's own term, "CONFIDENTIAL," throughout lessons. The policy treats all data as CONFIDENTIAL by default.
- Lessons link to the employee portal (workforcenow.adp.com) for the full policy, not to helpdesk phone numbers. Helpdesk links are looked up by the author as needed.
- Practice exercises use invented or sample data only. Company code is never pasted into any AI tool during the course. This applies even to approved tools.

### Languages

- Python, C#, and JavaScript are the most common languages across the collection. Examples and homework use these three first. Others are added only when needed. TypeScript is dropped from the course.
- Solution files may be in a different language from the student's. This is deliberate. The check is behavioral, not textual.

### Runner

- The course has its own runner, which must be multi-language.
- Architecture is chosen for the best feature set, not copied from any one course. The JavaScript runner's feature set is the reference for what the runner should do.
- The Next button moves to the following step in catalog order, across chapters, in docked and popped-out windows. Ctrl+Right and Ctrl+Left are proposed shortcuts.
- The source pane has language tabs for every code example: C# (default), Python, and JavaScript. TypeScript is dropped, including from the behavioral harnesses. A tab appears only when its toolchain (`dotnet`, `python`, `node`) runs on the learner's machine. Code blocks in the Lesson tab follow the selected tab. The same pane shows Markdown files for AI (context documents and specs) through a file selector drop-down, and those files appear under every tab.
- The runner keeps progress and the last step, but not drafts. Edits last only while the learner is on a step. Learners keep their own solution folders for their work.
- Platform: Windows only for the first version. Shell: Electron, using the latest TypeScript and JavaScript runners as the feature reference. The setup script must install the Visual Studio Build Tools with the C++ workload and Python 3, as the TypeScript setup script does.
- Milestone 1 review changes (author feedback): no menu bar; the lesson pane is a Source | Lesson tab area with copy and pop-out glyphs, the same as the other runners; the output pane takes the space above, with copy and clear glyphs; chapters are numbered ("Ch00 - Introduction"); the step list is headed LESSONS and shows no times; links open in the browser; code blocks wrap; the logo is on the brand bar; quiz explanations sit beneath the answer; spoilers use a tilde fence (`~~~spoiler`) so the prompt can be a code block inside them. The window icon needs `renderer/app.png`, copied from the TypeScript runner.
- Round 2 review (author feedback): the step rows lost their extra spacing (they had picked up the lesson pane's padding, now fixed by the `step` class); the source and lesson area is 50% of the window height; glyph buttons have no borders; the pop-out window has the icon, a copy glyph, and a re-dock glyph; while a lesson is popped out, the main window's lesson pane shows a re-dock panel.
- Round 3 (author feedback): the pop-out remembers its position in `window-state.json`; Previous and Next sit at the bottom of the lesson pane, with the neighboring lesson's name beside each button and small triangles as the pointers; the Source tab works while a lesson is popped out, and only the Lesson tab shows the re-dock panel. Quiz answers and spoiler open states are saved per lesson in `progress.json` and restored when the lesson opens, in either window.
- Appearance, navigation, and layout must be consistent with the runners already built. Learners should find the interface familiar, and it should not differ significantly. Before the runner is designed, the existing runners need to be reviewed for their shared look and behavior.

### Lesson structure

- A chapter has multiple steps, and each step is a lesson. The chapter outline in `roadmap.md` lists steps, not lessons.
- Chapter 0 is drafted as five steps and a summary: `01-what-an-assistant-does`, `02-what-this-course-covers`, `03-you-own-the-code`, `04-getting-copilot-running`, `05-confidential-data`, and `06-summary`. Folder names follow the TypeScript course's `chNN-name/NN-step/` layout.
- Each step has `lesson.json`, `lesson.md`, and where relevant a starter and a solution.
- Each chapter ends with a summary with three quizzes, following the existing quiz pattern.

### Homework

- Homework evolves step by step. Early exercises use short prompts with known answers. Later exercises use specifications the learner writes in `SPEC.md` files, with a context document, debugging of the generated code, and a capstone.
- Specifications become more detailed and more the learner's own as the course progresses. Template scaffolding is removed in Stage 3. The exact fade plan is decided when we get there.
- The point of the homework is effective use of AI, not the code itself.
- Every homework step has a spoiler-gated sample solution: `solution.md` (the prompt used to build it, and the reasoning) and `solution.cs`, `solution.py`, and `solution.js`. The gate shows the reasoning note, then the code in all three languages. Modelled on the JavaScript course's homework layout, with the gate moved to the Source pane.

### Quizzes

- Quizzes follow the existing pattern: a fenced `quiz` block, one `◉` per question, `○` for wrong choices, `→` feedback, and three quizzes per summary.

### Grading and feedback

- There is no pass or fail. The course is purely educational.
- Where the learner is an employee, the course may offer an optional code review by the development team at development@databankimx.com. The option is offered, never required.

### Theory placement

- Chapter 3 (How the Model Works) stays a separate chapter. Chapter 0 introduces the model at a basic level only, and Chapter 3 covers the theory in full.

### Chapter outline

- The outline in `roadmap.md` is accepted in principle. It is expected to be refined as we go, and new steps will be added as ideas come up. Added: Chapter 9, step 9-05, test-driven development in both directions (prepared tests judging the assistant, and the assistant writing tests for the learner).

### Repository hygiene

- `resources/` is listed in `.gitignore`. Nothing has been committed yet, so no index removal is needed.

## Open decisions

1. **Policy approval wording.** Resolved. AI tools are approved by IT, and access is granted by managers.
2. **Free tier and the personal-account rule.** Resolved. The free tier is fine for learning with sample code. Company work uses a company-provided account.
3. **VS Code files in the repository.** Resolved for now. `.vscode/` stays in `.gitignore`. Specific files (`launch.json`, `tasks.json`) will be added as exceptions later.
4. **Copilot setup steps.** Checked. Findings are recorded under Tools and accounts. Menu paths must be verified again when the lesson is drafted.
5. **Runner base.** Architecture to be chosen when the runner is designed, after reviewing the existing runners' look and behavior.
6. **Harness languages.** Which languages get a behavioral test harness at launch. Proposed: Python, TypeScript, and C#.
7. **Runtime versions.** Confirm pinned versions for each language (Python 3.12 or later, Node 24).
8. **Capstone review.** Pass or fail is not used. Confirm whether the capstone uses the optional development-team review.

## Next steps

1. Done. Open decisions 1 to 3 are resolved.
2. Done. Copilot setup findings are recorded above.
3. Done, pending review. Chapter 0 is in `ch00-introduction/`.
4. Done. Runner look and feel is recorded in `RUNNER-DESIGN.md`, based on the TypeScript and JavaScript runners.
5. Done, pending review. Review the open decisions in `RUNNER-DESIGN.md`.
6. After review, build runner milestone 1: catalog, lesson view, quizzes, and the Next button, with Chapter 0 only.

---

## Start prompt

Paste this into a new session:

> I'm continuing work on the AI-assisted coding training course at `C:\Development\training\training-ai-assisted-coding`. Read `resume.md` in that folder first, in full, then `roadmap.md`. Follow the writing tone exactly, and check that every sentence is US English. Use the section "What we've already learned from the other courses" so we don't repeat mistakes or relearn lessons. Review the open decisions in `resume.md` with me, one or two at a time, before drafting anything. Don't write any lesson files until I approve the design.
