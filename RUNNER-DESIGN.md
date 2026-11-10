# Runner design (for review)

Status: draft for review. Chapter 0 lesson files are written and are waiting on the same review. No runner code exists yet.

## Goals

1. Learners can read each lesson, run and check its code in several languages, and move between steps without leaving the runner.
2. The runner looks and behaves like the TypeScript and JavaScript runners, so the interface is familiar. Where we differ, the difference is listed below.
3. The runner works offline and never runs anything that the learner did not ask for.
4. The runner is tested well enough that a broken runner fails in CI, not in front of a learner.

## Look and feel: what must match

The new runner copies the layout and styling of the TypeScript and JavaScript runners. These details are the ones learners will notice, so they are listed explicitly.

- **Window.** An Electron desktop window, the same as the TypeScript and JavaScript runners. No browser tab.
- **Theme.** Dark by default, with a light theme switch at the top right of the header. Colors come from CSS variables on `:root`, with a `body.light` override. The palette matches the existing runners: blue accent `#0078d4`, dark panels, and the same syntax-highlight colors.
- **Brand bar.** A blue bar at the top of the sidebar with a logo and the course name, "AI-Assisted Coding Training."
- **Sidebar.** About 300 px wide, with two panes. Chapters sit on top, about 55% of the height. Steps sit below, for the chapter the learner has selected. Chapters and steps have the same hover and selected states as the other runners.
- **Header.** The current step title on the left. On the right: the theme switch, then the Run and Check buttons. Run and Check share a fixed size so the header doesn't shift when a button changes state.
- **Output pane.** Above the source pane, with OUTPUT in a small label bar, copy and clear icons, an input row for stdin, Send, and Stop (Esc).
- **Source pane.** About 42% of the height at the bottom, with tabs for Source and Lesson on the left, and a modified indicator, Reset, pop-out, and copy icons on the right. Multi-file steps show a file selector, as the JavaScript runner does.
- **Lesson rendering.** Markdown rendered with raw HTML turned off. Ctrl and the mouse wheel change the lesson text size, as in the TypeScript runner.
- **Quizzes.** The same `quiz` block styling and interaction as the other runners: a right-answer highlight, a wrong-answer highlight, and feedback text beneath each choice.
- **Spoilers.** Homework solutions are hidden behind a "Show solution (spoiler)" panel, as in the JavaScript runner.
- **Spoilers in the lesson text.** A fenced block labeled `spoiler` in `lesson.md` renders as a hidden panel with a "Show example (spoiler)" button, the same as the homework panel but read-only and without a run button. It is used for short examples inside a lesson, such as a sanitized prompt, and it is not a substitute for homework solutions.
- **Pop-out and re-dock.** The lesson can open in its own window, showing only the lesson, with a re-dock button to return it to the main window.
- **Toast.** Short confirmations appear at the bottom center and fade out.

## What is new

1. **The Next button.** Explained in its own section below.
2. **Several languages.** Each step declares its runtime. The runner has one adapter per runtime, so adding a language means adding one adapter and its harness, not rewriting the runner.
3. **Runtime-free steps.** Steps with no code (such as Chapter 0) declare `"runtime": "none"`. Run and Check are disabled. The output pane stays in place and says "This step has no code to run." The layout does not change, so the interface stays familiar.
4. **Behavioral checks.** Where a solution is in a different language from the student's code, Check runs the learner's code against shared test vectors rather than comparing text. See the homework section below.

## The Next button

The Next button lets the learner move to the following step, even when that step is in a different chapter.

- **Where it appears.** In the lesson pane, in both docked and popped-out windows. It sits at the bottom of the lesson text, after the last quiz, so it is easy to find at the end of a step, and it also appears in the header of the popped-out window so the learner doesn't have to scroll.
- **Label.** "Next" with an arrow. A tooltip, and a small line beneath the button in the lesson pane, show the title of the next step, such as "Next: Getting Copilot Running."
- **Order.** Catalog order. Chapters are ordered by folder name. Within a chapter, steps are ordered by folder name, and homework comes after the chapter's last step and before the next chapter's first step.
- **Across chapters.** Next crosses chapter boundaries. The sidebar's chapter and step selection moves to the new step, and the lesson pane shows it.
- **At the end of the course.** Next is disabled on the final step, with the tooltip "This is the last step." No wrap-around.
- **Spoilers.** Next never opens a solution. The learner still has to press "Show solution" on a spoiler step.
- **Keyboard.** Ctrl+Right Arrow moves to the next step, and Ctrl+Left Arrow moves back. Both work in the docked and popped-out windows.
- **Progress.** Moving to a step records it as visited in progress storage. It does not mark anything as passed, because the course has no pass or fail.
- **Unsaved edits.** Moving on discards unsaved edits (see state below), so Next does not ask for confirmation. Learners keep their work in their own solution folders, so nothing important lives only in the runner.

