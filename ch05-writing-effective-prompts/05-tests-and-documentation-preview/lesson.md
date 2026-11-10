# Prompts for Tests and Documentation

The six parts apply to any prompt, not only to prompts for code. Tests and documentation are two of the most common things developers ask an assistant for, and both are easy to get wrong in ways that look right. This step previews them with many examples. Chapter 9 covers tests in full, and Chapter 12 covers documentation in full.

## What makes a test prompt different

A test prompt has the same six parts as a code prompt, with one important change in the contract. The contract for a test is the expected behavior, and the expected behavior should come from the specification, not from the code the test will check.

Compare these two prompts for the same function.

> **Asks the code to explain itself:**
> Write tests for this method. Here is the method.
>
> **Names the independent source:**
> Write tests for the method `Largest`, using the specification below. Each expected value comes from the specification, not from the method's code. The specification says the method returns the largest value, that negative numbers are allowed, and that an empty list throws `ArgumentException`.

The first prompt invites tests that pass whatever the method does. The second gives the assistant a source it must follow even when the method is wrong.

## Test prompts for several kinds of function

Each prompt below names the source of its expected values, and asks for the cases that most often break.

**A string function.**

> C# for .NET Framework 4.8, NUnit. Write tests for `NormalizeName`, which trims whitespace, collapses internal runs of spaces to one, and converts the result to title case. The specification gives these expected values: `"  ada   lovelace "` becomes `"Ada Lovelace"`, and an empty string stays empty. Include one test for a name with a hyphen. Each test name states its input and its expected value.

**A numeric function.**

> Python 3.12, pytest. Write tests for `percent_change(old, new)`, which returns the change as a percentage of the old value. The specification says: a change from 50 to 75 is 50.0, a change from 80 to 60 is -25.0, and an old value of zero raises `ValueError`. Add a test for a change of zero, and check the result is exactly `0.0`.

**A collection function.**

> JavaScript for Node 20, Jest. Write tests for `uniqueSorted(values)`, which returns the distinct values in ascending order and does not change the input array. Cover an empty array, an array with duplicates, an array that is already sorted, and an array of mixed numbers. The specification is the sentence above, so don't infer any other behavior. Include one test that checks the input array is unchanged.

**A date function.**

> C# for .NET 10, xUnit. Write tests for `DaysBetween(DateTime start, DateTime end)`, which returns the whole number of days from start to end. The specification says the result is negative when end is earlier than start. Cover a same-day pair, a pair across a leap day, and a pair across a daylight-saving change. For the daylight-saving case, state the expected value in the test name, so a reviewer can check it without running the test.

**An error path.**

> Python 3.12, pytest. Write tests for `load_settings(path)`, which raises `FileNotFoundError` for a missing file and `ValueError` for a file that isn't valid JSON. The specification defines both errors. Write one test per error. Each test must assert the exception type, and the message must contain the file name.

## What makes a documentation prompt different

A documentation prompt also has six parts, and its contract is the reader. Documentation exists for someone who will use the code without reading the implementation, so the prompt should say who that reader is and what they need to know.

Compare these two.

> **Describes the implementation:**
> Document this method, explaining how the loop works.
>
> **Describes the reader's need:**
> Write an XML documentation comment for `Largest`. The reader is a developer who will call the method and has not read its code. Say what the method returns, what it throws for an empty list, and how negative numbers are handled. Don't describe how the method works internally.

The first produces a comment that goes stale the first time the loop changes. The second produces a comment that stays useful.

## Documentation prompts in each style

Each language has its own documentation convention, and the prompt should name it.

> C#: Write a `///` XML documentation comment for `Largest`, with `summary`, `param`, `returns`, and `exception` tags. The reader is a caller who has not read the code.

> Python: Write a docstring for `largest`, in Google style, with `Args`, `Returns`, and `Raises` sections. The reader is a developer using the module from another file.

> JavaScript: Write a JSDoc comment for `largest`, with `@param`, `@returns`, and `@throws` tags. Describe the behavior for an empty array, and don't mention the loop.

## Documentation prompts for different readers

The same function needs different documentation for different readers, and the prompt should say which reader it's for.

> For a new developer on the team: Explain what `Largest` is for, with one example call and its result. Keep it to four sentences.

> For a reviewer checking the contract: List every input the method accepts, and what it returns or throws for each. Use a table with three columns: input, result, and notes.

> For an operations engineer reading logs: Say what the exception message means and what the caller should check first. Don't include any code.

## Shared rules for both kinds of prompt

Both prompts need a contract, and both need a reader or a requirement to anchor them. In each case, the risk is the same: the output will describe the code, not the specification. A prompt that names the specification as the source of truth, and forbids the output from using the implementation to decide the answer, prevents most of the drift.

Here are the rules in short form, with an example of each.

> Rule: Name the source. "Each expected value comes from the specification below."
>
> Rule: Forbid the circular source. "Don't infer behavior from the method's code."
>
> Rule: Name the case that breaks most often. "Include the empty list and the list with one value."
>
> Rule: Name the reader. "The reader is a caller who has not read the code."

> **Aside: why the code is the wrong source for tests and docs.**
> When the code is the only thing the assistant reads, its tests and comments describe what the code does, which is the very thing you're trying to check. That's circular. The tests and documentation are only useful as checks if they come from somewhere independent, such as the requirement, a reader's need, or a known-good example. The specification is that independent source, and it's why Chapter 7 puts it at the center of the work.

## Try it

Write three prompts: a test prompt, a documentation prompt for a developer, and a documentation prompt for a reviewer. Use a function you've written recently, and name the independent source in each. Save them in a file called `tests-and-docs.txt` in your practice folder. Then note which of the three you'd most likely have written badly without this step, and why.

---
