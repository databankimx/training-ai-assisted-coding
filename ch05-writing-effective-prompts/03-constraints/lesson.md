# Constraints as Protection

A constraint tells the assistant what it must not do. Every project has rules the assistant can't see: the libraries your team has approved, the framework version you're pinned to, the patterns your reviewers reject, the code that must not change. Without a constraint, the assistant follows its defaults, and its defaults come from the most common code it has seen.

The contract in the previous step says what the code must do. Constraints say what the code must avoid. Both belong in the prompt, and the constraints are the part most often left out.

## Defaults worth guarding against

Some defaults turn up so often that they're worth naming in every prompt that touches them. For each one below, the example shows a prompt that allows the default, the same prompt with a constraint that rules it out, and the check you'd use on the output.

**Dependencies.** The assistant reaches for the package that solves the problem fastest, and it has no view of your approved list.

> Weak: Parse this CSV file and give me the rows as objects.
>
> Constrained: Python 3.12. Parse this CSV file using only the standard library. Don't import any package that isn't in the Python standard library. Return a list of dictionaries, one per row, keyed by the header row.
>
> Check: Look at every `import` line in the output. Each one must be a module from the standard library. A quick check of the import list takes seconds.

**Framework version.** The assistant may use a feature from a newer version than your project targets, and it won't mention the difference.

> Weak: Write a method that returns a value clamped between 0 and 100.
>
> Constrained: C# for .NET Framework 4.8. Write a method that returns a value clamped between 0 and 100. Use only APIs that exist in .NET Framework 4.8, so don't use `Math.Clamp`.
>
> Check: Build the output against the .NET Framework 4.8 targeting pack, not against the newest SDK. An API from a later version fails to compile, which is the failure you want to see early.

**Scope.** Left alone, the assistant changes more than you asked for: a renamed variable in a neighboring method, a reformatted block, a problem it noticed on the way.

> Weak: Fix the bug in this method.
>
> Constrained: Fix the off-by-one error in the `GetPage` method below. Change only that method. Don't rename anything, don't reformat other methods, and don't change the public signature. Return the complete method.
>
> Check: Compare the output with the original file in your diff tool. Only the `GetPage` method should show changes, and the method signature should be identical.

**Patterns.** Some shortcuts work in one part of a codebase and fail in another.

> Weak: Add a cache for the currency rates.
>
> Constrained: Add a cache for the currency rates. Don't use static fields or a singleton. The cache is held by an instance of `RateService`, which is passed in through its constructor. Rates expire after ten minutes.
>
> Check: Search the output for the words `static` and `Instance`. A static field would be the shortcut the constraint was written to prevent.

**Output shape.** The assistant often returns a paragraph of explanation, three alternatives, and the code, when you wanted only the code to paste.

> Weak: How do I read an environment variable in Python?
>
> Constrained: How do I read an environment variable in Python? Return only the code, with no explanation, and no alternatives. Use the standard library.
>
> Check: The output should be one code block and nothing else. If it isn't, the constraint didn't hold, and the follow-up step covers what to do next.

**Behavior that must not change.** Sometimes the new code is allowed to add a feature but not to change an existing result.

> Weak: Add logging to the `Withdraw` method.
>
> Constrained: Add a log line at the start and end of `Withdraw`. The method's return values, exceptions, and the order of its side effects must not change. Don't add a new parameter.
>
> Check: Run the existing tests for `Withdraw` before and after the change. The results must match. A log line that alters behavior is a bug, however useful the log looks.

**Security-sensitive defaults.** The assistant may build a query by joining strings, which is a well-known way to create a SQL injection vulnerability.

> Weak: Write a function that looks up a customer by name.
>
> Constrained: Write a function that looks up a customer by name using a parameterized query. Never build the SQL string by joining or formatting the name into it.
>
> Check: Search the output for string concatenation or interpolation near the query text. The name must appear only as a parameter.

## Constraints you can test

A constraint is only useful if you can check it. "Write clean code" is a wish. "No method longer than forty lines" can be measured. "Don't use LINQ" can be found with a search. "Use only the standard library" can be checked against the import list.

Before you send a prompt, read each constraint and ask how you'd check it on the output. If you can't name the check, rewrite the constraint until you can.

Here are a few vague constraints, each followed by a version you can test:

> Vague: Keep it simple.
>
> Testable: No method longer than thirty lines, and no more than two levels of nesting.

> Vague: Make it efficient.
>
> Testable: Don't load the whole file into memory. Read it one line at a time.

> Vague: Use good naming.
>
> Testable: Boolean methods start with `Is`, `Has`, or `Can`. Collections are named in the plural.

> Vague: Handle errors properly.
>
> Testable: Catch only `IOException`. Let every other exception propagate, and don't log and swallow exceptions.

> **Aside: why defaults are so hard to see.**
> A default doesn't look like a decision. Nobody in the conversation chose to add a package or to start from zero. The assistant simply produced the most likely code, and that code carried the most likely choices with it. Chapter 3 described the mechanism, and the lesson here follows from it: when you can't see a choice being made, you have to write the rule down so it's made deliberately.

## Where constraints go

Put constraints in the same prompt as the contract, and keep them short and specific. A list of constraints at the end of the prompt is easy to read, and easy to check against the output later. If a constraint applies to every prompt on a project, it belongs in the context document that Chapter 6 covers, so you don't retype it each time.

## Try it

Choose a project you work on, or a practice project if you prefer. Write down five defaults an assistant might choose there that would be wrong for your project. For each one, write a weak prompt, a constrained version, and the check you'd use to confirm the constraint held. Save the three versions of each in a file called `constraints.txt` in your practice folder.

---