### Next in the popped-out window

A popped-out lesson is its own window with its own current step. Two behaviors are proposed, and this needs your decision:

- **Option A (proposed):** The popped-out window keeps its own step. Re-docking returns the popped-out window's current step to the main window, and the main window's sidebar follows it.
- **Option B:** Next in the popped-out window also moves the main window's sidebar, so both stay in step. This is more complicated, because two windows would fight over one selection.

## Source pane: language tabs and file selector

The source pane serves two purposes: it shows code in several languages, and it shows the Markdown files that learners give to an AI assistant (context documents and specifications).

- **Language tabs.** Every code example has a tab for each course language: C# (the default), Python, and JavaScript. The learner switches tabs to see the same example in another language. The tabs sit beside the existing Source and Lesson tabs, and the learner's last choice is remembered.
- **Toolchain validation.** At startup, the runner checks the toolchain for each language (`dotnet`, `python`, and `node`). A tab appears only when its toolchain runs. A language whose toolchain is missing has no tab, rather than a greyed-out one. If no toolchain is available, the runner says so and points to the setup page.
- **Lesson text follows the tab.** Code blocks in the Lesson tab show the variant for the selected language, so the lesson and the source stay in step.
- **Default.** C# opens first. A learner who has chosen another language keeps that choice in later steps until they change it.
- **Each tab runs its own code.** Run and Check use the runtime of the selected tab. C# uses `dotnet`, Python uses `python`, and JavaScript uses `node`. Output shows which language ran.
- **File selector.** A drop-down lists the files in the step. Code files appear under the selected language tab. Markdown files for AI, such as `CONTEXT.md` and `SPEC.md`, are language-neutral, so they appear under every tab. The drop-down is part of the source pane, as in the JavaScript runner's multi-file steps.
- **Lesson metadata.** `lesson.json` lists the language variants of each code file, and the course checker fails any code example that is missing a variant.
- **Copies.** Each language variant is a separate file in the step folder, for example `main.cs`, `main.py`, and `main.js`.
- **Behavioral checks.** Homework checks run against the test vectors, not the variants, so the check works the same way whichever language the learner chose. See the behavioral checks section.

This design adds authoring work: every code example needs every variant. The course checker is what keeps that work honest.

## State and persistence

The JavaScript runner saves progress, the last lesson opened, and drafts of the learner's code. This runner saves progress and the last step, but not drafts. Edits last only while the learner is on the step. Learners are expected to keep their own solution folders for their work, so the runner does not need to store drafts.

- Progress and the last step are saved in the user data folder, not in the repository. Nothing is written into the repository.
- Edits last only while the learner is on the step. Reset restores the step's starter file. Moving to another step discards unsaved edits, including edits in the "try this" exercises. Learners create their own solution folders for their work.
- Progress is never committed, and it can be deleted by the learner at any time.

## Existing runners reviewed

The seven tutorials each have a runner. They use different stacks, which matters for the architecture choice below.

| Course | Shell | Lesson UI | Notes |
|---|---|---|---|
| TypeScript | Electron | HTML, CSS, and TypeScript in the renderer; CodeMirror 6; markdown-it | Reference for the look. Runs student code as child processes. |
| JavaScript | Electron (desktop) and Node HTTP server (web) | HTML, CSS, and JavaScript; the desktop version reads progress and drafts from the user data folder | Reference for the feature set: catalog, state, drafts, spoilers, visualizers. |
| Python | Qt WebEngine (Python application) | HTML rendered by MathJax and Prism inside WebEngine | Separate pop-out, pause and input handling. Web chapters build and run Django and Flask projects. |
| C | Native C host (CMake) with WebView2 | HTML, CSS, and JavaScript in `web/` | Same design as C++. Includes a WebView2 guide. |
| C++ | Native C++ host (CMake) with WebView2 | HTML, CSS, and JavaScript in `web/` | Checkpoint tool, JSON through nlohmann. Windows only. |
| Java | Java application with JCEF (embedded Chromium) and a local web server | HTML, CSS, and JavaScript in `web/` | Heavy runtime. Bundles Chromium. |
| Rust | Tauri (Rust with the system webview) | Vanilla HTML, CSS, and JavaScript in `src/` | Template-based. Needs Rust to build the runner. |
| C# and OnBase | WPF on .NET 10 (Windows) | Native WPF; AvalonEdit; Markdig rendered to FlowDocument | Its own `Lessons/` folder format and solution-based discovery. Shares its parser through `LessonRunner.Core`. |

