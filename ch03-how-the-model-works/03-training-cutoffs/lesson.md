# Training Cutoffs and Versions

The assistant learned from text collected up to a particular date. That date is its training cutoff. Anything released after it, a new language feature, a renamed method, a library removed from the platform, is outside what the model learned. The assistant can still talk about those things, because it has seen discussion of them. It just can't be sure they exist as described.

This step is about what that means for the code you're writing, and what to do about it.

## Two ways a cutoff causes trouble

The first is **newer than the model.** The assistant doesn't know about a feature, so it writes older code. That's usually safe, but it's wasteful, and it may miss a simpler built-in that you'd want.

The second is **older than your project.** The assistant suggests something that was true when it learned, and isn't true for your target. A method may have been renamed, deprecated, or removed. This is the more dangerous case, because the suggestion looks like current advice.

## Newer forms, and portable forms

Each language below has a newer form of a task and a form that works on older versions. Every program here is complete, and you can run it. The starter file for this step contains all of it.

~~~examples
```csharp
using System;
using System.Collections.Generic;
using System.Linq;

// Keep a score between 0 and 100.
int rawScore = 150;
// Newer: Math.Clamp needs .NET Core 2.0 or later, or .NET 5 and later.
// Not in .NET Framework 4.8, which the Unity track targets.
// Portable: works everywhere.
Console.WriteLine($"Score (portable): {Math.Min(Math.Max(rawScore, 0), 100)}");

// Group numbers into pairs.
var items = new[] { 1, 2, 3, 4, 5 };
// Newer: Chunk needs .NET 6 or later. Portable: an index loop.
var pairs = new List<string>();
for (int i = 0; i < items.Length; i += 2) pairs.Add(string.Join("+", items.Skip(i).Take(2)));
Console.WriteLine($"Pairs (portable): {string.Join(", ", pairs)}");

// Sort a copy, and leave the original alone.
var values = new[] { 3, 1, 2 };
var sortedPortable = (int[])values.Clone();
Array.Sort(sortedPortable);
Console.WriteLine($"Sorted (portable): {string.Join(", ", sortedPortable)}");
Console.WriteLine($"Original: {string.Join(", ", values)}");
```
```python
raw_score = 150
# Portable: min and max work on every Python version.
print(f"Score (portable): {min(max(raw_score, 0), 100)}")

items = [1, 2, 3, 4, 5]
# Newer: itertools.batched was added in Python 3.12.
# Portable: a slice in a loop, which works on Python 3.9 and later.
pairs = [items[i:i + 2] for i in range(0, len(items), 2)]
print("Pairs (portable):", ", ".join("+".join(str(x) for x in pair) for pair in pairs))

# Sort a copy, and leave the original alone.
values = [3, 1, 2]
portable = list(values)
portable.sort()
print("Sorted (portable):", ", ".join(str(v) for v in portable))
print("Original:", ", ".join(str(v) for v in values))
```
```javascript
// Keep a score between 0 and 100.
const rawScore = 150;
console.log(`Score (portable): ${Math.min(Math.max(rawScore, 0), 100)}`);

// Group numbers into pairs.
const items = [1, 2, 3, 4, 5];
const pairs = [];
for (let i = 0; i < items.length; i += 2) {
  pairs.push(items.slice(i, i + 2).join("+"));
}
console.log(`Pairs (portable): ${pairs.join(", ")}`);

// Sort a copy, and leave the original alone.
// Newer: values.toSorted() is in current Node releases, from Node 20.
const values = [3, 1, 2];
const sortedPortable = [...values].sort((a, b) => a - b);
console.log(`Sorted (portable): ${sortedPortable.join(", ")}`);
console.log(`Original: ${values.join(", ")}`);
```
~~~

Notice that the portable form is longer in each case, and that it works everywhere. An assistant trained on recent code may give you the newer form without any warning. If your project targets an older version, the newer form fails, and the error can be confusing.

> **Aside: why a snapshot can't stay current.**
> A model is trained once, on a fixed collection of text. Releasing a new version of a language or library doesn't change the model. The new feature appears in the documentation and in discussions, and the model may learn about it later, in a future training run. Until then, the model's knowledge of the platform is a photograph, taken at the cutoff. The photograph is accurate about what it shows, and it can't show anything after it was taken.

## Find out what your project targets

The version question has a short answer, and you should always know it before you accept a suggestion that depends on one.

- **In C#,** check the `TargetFramework` in the project file. `net48` is .NET Framework 4.8. `net10.0` is .NET 10.
- **In Python,** run `python --version`. Your project may also pin a version in its configuration.
- **In JavaScript,** run `node --version`. For code that runs in a browser, check the browsers your project supports.

Write the target into your prompt, every time. "Target .NET Framework 4.8" in the first line of a request prevents a surprising number of wrong answers.

## When the assistant can search

Some tools can search the web or read documentation as part of their answer. That helps with recent information, but it doesn't replace the check. A search result can be out of date, from a different version, or from an unofficial source. The official documentation for your version is the reference. Use a search to find the right page, then read the page yourself.

## Run it

Press **Run** (or F5) on the starter. The newer forms run silently on a current machine. If one fails on your version, it prints the reason, and that line is the finding. The portable lines should match the expected output for this step.

Then press **Check**, and then **Run** on the solution, which keeps only the portable forms. The output is the same, and the solution has no newer forms that could fail on an older machine.

## Try it

Decide which form you'd use for each task, given a target you name in advance. Write your target and your choice in a file called `version-choices.txt` in your practice folder. For the C# clamp, use a target of .NET Framework 4.8. For the Python pairs, use a target of Python 3.11. For the JavaScript sort, use a target of Node 18. Then write one sentence on what would happen if you used the newer form on each target, and how you would notice.

---
