# Quick start

This guide gets the lesson runner open. The runner is a desktop window, so the course needs no server, no browser, and no accounts. Once the runner is open, the lessons explain the rest.

## Quick setup with the script

`setup.ps1` checks for Git, Node.js, Python, the .NET SDK, the C++ Build Tools, and Visual Studio Code. It installs anything that's missing with winget, clones the repository if you don't have it yet, installs the npm packages exactly as recorded in `package-lock.json`, makes sure the Electron binary is present, and runs the runner's tests. It's safe to run more than once.

Open PowerShell, go to the repository folder, and run:

```pwsh
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1
```

The `-ExecutionPolicy Bypass` part lets this one script run. It doesn't change any setting on your machine.

The script installs the following if they're missing:

- Git
- Node.js LTS, which must be version 24 or later
- Python 3.12
- The .NET 10 SDK, for the C# lessons
- The Visual Studio Build Tools with the C++ workload
- Visual Studio Code

The Build Tools need an **Administrator** PowerShell. They're about 4 to 5 GB and can take several minutes. If you aren't an administrator, the script stops at that step and says so. Open PowerShell as Administrator, then run the script again.

If you only want to check your setup, without installing anything, add `-SkipInstall`:

```pwsh
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1 -SkipInstall
```

Installing uses winget. If winget isn't available, install **App Installer** from the Microsoft Store first. Company policy can block installs, in which case the script stops and you'll need IT.

When the script finishes, it prints a summary and the commands to start the runner. Every line should say `ok`.

## If you run the script from outside the repository

If you run `setup.ps1` from a folder that isn't the course repository, the script clones the repository into `C:\Development\training\training-ai-assisted-coding`, and then runs the copy in that folder. You don't need to do anything else.

## Requirements

- Windows 10 or 11
- Node.js 24 or later, for the lesson runner and for running JavaScript files
- Python 3.12 or later, for running Python files
- The .NET 10 SDK, for running C# files
- Visual Studio 2026 or VS Code, for writing your own code
- An approved AI tool through a company account. For practice on invented examples, the free tier of GitHub Copilot is fine. Chapter 0 covers the setup.

If you installed the requirements yourself, instead of using the script, install the runner's packages once from the `lesson-runner` folder:

```pwsh
cd C:\Development\training\training-ai-assisted-coding\lesson-runner
npm ci
```

## Launch the runner

```pwsh
cd C:\Development\training\training-ai-assisted-coding\lesson-runner
npm start
```

The runner opens its window with the first lesson loaded. It remembers the lesson you were on, and it opens there next time. Close the window normally to stop it.

Run `npm start` from the `lesson-runner` folder, not from the repository root. The repository root has no `package.json`, so `npm start` there fails.

## Explore a lesson

- Use the chapter and step lists to move around. **Next** and **Previous** move through the course in order, even across chapters.
- Read the lesson in the **Lesson** tab, and predict the output before you run anything.
- Use the **Source** tab to see and edit the code. Choose the language from the tabs. The runner shows only the languages installed on your computer.
- Press **Run** (F5) to run the code and see its output.
- Press **Check** (Ctrl+F5) to check the code. The check looks for syntax errors, and where the step has an expected output, it compares the output with it.
- **Stop**, or Escape, ends a running program.
- Edits live in memory until you press **Reset**. Nothing is written into the repository.
- Homework is solved in your own file first. Then press **Show solutions (spoiler)** to open the sample solutions in all three languages, and the sample prompt where there is one. The solutions are read-only.
- Ctrl and the mouse wheel change the size of the lesson text. Ctrl+Right and Ctrl+Left move to the next and previous lesson, unless you're typing in the editor.
- You can open the lesson in its own window, to read it beside the editor.

Chapter 0 has no code, so the runner shows its text only. From Chapter 1 onward, the steps have code, and the lessons say what to expect.

## Practice folder

Chapter 1 asks you to create a practice folder outside any repository you use for work:

```text
C:\Development\ai-practice
```

Inside it, make one subfolder per chapter, starting with `ch01`. Keep every file you write for the course in these folders.

## Work outside the runner

Each step's files are in its folder in the course. You can run a step directly, from its folder:

| Language | Run | Check syntax only |
|---|---|---|
| C# | `dotnet run main.cs` | `dotnet run main.cs`: compile errors appear before any output |
| Python | `python main.py` | `python -m py_compile main.py` |
| JavaScript | `node main.js` | `node --check main.js` |

The checker can be run on the whole course, from the repository root:

```pwsh
node tools\check-course.js
```

It reports missing files, broken prerequisites, quiz mistakes, and em dashes in course documents. It prints `OK` when it finds no problems.

## Your progress

The runner saves your progress as you go, in a file outside the repository, so it's never committed:

```
%APPDATA%\training-ai-assisted-coding-runner\
```

The saved progress includes your quiz answers, which solutions you've revealed, and the last lesson you opened. To reset it, press **Ctrl+Alt+Shift+Backspace** in the runner. The quiz answers and revealed solutions are cleared, and the next start opens the first lesson.

## Troubleshooting

- **Setup says Node.js is too old.** Install the current LTS release from [nodejs.org](https://nodejs.org), open a new PowerShell window, and run the script again.
- **Setup says the C++ Build Tools need an Administrator.** Open PowerShell as Administrator, then run the script again.
- **Setup says Python 3.12 isn't found.** The Microsoft Store can leave a `python` command that prints nothing. The script looks for the real install, so run it again after Python has installed, in a new PowerShell window.
- **Setup says `npm ci` failed.** Check your network access to the npm registry, then run the script again. Don't delete `package-lock.json` to get past the error, because it's what makes the install repeatable.
- **Setup says the Electron binary won't download.** Check your network access to github.com, then run the script again.
- **Setup says the tests failed.** The message says so, and the full output is needed to find the cause. Send it to the course owner, since it means the course's own files need attention.
- **The runner says Node.js wasn't found.** Open a new terminal after installing Node.js, so it has the updated PATH, then start the runner again.
- **`npm start` fails with "package.json not found".** You're in the repository root. Change to the `lesson-runner` folder first.
- **A program runs for a long time.** Press Escape to stop it. Check the program for a loop with no end.
- **A lesson's quiz shows an error.** Report the lesson. It's a fault in the course, not in your setup.
- **Progress looks wrong, or the runner opens an old view.** Restart the runner. If it still looks wrong, reset progress as described above.