Two patterns stand out. Six of the eight runners (TypeScript, JavaScript, C, C++, Java, and Rust) put the interface in HTML, CSS, and JavaScript, and hide that interface inside a native shell. The look is shared by copying the stylesheet. The C# and Python runners are the exceptions. The C# runner is WPF, and the Python runner is Qt.

## Platform and setup decisions

- **Platform.** Windows only, for the first version. This is the platform the course is taught on, and it keeps the setup and testing scope small.
- **Shell.** Electron, as recommended. The latest TypeScript and JavaScript runners are both Electron-based, and they are the reference for the fullest feature set.
- **Build tools.** Electron's binary download can fail, and the fix is to rebuild native modules with the Visual Studio C++ environment loaded. The setup script therefore needs the Visual Studio Build Tools with the C++ workload (`Microsoft.VisualStudio.Workload.VCTools`, with recommended components), installed through winget with an `--override` argument. It loads the environment with `vcvars64.bat` before the rebuild, as the TypeScript setup script does.
- **Python 3.** `node-gyp` needs Python 3, and the Build Tools installer does not include it. The setup script checks for it and points to the install command.
- **Install switch.** The TypeScript setup script installs missing tools only with `-InstallMissing`, and it needs an elevated PowerShell for that. The setup-script discussion in the resume decides how that switch works with the language list.
- **Starting point.** The setup script for this runner starts from the TypeScript `setup.ps1`, which already has the Git, Node.js, Build Tools, Python, npm, Electron, and VS Code checks.

## Architecture options

We need a runner that runs C#, Python, and JavaScript, shows the same look as the TypeScript and JavaScript runners, and supports the features listed above. Four options fit.

1. **Electron, with the JavaScript runner's renderer (recommended).** The TypeScript and JavaScript runners already use this shell and look, so the new runner matches them most closely. The JavaScript renderer already has the catalog, state, drafts, and spoiler code we want. Running `dotnet`, `python`, and `node` as child processes works the same from Electron. It is cross-platform, and its main cost is the Chromium bundle size, which is acceptable for a desktop tool.
2. **WebView2 host in C#, with the same HTML, CSS, and JavaScript.** This matches the C# and C++ runners and the C# course's own skills, since the host would be a C# application. It is Windows only, which matches our current platform. It keeps the look because the interface is the same web code. It adds a second build toolchain that our TypeScript and JavaScript developers would not otherwise need.
3. **WPF, as in the C# runner.** This reuses the C# runner's conventions, and the C# course's runner code could be shared. It would look different from the TypeScript and JavaScript runners, because the interface would be rebuilt in XAML, so the look-and-feel requirement would take real effort to meet.
4. **Tauri, as in the Rust runner, or Qt, as in the Python runner.** Both are viable, but each adds a toolchain that is not one of our course languages. We would also be learning a shell that the other runners do not use.

Recommendation: option 1. It is the closest match to the look and feature set we have asked for, and the renderer code already exists in the JavaScript course. Option 2 is the fallback if we decide that the runner should run only on Windows and be built with .NET.

## Architecture

