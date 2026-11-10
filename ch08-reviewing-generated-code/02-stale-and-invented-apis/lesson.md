# Stale and Invented APIs

Chapter 3 covered why an assistant invents methods and why its knowledge has a cutoff. This step is about the review side of that problem: how to catch a bad call in generated code, and how to tell the two kinds apart, because they're fixed in different ways.

An **invented** API doesn't exist in the language under any version. A **stale** API exists, but the version you target has removed it, renamed it, or deprecated it. An invented call fails at compile time or at the first run. A stale call may compile, run, and then fail on the one machine that has the newer runtime, or it may keep working and generate a warning that nobody reads.

## Three kinds of bad call

**Invented.** The call has no counterpart in the language.

~~~examples
```csharp
var sorted = names.SortBy(n => n);
```
```python
sorted_names = names.sort_by(str)
```
```javascript
const sortedNames = names.sortBy((n) => n);
```
~~~

Each line reads as plausible, and none exists in the standard libraries. The review question is simply whether the method is in the reference for the language.

**Stale, removed.** The call existed, and the target version no longer has it.

~~~examples
```csharp
// WebClient is marked obsolete, and newer code should use HttpClient.
using var client = new WebClient();
var text = client.DownloadString(url);
```
```python
# datetime.utcnow() is deprecated since Python 3.12. Use an aware datetime instead.
from datetime import datetime
stamp = datetime.utcnow()
```
```javascript
// fs.exists() is deprecated. Use fs.promises.access() or fs.existsSync() with care.
const fs = require("fs");
if (fs.exists(path)) {
  // ...
}
```
~~~

Each of these is a real API from the language's history, and each one is discouraged or deprecated in current versions. The `fs.exists` example is a good trap: the callback form is deprecated and doesn't behave as the generated code assumes, because it doesn't return a value that can be tested in an `if`.

**Stale, version-dependent.** The call is correct, but only for a version you may not target.

~~~examples
```csharp
// Math.Clamp is not available in .NET Framework 4.8.
int score = Math.Clamp(rawScore, 0, 100);
```
```python
# itertools.batched is available from Python 3.12.
from itertools import batched
pairs = list(batched(items, 2))
```
```javascript
// Array.prototype.toSorted is available from Node 20.
const sorted = values.toSorted();
```
~~~

These are the version-dependent calls from Chapter 3. Each one is fine on a current machine and fails on an older target, which is why the version belongs in the review, not only in the prompt.

## How to verify each call

Verification has the same three steps for all three kinds, and it's quick once you have the habit.

1. **Look it up in the reference for your target version.** The language's own documentation, or the IntelliSense list, which shows only what your compiler knows about. A method missing from both is invented.
2. **Read the status.** Check for an obsolete, deprecated, or version-specific marker. Most languages say so in the documentation, and C# marks obsolete members for the compiler.
3. **Let the compiler or the warnings check what you can't.** A build with warnings treated as errors catches many stale calls. A run catches the rest, if the path is exercised.

> **Aside: why deprecation is easy to miss.**
> A deprecated API still works, and that's what makes it dangerous. Nothing fails, so nothing draws attention, and a warning in a build log is the only signal. An assistant trained on years of code will produce deprecated calls because they were common when the code was written. Treat a deprecation warning as a finding, not as noise to suppress.

## Use the compiler as a reviewer

Compiler and analyzer warnings are the cheapest reviewer you have. Turn them on, and treat a new warning in generated code as a claim to check, not something to dismiss. In C#, obsolete members produce warnings in the build. In Python, deprecation warnings appear when the warnings module is set to show them, which is worth doing in a review. In JavaScript, a linter can flag deprecated calls where the rules are configured for them.

A review that never looks at the build output is reading the code without the evidence the build already produced.

## Run it

The starter for this step doesn't run the calls from the examples, because the calls would fail or warn. Instead it asks the language whether each kind of call exists in the version you're running. Press **Run** (or F5) and read the three lines. The first is the invented call, which doesn't exist. The second is the newer call, which exists in current versions. The third is the deprecated call, which still exists, so it works and is still a finding.

The expected output is what the solution produces. The solution does the same three jobs with calls that exist: sorting a copy of the names, clamping a score, and checking that a timestamp is in UTC. Press **Check** on the starter to see the mismatch, then press **Run** on the solution.

The point of the step is the order of the checks. Before a call goes into your code, ask the language whether it exists, and read the status of anything that does. A deprecated call passes this check, which is why the review has to look at status as well as existence.

> **A note on the code.** The starter and solution were written by hand to show the checks. They aren't a record of what any assistant produced. A current version may behave differently from the one this step was written against, so run the checks in your own target version before you rely on the results.

## Try it

For each of the three checks in the starter, write which of the three labels it confirms, and whether the check would have caught the call in the examples above. Then write one sentence on the call the starter does not check, and how you'd check it. For each one, say what you'd check first: the reference, the status, or the build output. Save your labels in a file called `api-labels.txt` in your practice folder, and note which language's reference you used for each.

---
