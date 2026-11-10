# Hallucination: Confident Inventions

A hallucination, in this course, means the assistant produces something that sounds right and isn't. In code, that's usually a method, a function, a class, or a parameter that doesn't exist. The name is plausible, the style is right, the surrounding code is sensible, and the call fails the moment you run it.

This step shows what those inventions look like, explains why they happen, and gives you the check that catches them.

## Two invented calls

Each program below asks for something sensible: sort a list of names, then take the first three, and remove the empty entries. Each program is complete, and each one calls a method that doesn't exist. Notice how ordinary the calls look.

~~~examples
```csharp
using System;
using System.Collections.Generic;
using System.Linq;

var names = new List<string> { "Mira", "", "Adam", "Chen" };

var firstThree = names.SortBy(n => n).Take(3).ToList();
Console.WriteLine($"Sort and take: {string.Join(", ", firstThree)}");

var cleaned = names.RemoveEmpty();
Console.WriteLine($"Remove empty: {string.Join(", ", cleaned)}");
```
```python
names = ["Mira", "", "Adam", "Chen"]

try:
    first_three = names.sorted_by(str).sort()[:3]
    print("Sort and take:", ", ".join(name or "(empty)" for name in first_three))
except AttributeError as error:
    print("Sort and take failed:", error)

try:
    cleaned = names.remove_empty()
    print("Remove empty:", ", ".join(cleaned))
except AttributeError as error:
    print("Remove empty failed:", error)
```
```javascript
const names = ["Mira", "", "Adam", "Chen"];

try {
  const firstThree = names.sortBy((n) => n).slice(0, 3);
  console.log("Sort and take:", firstThree.map((n) => n || "(empty)").join(", "));
} catch (error) {
  console.log("Sort and take failed:", error.message);
}

try {
  const cleaned = names.removeEmpty();
  console.log("Remove empty:", cleaned.join(", "));
} catch (error) {
  console.log("Remove empty failed:", error.message);
}
```
~~~

Look at what's wrong, and what's right. C# does have sorting, and LINQ has `OrderBy`. It doesn't have `SortBy` on a list. Python has `sorted()`, which is a function, and `list.sort()`, which sorts in place and returns nothing, so the chained call can't work. JavaScript has `sort()`, which also changes the array in place, and it has no `sortBy` method on arrays at all.

The inventions are plausible because each one is built from real pieces. `SortBy` sounds like something a language would have. `sorted_by` follows Python's naming. `sortBy` matches the pattern of many other libraries. The assistant produced the most likely-looking name, not a name it checked.

> **Aside: why the invention looks so reasonable.**
> A language model learns which words tend to follow which other words in code. Method names come from millions of examples, across many libraries, and many of those libraries have a `sortBy`. When the model reaches a point where it must name a method, it picks the most probable name in that context, and a name that appears in many libraries is probable. Nothing in that process checks whether your language, or your version of it, has the method. The model isn't lying, in the human sense. It has no way to know that it's guessing.

## Why it matters more than other errors

A wrong answer in prose is easy to notice. A wrong method name in code often stops the program with a clear message, which is annoying but safe. The dangerous case is an invented method that's wrapped in code that doesn't fail, or a method that exists in a neighboring library and quietly does something different. The error may show up later, in production, far from the place it was introduced.

## The check

When generated code calls something you don't recognize, check it before you run anything. Three quick steps catch most inventions.

1. **Look it up where the language defines it.** For C#, that's the Microsoft documentation for the type, and the IntelliSense list in your editor, which only shows what really exists. For Python, use `help()` or the documentation for the module. For JavaScript, check the MDN page for the object.
2. **Check the version.** A method can exist in the current release and not in yours. Chapter 3, step 3 covers this.
3. **If you can't find it, assume it isn't there.** Don't assume it's a rare method you've never heard of. A method that doesn't appear in any reference is the one to remove or replace.

## Run it

Open the starter for this step, which contains the same calls. Press **Run** (or F5) for each language. In Python and JavaScript, the starter catches each failure and prints the reason. In C#, the compiler stops and reports each missing method with its line number. That's the same finding, reported by a different tool.

> **Run first. Check only looks for syntax errors.** A call to a method that doesn't exist is valid syntax, so **Check** passes it in Python and JavaScript. The error appears only when the code runs, so **Run** is the step that shows it. C# is the exception. Its compiler reads the method names as well as the syntax, so **Check** reports the missing methods there. Don't rely on Check alone to find invented methods in any language.

When you've seen the failures, replace each invented call with a real method. Use the documentation for the language to find them, not the assistant. Then press **Check**, and then **Run**. The output should match the expected result in this step. If you want to compare your version with a worked answer, open the solution from the Source pane.

## Try it

Check the Python example against a Python session or an approved editor. Run `help(list)` and look for `sort_by`, `sorted_by`, or anything similar. Then check `sorted`. Write down what you find in a file called `hallucination-check.txt` in your practice folder. For the C# example, search the IntelliSense list for `SortBy` on a `List<string>`, and note what you see. Do the same for the JavaScript example on an array.

Once you've done those checks, write one sentence in the same file about the one step that would have caught the invention fastest.

---
