# Homework: The Hallucination Hunt

An assistant was asked for one task in each language: take a line of comma-separated text, trim each field, convert it to uppercase, drop the empty fields, and report how many fields are left. Each version below is what it produced. Each one is a complete program, and you can run it. Some of its calls are real. Some are invented. One or two depend on the version you're targeting.

Your job is not to fix the code. It's to run it, find every API call in it, and classify each one.

## The generated code

~~~examples
```csharp
using System;
using System.Linq;

var line = " alpha, ,beta ,, gamma ";
var fields = line.Split(',')
    .Select(f => f.Trim().ToUpperInvariant())
    .Where(f => !string.IsNullOrEmpty(f))
    .ToList();
Console.WriteLine($"Fields: {string.Join(", ", fields)}");

var count = fields.CountNonEmpty();
Console.WriteLine($"Count: {count}");
```
```python
line = " alpha, ,beta ,, gamma "
fields = [f.strip().upper() for f in line.split(",") if f.strip()]
print("Fields:", ", ".join(fields))

try:
    count = fields.count_non_empty()
    print("Count:", count)
except AttributeError as error:
    print("Count failed:", error)

try:
    clean_header = line.removeprefix("#")
    print("Header:", clean_header.strip())
except AttributeError as error:
    print("Header failed:", error)
```
```javascript
const line = " alpha, ,beta ,, gamma ";
const fields = line.split(",").map((f) => f.trim().toUpperCase()).filter(Boolean);
console.log("Fields:", fields.join(", "));

try {
  const count = fields.countNonEmpty();
  console.log("Count:", count);
} catch (error) {
  console.log("Count failed:", error.message);
}

try {
  const sorted = fields.toSorted();
  console.log("Sorted:", sorted.join(", "));
} catch (error) {
  console.log("Sorted failed:", error.message);
}
```
~~~

## Run it first

Open the starter for this step. Press **Run** (or F5) for each language, and read the output. For Python and JavaScript, the program keeps going after a failed call and prints the reason. For C#, the compiler stops and reports each method it can't find, with a line number.

Then press **Check**. In Python and JavaScript, Check passes the file even though a call fails at run time. C# is the exception, because its compiler reads method names. Run is the step that shows the failures in every language. Don't rely on Check alone to find invented methods.

## What to hand in

Write your answers in a file called `hunt.txt` in your practice folder. Make a table with four columns: the language, the call, its classification, and the check you used. Use these three classifications:

- **Real:** the call exists in the language, and works the same way on every version you care about.
- **Invented:** the call doesn't exist in the language, under any version.
- **Version-dependent:** the call exists, but only from some version onward, or in some versions and not others.

Every API call counts, including the ones that look ordinary, such as `split`. If a call is a method on the language itself, not on your own code, classify it. Then answer two questions at the end of the file. Which call would have been the hardest to catch without a check, and what check would have caught it fastest?

Don't paste the code into any tool to get the answers. Check each call against the documentation for the language and version, the same way you did in the hallucination step.

## Sample solution

When you've finished, press **Show solutions (spoiler)** in the Source tab. The solution uses real methods, and its output is the expected result for this step. Compare it with your own version after you've made your classifications, not before.

---

~~~spoiler
Answer key. Your check may differ from the one given. What matters is that your classification follows from it.

**C#**

- `Split(',')`: **Real.** Splits a string on a character. It works in .NET Framework 4.8, because the single-character form is covered by the params overload.
- `Trim()`: **Real.** Removes leading and trailing whitespace.
- `ToUpperInvariant()`: **Real.** Converts to uppercase without depending on the current culture.
- `Select`, `Where`, `ToList`: **Real.** LINQ methods. They need `using System.Linq;`, which the starter includes.
- `string.IsNullOrEmpty`: **Real.** Checks for null or an empty string.
- `fields.CountNonEmpty()`: **Invented.** No such method exists on `List<string>`, and no standard LINQ method has this name. The natural replacement is `Count`, since the list was already filtered.

**Python**

- `split(",")`, `strip()`, `upper()`: **Real.** Standard string methods in every version.
- `fields.count_non_empty()`: **Invented.** Lists have no such method. `len(fields)` gives the count, and it's correct here because the filter has already removed the empty fields.
- `line.removeprefix("#")`: **Version-dependent.** Added in Python 3.9. On Python 3.8 and earlier it raises an `AttributeError`.

**JavaScript**

- `split`, `map`, `trim`, `toUpperCase`, `filter`: **Real.** Standard methods in every version. `filter(Boolean)` removes falsy values, which here means empty strings.
- `fields.countNonEmpty()`: **Invented.** Arrays have no such method. `fields.length` is the count.
- `fields.toSorted()`: **Version-dependent.** Available in current Node releases from Node 20. It isn't in Node 18, and it doesn't change the array in place, which the generated code doesn't need.

**What the hunt shows.** The three invented calls share a pattern. Each one describes what the author wanted, in a name that sounds like a built-in. Each is fixed by using the length of the list the code already has. Two of the version-dependent calls are real features that would work in a current environment, and that's why a quick glance would have passed them.

**The fastest check.** For the invented calls, a language's IntelliSense list, or `help()` in Python, or the MDN page for arrays, shows the complete set of methods in one place. For the version-dependent calls, the documentation for your target version settles the question in seconds.

**About Check.** In Python and JavaScript, Check passes a call to a method that doesn't exist, because the call is valid syntax. Run shows the error. In C#, the compiler reads method names, so Check reports the missing ones. A passing Check doesn't clear a call for use.
~~~

---
