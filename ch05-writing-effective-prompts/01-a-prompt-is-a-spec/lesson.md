# A Prompt Is a Spec

A prompt has parts, and most weak prompts are missing one or two of them. Naming the parts makes it easier to notice what you've left out, before the assistant fills the gap for you.

This step gives you six parts. You won't always need all six, and a one-line change to a method may need only the first. The point is to have a list you can check against, so the omissions are deliberate and not accidental.

## The six parts

**1. Language and version.** Name the language and the version you target. "C# for .NET Framework 4.8" is a different request from "C# for .NET 10," and Chapter 3 showed how the difference changes the code you get back.

**2. Signature.** Say what the function is called, what it takes, and what it returns. "A method called `Largest` that takes a list of integers and returns one integer" is precise enough that a wrong name or type stands out.

**3. Input and output contract.** Say what valid input looks like and what the output must mean. "The list may contain negative numbers and may not be empty" is a contract. So is "the result is the largest value in the list, not its position."

**4. Errors and edge cases.** Say what happens when the input is wrong. "If the list is empty, throw an argument exception" tells the assistant something a default never would. Edge cases are where generated code most often diverges from what you wanted.

**5. Constraints.** Say what must not happen: which libraries may be used, which patterns to avoid, what the code must not change. The next step covers this in detail.

**6. Style and shape.** Say how the code should look where it matters to your team, such as the naming convention, whether to use a query expression or a loop, and whether comments are wanted. Style is the part of a prompt that matters least for correctness, and it's the part most people write first.

## Example: the same gap in four tasks

The six parts apply to any task. Here are four ordinary requests, each shown as a weak prompt and then with the parts that were missing filled in. In each case, look for the part the weak version left to the assistant.

**A sorting helper.**

> Weak: Sort the customer names.
>
> Stronger: Python 3.11. A function called `sort_names` that takes a list of strings and returns a new sorted list, without changing the original. Sort case-insensitively, so "adams" comes before "Brown". Names may be empty strings, and empty strings sort first. Use only the standard library. Return the new list, not `None`.

The missing parts were the version, the contract for the original list, the case rule, and the empty-string behavior. Each one is a choice the assistant would otherwise make for you.

**A date parser.**

> Weak: Parse the date string in the file.
>
> Stronger: JavaScript for Node 20. A function called `parseDate` that takes a string in the form `YYYY-MM-DD` and returns a `Date` in UTC. If the string doesn't match that form, throw an `Error` that includes the text it received. Don't use any packages. Accept only real calendar dates, so `2026-02-30` is an error.

The weak prompt didn't say what "parse" means for a bad string, which is the case that most often goes wrong. The strong version also rules out the date that a loose parser would quietly roll over to March.

**A retry helper.**

> Weak: Add retries to this call.
>
> Stronger: C# for .NET Framework 4.8. A static method called `Retry` that takes a `Func<T>` and an attempt count, and runs the function up to that many times. Retry only on `TimeoutException`, and rethrow any other exception immediately. Wait 500 milliseconds between attempts, and don't wait after the last one. Throw the last `TimeoutException` if every attempt fails. Use no third-party packages.

The weak version left out which errors should be retried, which is the decision that matters most for a retry. Without it, the assistant might retry a failure that will never succeed, such as bad input, and hide it for several seconds.

**A configuration reader.**

> Weak: Read the settings from the config file.
>
> Stronger: Python 3.12. A function called `load_settings` that takes a file path and returns a dictionary. The file is JSON with one object at the top level. If the file is missing, raise `FileNotFoundError`. If it isn't valid JSON, raise `ValueError` with the file name in the message. Don't read environment variables, and don't change the file.

The weak prompt named no format, no error behavior, and no boundary. The strong one says the file is JSON, and it says what must not happen to the file as well as what must.

## Which part was missing most often

Across these four examples, the errors and edge cases were missing from every weak prompt. That's the pattern to watch for. Language and version are easy to remember, and the signature is easy to imply. The error behavior is the part people leave out most, because it feels like a detail until it's the bug.

> **Aside: why the assistant guesses instead of asking.**
> A human colleague who doesn't know your error policy will often ask. An assistant, by default, tends to produce an answer, because the most likely continuation of a request is usually a complete response, not a question. That's why the missing parts appear as confident code, not as a list of questions. Some tools can be asked to list their assumptions first, and that's a useful habit to adopt, since it turns the hidden guesses into visible ones.

## Try it

Take a small function you know well, and write a one-line prompt for it, the way you'd normally ask. Then write it again with all six parts. Count how many parts the first version was missing, and note which one you left out first. Write both prompts, and your count, in a file called `six-parts.txt` in your practice folder.

---
