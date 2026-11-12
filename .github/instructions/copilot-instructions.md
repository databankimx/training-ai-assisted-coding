---
applyTo: "**/*"
---

# GitHub Copilot Instructions - DataBank Development Standards

## Purpose
This file defines how GitHub Copilot should generate code for DataBank IMX development teams.
All generated code must align with internal standards for quality, maintainability, security, and consistency.

## Scope
This repository is an **AI-assisted coding training course**. Lessons and samples are written in C#, Python, and JavaScript, and the lesson runner (`lesson-runner/`) is an Electron app written in JavaScript. Follow the **Common Standards** section and the section for the language of the file you are working on.

---

## Common Standards

### General Principles
- Prioritize **readability, maintainability, and clarity** over brevity.
- Follow **DataBank coding standards** at all times.
- Assume code will be **reviewed, tested, and deployed to client environments**.
- Avoid unsafe, experimental, or non-production-ready patterns.
- Do not introduce unnecessary dependencies or frameworks.
- Third-party packages **must** have licenses that allow closed-source commercial use.
- Prefer existing project patterns over introducing new architectural or library choices.

### Architecture and Design
- Prefer clear separation of concerns.
- Avoid tightly coupled designs.
- Design for reuse and extensibility.
- Keep controllers, endpoints, and entry points thin; place business logic in services or domain components.
- Match the structure and conventions already used by the repository unless the user explicitly requests a redesign.

### Error Handling and Security
- Validate all inputs.
- Avoid exposing sensitive information in exceptions, logs, API responses, or console output.
- Follow least-privilege principles.
- Do not generate insecure defaults, hardcoded secrets, or bypass validation/authentication/authorization checks.
- Exception and error messages must be clear, concise, grammatically correct, and end with a period.

### Comments and Documentation
- Write comments only when necessary.
- Use clear, concise US-English.
- Document complex logic, non-obvious decisions, and important operational behavior.
- Avoid comments that merely restate the code.

### Source Control and Workflow
- All code must be tracked in source control.
- Commit early and often.
- Use meaningful commit messages.
- Link commits to tasks, issues, bugs, or enhancements where appropriate.
- Use branches and pull requests for review; do not commit directly to protected mainline branches.

### Code Reviews and Quality Gates
- All code must be reviewed before merge or delivery.
- Address correctness, readability, performance, security, and maintainability.
- Where applicable, code must pass SonarQube or other required quality gates before merge.

### Testing and QA Expectations
- Follow a **test-driven mindset** where practical.
- Ensure new code is testable.
- Include unit tests and integration tests where appropriate.
- Consider edge cases, invalid inputs, failure scenarios, and regression risk.

### Prohibited Practices
- Do NOT generate hardcoded credentials, secrets, tokens, or connection strings.
- Do NOT introduce unapproved third-party libraries.
- Do NOT expose internal implementation details unnecessarily.
- Do NOT produce code that violates DataBank IP, security, or delivery policies.

---

## JavaScript Project Instructions (lesson-runner and tools)

- Target Node.js 24 or later. Use CommonJS modules, matching the existing files.
- Keep Electron main-process code, preload code, and renderer code separate. Keep business logic in `lesson-runner/core/` so it can be tested without Electron.
- Do not enable Node integration in the renderer. Expose only what is needed through `preload.js`.
- Unit tests **must** use the built-in `node:test` runner with `node:assert`. Add new test files to the `test` script in `lesson-runner/package.json`.
- Run tests with `npm test` in `lesson-runner`.
- Run `node tools/check-course.js` after changing course content.
- Do not add npm dependencies without confirming the license allows closed-source commercial use.

## Python and C# Sample Files

- Python and C# files in the chapter folders are lesson starters and solutions. Keep them short, runnable on their own, and consistent with the lesson text and the `expected` output in `lesson.json`.
- Python samples target Python 3.12 or later. C# samples are single-file programs run with `dotnet run main.cs` on the .NET 10 SDK.
- Starter files are intentionally incomplete. Do not "fix" them.
- Keep the three language versions of a step equivalent in behavior.

## Training Repository Notes

- This repository contains training content. Lesson, starter, and solution files under the `chNN-*` folders are reference material, not production code. Do not apply production hardening standards to them.
- `lesson-runner/` and `tools/` are production-quality code and follow the Common Standards.
- Scott's lesson and try-it-yourself files follow the established training conventions for this repository.
- Do not use em dashes in lesson text. `tools/check-course.js` enforces this.

---

## Copilot Behavior Guidelines

When generating code, Copilot should:
- Follow all applicable rules in this document automatically.
- Prefer existing project patterns over new ones.
- Match surrounding code style closely.
- Avoid speculative implementations.
- Ask for clarification through comments or generated TODO notes only when requirements are genuinely unclear.

---

## Definition of Done

Generated code is acceptable only if it:
- Runs successfully without warnings in the target project context.
- Passes required static analysis and quality gates where applicable.
- Follows the standards in this file for its language.
- Includes appropriate validation, error handling, and logging.
- Is readable, maintainable, and testable.
