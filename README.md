# DataBank IMX - AI-Assisted Coding Training

## License and Support

This repository is provided under the [MIT License](LICENSE). You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell the materials in this repository, subject to the terms of that license.

This repository is provided for training and reference purposes only. DataBank IMX does not provide warranties, guarantees, maintenance, troubleshooting, implementation assistance, or technical support for this code or its use. Use it in any way permitted by the MIT License, but you are responsible for evaluating, adapting, testing, and supporting any use of it in your own environment.

---

### What is this repository for?

* A course on using AI coding assistants well: choosing the right way to work, writing clear requests, giving the assistant context, reviewing what it produces, and knowing when not to use it
* Chapter-by-chapter lessons in C#, Python, and JavaScript. Each example is shown in all three languages, and the lesson runner lets you choose which one you see
* A desktop lesson runner (Windows) that shows each lesson, runs its code, and gates the sample solutions behind a spoiler, so you can try first
* Every lesson's sample solutions can also be run directly, without the runner. See [Running a sample file directly](#running-a-sample-file-directly)
* The course is written around the ideas, not one product. The company's list of approved AI tools changes, and the course does not depend on it

---

## About

- **Author:** [Scott McLean](mailto:smclean@databankimx.com)
- **Purpose:** Internal training for everyone at DataBank IMX who writes, reviews, or uses code, on the rules that apply when AI tools are part of the work

---

## DataBank Responsibilities for Custom Code

All DataBank employees - including those working with AI-assisted tools - are bound by the [Development Rules of Engagement](development-rules-of-engagement.md). That document defines the rules for quoting, approving, developing, reviewing, scanning, storing, and delivering custom code for client work.

Key obligations that apply to everyone on every custom code engagement:

- **You own the code you deliver.** This applies equally to hand-written code, AI-assisted code, and AI-generated code. "The AI wrote it" is not an acceptable explanation for a production issue, a failed review, a security finding, or a support problem.
- **Code must be reviewed before delivery.** Review is interactive and must confirm that the code works, meets DataBank standards, is maintainable, and that the developer understands it well enough to explain, debug, and maintain it. Polished or well-formatted output - including AI-generated output - is not evidence of correctness.
- **Code must be in source control before delivery.** All custom code must be committed to the appropriate DataBank GitHub Enterprise repository before it is delivered to a client, regardless of whether the client receives source code, compiled binaries, or deployed functionality.
- **CI scanning must pass before delivery.** Required checks are the standards policy scan, SonarQube, and Snyk. A passing local build is not a substitute.
- **All third-party dependencies must be license-vetted.** The license must permit closed-source commercial use. Copyleft or unclear licensing must be escalated before use. Dependencies must not be added simply because an AI tool suggested them.
- **Only approved AI tools may be used.** Use only IT-approved tools through company accounts. All data entered into AI systems is subject to the [DataBank AI Acceptable Use Policy](https://workforcenow.adp.com/mascsr/wfncontenttools/file-management/file/JTJGc3RhdGljJTJGY2xpZW50cyUyRmNvbnRlbnQlMkZBSStBY2NlcHRhYmxlK1VzZStQb2xpY3kucGRmJTNGMTc3MTM0NzA4NjE4MQ==) and must be treated as confidential by default.
- **Custom code is billable work.** Code must be tied to an approved quote or engagement before commitment or delivery. Development quotes require approval from the Development Director or delegated development leadership before being sent externally.
- **Exceptions require explicit approval.** Time pressure alone is not a reason to bypass quote approval, source control, review, or CI scanning.

See the [Development Rules of Engagement](development-rules-of-engagement.md) for the full policy, including billing and quoting rules, source-code delivery rules, the delivery readiness checklist, and the exception process.

---

## Course structure

| Path | Contents |
|---|---|
| `ch00-introduction/` | What an assistant does, what this course covers, ownership, setting up GitHub Copilot, and the confidential-data rules |
| `ch01-first-interaction/` | Setting up your tools, letting the assistant finish a function, reading before you accept, rejecting or refining a suggestion, homework, and a summary |
| `lesson-runner/` | The desktop lesson runner (Electron) |
| `resources/` | Internal reference material. Not in this repository; see [Known conflicts](#known-conflicts-and-compatibility-notes) |

Each lesson is a folder with `lesson.json` (title, languages, and metadata) and `lesson.md` (the text). Code steps also have a starter (`main.cs`, `main.py`, `main.js`) and a solution (`solution.cs`, `solution.py`, `solution.js`) for each language. Homework steps have a `prompt.md` with the sample prompt and the reasoning behind it.

---

## Running the course

### Lesson runner (recommended)

The lesson runner is the easiest way through the course. It shows each lesson, lets you run and check the code in C#, Python, and JavaScript, and keeps your place between sessions.

```powershell
cd lesson-runner
npm install
npm start
```

Use the Lesson and Source tabs for the text and the code. Choose a language from the tabs, then press **Run** to run your code, or **Check** to check it for syntax errors and, where the step has an expected output, to compare the output with it. **Show solutions (spoiler)** opens the sample solutions in all three languages, and the sample prompt in `prompt.md`.

Keyboard shortcuts:

| Key | Action |
|---|---|
| Ctrl+Right, Ctrl+Left | Next and previous lesson (not while typing in the editor) |
| Ctrl with the mouse wheel | Change the lesson text size |
| Escape | Stop a running program |
| Ctrl+Alt+Shift+Backspace | Clear saved progress: quiz answers, spoiler states, the last lesson, and solution reveals |

The runner shows only the languages that are installed on your computer. If none are installed, see [Setup and requirements](#setup-and-requirements).

### Running a sample file directly

You can work through the course without the runner. Each step's files are in its folder under the course root. Copy a starter into your practice folder, then run it, or run a solution to see the expected output.

Make your practice folder once, following Chapter 1, step 1. We suggest `C:\Development\ai-practice\ch01`.

To run a file, open a terminal in the folder that contains it and use the command for its language:

| Language | Run | Check syntax only |
|---|---|---|
| C# | `dotnet run main.cs` | `dotnet run main.cs` (compile errors appear before the program's output) |
| Python | `python main.py` | `python -m py_compile main.py` |
| JavaScript | `node main.js` | `node --check main.js` |

For example, to run the Chapter 1, step 2 solution in Python:

```powershell
cd C:\Development\training\training-ai-assisted-coding\ch01-first-interaction\02-let-the-assistant-finish
python solution.py
```

The expected output for each step is listed in `lesson.json` (the `expected` field) and in the lesson. Compare your output with it. A starter file shows a different result on purpose, because the placeholder is not finished.

Each step's sample solution is in the same folder as its starter. Read the lesson before you open the solution, so you try the step first.

---

## Setup and requirements

- Windows 10 or Windows 11
- Node.js 24 or later (for the lesson runner, and for running JavaScript files)
- Python 3.12 or later (for running Python files)
- .NET 10 SDK (for running C# files)
- An approved AI tool through a company account. For practice on invented examples, the free tier of GitHub Copilot is fine. Chapter 0 covers the setup.
- Visual Studio 2026 or VS Code, for writing your own code

The runner runs Python, C#, and JavaScript only when the matching tool is installed. A missing tool hides its tab rather than failing.

> `setup.ps1` installs these tools with winget, clones the course, and installs the lesson runner's packages. Run it with `powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1`, then `npm start` in `lesson-runner`.

---

## Third Party Licenses

| Component | License | Used for |
|---|---|---|
| Electron | MIT | The lesson runner's desktop window |
| markdown-it | MIT | Rendering lesson Markdown |
| highlight.js | BSD-3-Clause | Coloring code in the lessons and the editor |

All three are approved for closed-source commercial use under the Development Rules of Engagement.

---

## Known conflicts and compatibility notes

- **Platform:** the lesson runner is for Windows. Other platforms are untested.
- **Solution files:** the Chapter 1 homework's `solution.md` has been removed. Its reasoning is in `prompt.md`.
- **Links to internal documents:** the links in the sections above point to files in the DataBank repositories. Copies may not be in this repository, and the `resources/` folder is excluded from it on purpose, because it holds internal material. Check the links before you rely on them.

---

## Version history

| Date | Changes |
|---|---|
| 11/10/2026 | Initial version. Chapter 0 and Chapter 1 (drafted), the lesson runner with Run, Check, the solution gate, the prompt file, and syntax and output checks |

---

## Contact

- [Scott McLean](mailto:smclean@databankimx.com)
- [Dev Team](mailto:development@databankimx.com)
