# Weak and Strong Prompts

Here is a task that most developers have asked for at some point: a function that returns the largest number in a list. This step asks it two ways, and compares what comes back. The task is the same in both. The difference is the six parts from the previous step.

## The weak prompt

> Write a function that returns the largest number in a list.

That's a reasonable thing to type, and it names the task. It says nothing about the language, the version, the signature, the input, the empty list, or the constraints. The assistant has to fill every gap. Here is what it might produce in each course language.

~~~examples
```csharp
static int Largest(List<int> values)
{
    int max = 0;
    foreach (int value in values)
    {
        if (value > max) max = value;
    }
    return max;
}
```
```python
def largest(values):
    return max(values)
```
```javascript
function largest(values) {
  return Math.max(...values);
}
```
~~~

Look at what the weak prompt allowed. The C# version starts from zero, so a list of negative numbers returns zero, which is the bug from Chapter 3. The Python version is short and correct for non-empty lists, but on an empty list it raises an error with a message that doesn't mention your problem. The JavaScript version returns negative infinity for an empty list, and that value can travel a long way before anyone notices it's wrong.

None of these outputs is unreasonable for the prompt it came from. They are reasonable guesses, and the prompt left room for them.

## The strong prompt

> C# for .NET Framework 4.8. A static method called `Largest` that takes a `List<int>` and returns the largest value as an `int`. The list may contain negative numbers. If the list is empty, throw an `ArgumentException` whose message says the list is empty. Don't use LINQ. Return the value, not its position.

Each part is now present. The language and version are named, the signature is given, the contract covers negative numbers, the error behavior is stated, and a constraint rules out a dependency. The Python and JavaScript versions of the same prompt change the language and the error type, and keep the rest.

Here is what the strong prompt produces in each language.

~~~examples
```csharp
static int Largest(List<int> values)
{
    if (values.Count == 0)
    {
        throw new ArgumentException("The list is empty.", nameof(values));
    }
    int max = values[0];
    foreach (int value in values)
    {
        if (value > max) max = value;
    }
    return max;
}
```
```python
def largest(values):
    if not values:
        raise ValueError("The list is empty.")
    largest_so_far = values[0]
    for value in values:
        if value > largest_so_far:
            largest_so_far = value
    return largest_so_far
```
```javascript
function largest(values) {
  if (values.length === 0) {
    throw new Error("The list is empty.");
  }
  let max = values[0];
  for (const value of values) {
    if (value > max) max = value;
  }
  return max;
}
```
~~~

The three versions match each other in behavior. An empty list throws an error that says what happened, and a list of negative numbers returns the largest of them. That's what a specification buys you: the outputs agree, because the prompt decided what they must do.

> **Aside: the prompt doesn't make the code right.**
> The strong prompt makes the code easier to check. It doesn't guarantee that the code is correct. An assistant can still misread a constraint, or leave out a case you named. The contract tells you what to test, and the test tells you whether the code does it. Chapter 3 covered why a clear prompt is still no evidence on its own.

## Turning a weak prompt into a strong one

The method is the same every time. Start with the weak prompt, and go through the six parts. For each part, ask whether the prompt says it or leaves it to the assistant. Each gap you find is a guess you'd otherwise have to check afterwards, so fill it in before you send the prompt.

You don't have to write a page. Most strong prompts are a short paragraph, with the signature and the error behavior stated plainly. Length matters less than whether each part is present.

## Run it

The starter file for this step is the weak version of the function, in each language, with two calls: a list of negative numbers, and an empty list. Press **Run** (or F5) and read each line.

You'll see three different problems. The C# version returns zero for the negative list, which is the bug from Chapter 3, and it returns zero for the empty list without any complaint. The Python version returns the right answer for the negative list, and on the empty list it raises an error with a message that doesn't mention your problem. The JavaScript version returns negative infinity for the empty list, which keeps going quietly until something else breaks.

The expected output for this step is the strong version's output. Press **Check** on the starter to see the mismatch. Then press **Run** on the solution, which is the strong version, and compare its output with the expected output.

> **A note on the code.** The starter and solution were written by hand to show the weak points. They aren't a record of what any assistant produced. Real output varies from one tool and one session to the next. Use this step to learn what to look for in an output, not as a guide to what a particular tool does.

## Try it

Take the weak prompt above and rewrite it in your own words, with all six parts, for the language you use most. Don't copy the strong prompt in this step. Write it from the six parts, then compare. Note which parts you added, and which one you were most tempted to leave out. Keep the rewritten prompt in a file called `largest-prompt.txt` in your practice folder.

---
