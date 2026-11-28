# Quick start

This guide gets the lesson runner open. The runner is a desktop window, so the course needs no server, no browser, and no accounts. Once the runner is open, the lessons explain the rest.

## Quick setup with the script

### What gets installed

By default, the setup installs:

* Notepad++
* Git
* PowerShell 7
* Node.js 24 or newer
* Python 3.12
* .NET SDK 10
* Microsoft Visual C++ runtime
* VS Code, with the extensions ms-dotnettools.csharp, ms-dotnettools.csdevkit, ms-python.python

The C++ Build Tools aren't installed up front. The script installs them only if Electron's binary can't download.

The setup then runs these steps: Lesson runner packages; Lesson runner tests. At the end it opens the repository in VS Code and starts the lesson runner window (Electron).

### Getting started

There are three methods available to set up this tutorial. They are currently Windows-only.

#### Full Automation (if you don't have Git currently set up)

This process will install Git and copy the repository to a subfolder of `C:\Development\training` and install all necessary software and extensions for the tutorial's lesson runner.

1. Obtain the tutorial's GitHub slug name, which is `training-ai-assisted-coding`
2. Open PowerShell using "Run as Administrator"
3. Run the script below

```pwsh
# Obtain the load tutorial script
irm https://raw.githubusercontent.com/databankimx/training-shared-template/main/load-tutorial.ps1 -OutFile "$env:TEMP\load-tutorial.ps1"

# Perform automated setup
powershell -NoProfile -ExecutionPolicy Bypass -File "$env:TEMP\load-tutorial.ps1" -RepoUrl https://github.com/databankimx/training-ai-assisted-coding.git
```

#### Automated Setup from Local Repo (assumes you already have Git installed and set up)

In this process, you pull the existing repository and then run its setup script, which installs all necessary software and extensions for the tutorial's lesson runner.

1. Obtain the tutorial's GitHub slug name, which is `training-ai-assisted-coding`
2. Open PowerShell using "Run as Administrator"
3. If you will use the default base directory `C:\Development\training`, run the following:

```pwsh
# Create the base folder if it doesn't exist yet
New-Item -ItemType Directory -Force -Path C:\Development\training | Out-Null
```

4. Clone the repository. If you're using a different base directory, replace `C:\Development\training` with your path:

```pwsh
# Go there and clone the tutorial
cd C:\Development\training
git clone https://github.com/databankimx/training-ai-assisted-coding.git
cd training-ai-assisted-coding
```

5. If desired, edit the setup configuration, which determines what software is installed automatically (see "Change what gets installed" below)

```pwsh
# Optional: edit setup.json before installations
notepad setup.json
```

6. Save the configuration if you edited it, then run the setup script

##### If using the default base path, run this:

```pwsh
# Run the setup
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1
```

##### If using a different base path, replace `<BASE_DIR>` with your path and run this:

```pwsh
# Run the setup
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1 -BaseDirectory <BASE_DIR>
```

#### Manual Setup from Local Repo

If you want to do everything manually, you can pull the repository and set up software on your own.

1. Obtain the tutorial's GitHub slug name, which is `training-ai-assisted-coding`
2. Run the script below

```pwsh
git clone https://github.com/databankimx/training-ai-assisted-coding.git
```

3. Review README.md and QUICKSTART.md in the repository for instructions for manual setup.

### Switches and notes

* `-SkipInstall` checks what's installed and installs nothing.
* `-NoLaunch` runs the setup but doesn't open VS Code or start the runner.
* `-SkipTests` skips the course tests, which the setup runs by default.
* Installing uses winget. If winget isn't available, install **App Installer** from the Microsoft Store first. Company policy can block installs, in which case the script stops and you'll need IT.
* If an install needs administrator rights, the script stops before installing anything and asks you to run it again from an Administrator PowerShell window.

### Change what gets installed

The settings are in `setup.json`, in the repository folder. Open it in any text editor:

* Set an install's `"install"` to `true` to include it, or `false` to skip it.
* `"pinned"` sets the version. `"extensions"` lists the VS Code extensions to add.
* Save the file, then run `setup.ps1` again. It skips what's already installed.

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
- **The first C# run prints a long .NET welcome message and waits.** This happens once, the first time the .NET SDK runs on your computer. Press Escape to stop it, then run the file again. After that, C# runs as expected.
- **A program runs for a long time.** Press Escape to stop it. Check the program for a loop with no end.
- **A lesson's quiz shows an error.** Report the lesson. It's a fault in the course, not in your setup.
- **Progress looks wrong, or the runner opens an old view.** Restart the runner. If it still looks wrong, reset progress as described above.