- **Shell.** Electron with context isolation and the sandbox on. The page has no direct Node access. A small preload script exposes only the functions the UI needs.
- **Content Security Policy.** The same policy as the TypeScript runner: `default-src 'none'`, scripts only from the app itself, and no network access.
- **Main process.** Loads the catalog, runs the child processes for Run and Check, and reads and writes the state file.
- **Catalog.** Scans folders named `chNN-*` for `lesson.json`, in folder-name order. Helper folders are ignored. Chapter 0 is the `ch00-introduction` folder.
- **Runtime adapters.** One per runtime. Each adapter has three parts: `detect` (is the runtime installed, and what version), `run` (start the step's entry file as a child process), and `check` (optional, for languages with a compiler or type checker). The first adapters are `none`, `node`, `python`, and `dotnet`. Others are added when a chapter needs them.
- **Runtime requirements.** A missing runtime is reported with a clear message and a pointer to the course's setup page. The runner never installs anything. Installation belongs to the setup script, behind an opt-in switch such as `-InstallMissing`, as in the TypeScript course.
- **Child processes.** The working directory is the step's folder. Each run has a timeout (10 seconds by default), a Stop button, and captured stdout and stderr. Input typed into the input box goes to the child's stdin.
- **Editor.** CodeMirror 6, as in the TypeScript runner, with syntax highlighting for the course languages. Edits stay in the state storage described above.

## lesson.json

The metadata fields are the same as the other courses, with a few additions.

- `title`, `minutes`, `objective`, `prerequisites`, `expected`, `verify`: as in the TypeScript course.
- `runtime`: `none`, `node`, `python`, `dotnet`, and later others.
- `entry`: the file the runner starts for Run, such as `main.py`.
- `files`: the list of files shown in the file selector, for multi-file steps.
- `section` and `spoiler`: as in the JavaScript course, for homework.
- `harness` (optional): the name of the behavioral harness to use for Check, for homework with test vectors.

Prerequisites refer to other lessons by exact title. The course checker enforces that titles match.

## Behavioral checks across languages

This is the design for homework where the solution is in a different language from the learner's code.

- Each exercise has a `tests/vectors.json` file with inputs, expected outputs, and a few error cases. The vectors do not depend on any language.
- The course provides a small harness for each supported language. The harness reads the vectors, calls the learner's code in the usual way for that language, and reports which vectors passed and which failed.
- Check shows the results per vector. It doesn't say whether the learner's code matches the solution. It says whether the behavior matches the specification.
- The harness languages at launch are Python, TypeScript, and C#, as proposed in the resume. Others follow when a chapter needs them.

## Security and offline use

- Electron's sandbox and context isolation stay on. The preload exposes only the functions the UI needs.
- The app makes no network requests. A lesson that needs the network must say so in its objective, and it is not a default.
- Child processes run in the step's folder with a short timeout and no inherited secrets beyond what the runtime needs.
- The runner never executes code from the internet, and it never executes AI-generated output at runtime. Chapter 13 explains why, and the runner has no feature that would make it easy.

## Tests

- **Unit tests.** Catalog order, including homework placement and chapter boundaries. The `lesson.json` schema. Next and Previous, including the disabled state at the first and last steps. Run output capture, timeout, and Stop. Check results per vector. The quiz parser.
- **Lesson tests.** Every lesson's `verify` text appears in the output of its solution (where one exists). Every prerequisite title matches a real lesson. Every code lesson has a runtime the runner supports. Every quiz has exactly one correct option.
- **App check.** A manual pass through Chapter 0 and the first code step, in the runner, before each release. Check the Next button at the chapter boundary, both docked and popped out.

## Platforms

Windows first, the same as the other courses. Other platforms are untested until someone needs them.

## Milestones

1. Catalog, lesson view, quiz rendering, and the Next button, with Chapter 0 only. No code execution yet.
2. Run with timeout, Stop, and input, for `node` and `python`.
3. Pop-out and re-dock, with the option chosen for the popped-out Next behavior.
4. Check with the per-runtime checks, and the first behavioral harness.
5. `dotnet` runtime, and the C# harness.
6. Setup script, tests, and the manual app check.

## Open decisions

1. **Popped-out Next.** Option A or Option B, as described above.
2. **Keyboard shortcuts.** Ctrl+Right and Ctrl+Left are proposed for Next and Previous. Confirm, or pick others that don't clash with the editor.
3. **Drafts and progress.** Resolved. Progress and the last step are saved. Drafts are not kept between navigations.
4. **Output pane on runtime-free steps.** The proposal keeps the output pane with a short message, so the layout stays the same. Confirm, or prefer hiding it.
5. **Brand logo.** The runners use a logo file for the brand bar. Confirm whether this course needs its own logo.
6. **Harness languages and runtime versions.** Carried over from the resume: Python, C#, and JavaScript first, with Python 3.12 or later and Node 24. TypeScript is dropped from the harnesses too.
7. **TypeScript tab.** Resolved. TypeScript is dropped.
8. **Code blocks in the lesson text.** Resolved. They follow the selected tab.
9. **Drafts across tabs.** Resolved. No drafts are kept, so this does not arise.
