# Reading Before Running

Running generated code first feels efficient. If it works, you move on, and if it fails, the error tells you where to look. The trouble is that running answers only the questions the test happens to ask. A method can pass every run you try and still fail on a path you didn't exercise, or on an input you didn't think of. Reading is how you find those paths before anyone depends on them.

This step covers how to read a change so that the most important defects surface first, and how to turn each concern into something you can check.

## Read in this order

Start with what can do the most damage, and leave the cosmetic issues for last. A reader who starts at the top of the file and works down tends to spend the most attention on names and formatting, which are the least likely to matter.

1. **The public surface.** The signatures, the parameters, the return types, and the exceptions. A wrong signature breaks every caller, and it's the first thing to check.
2. **The data flow.** Where each input goes, and where each output comes from. Look for values that are stored, passed on, or returned without the transformation the spec requires.
3. **The error paths.** Every `catch`, every `return` for a failure, every place the code gives up. Errors are where generated code most often does something plausible and wrong.
4. **The external calls.** Files, databases, network calls, and anything that waits on the outside world. Check how each one can fail, and what happens when it does.
5. **The rest.** Naming, structure, comments, and style. These matter, and they matter after the first four.

## Turn each concern into a claim

As you read, write each concern as a claim the code must support. A claim is a sentence you can test. "This looks risky" isn't a claim. "This method returns zero when the file is missing, so a missing file looks like an empty configuration" is one.

> **Vague concern:**
> The error handling looks off.
>
> **Testable claim:**
> When the file is missing, the method returns an empty dictionary and doesn't raise an error, so a caller can't tell a missing file from an empty one. The spec requires an error for a missing file.

The claim names the behavior, the condition, and the rule it breaks. The reviewer can check it by running the missing-file case, and the author can fix it without guessing what the reviewer meant.

## A worked read

Here is a short generated method that loads a settings file. Read it once, and notice what you'd flag before reading the next paragraph.

~~~examples
```csharp
public static Dictionary<string, string> LoadSettings(string path)
{
    try
    {
        var settings = new Dictionary<string, string>();
        foreach (var line in File.ReadAllLines(path))
        {
            var parts = line.Split('=');
            settings[parts[0]] = parts[1];
        }
        return settings;
    }
    catch (Exception)
    {
        return new Dictionary<string, string>();
    }
}
```
```python
def load_settings(path):
    settings = {}
    try:
        with open(path) as handle:
            for line in handle:
                parts = line.split("=")
                settings[parts[0]] = parts[1]
    except Exception:
        return {}
    return settings
```
```javascript
const fs = require("fs");

function loadSettings(path) {
  const settings = {};
  try {
    for (const line of fs.readFileSync(path, "utf8").split("\n")) {
      const parts = line.split("=");
      settings[parts[0]] = parts[1];
    }
  } catch (error) {
    return {};
  }
  return settings;
}
```
~~~

Read the three versions against the same list of concerns.

- **The error path.** Every version catches every exception and returns an empty result. A missing file, a permissions error, and a corrupt line all look the same to the caller. That's a claim: a missing file returns an empty settings map, with no error.
- **The data flow.** Every version splits each line on every equals sign and keeps the second part. A value that contains an equals sign loses everything after the first one. That's a second claim, and it breaks the parsing rule that a value may contain an equals sign.
- **The malformed line.** A line with no equals sign has one part, so `parts[1]` fails. In C# that's an index exception that the catch-all swallows. In Python it's an index error that the `except` also swallows. In JavaScript, `parts[1]` is `undefined`, and the code stores it without complaint. The three languages fail differently, and the reviewer has to check each one.

None of these is visible in a run that uses only well-formed lines. The reading found them. A run would have passed.

> **Aside: why running can miss what reading finds.**
> A test run answers yes or no for the inputs you give it. Reading asks what the code does for any input, including the ones you didn't think of. The two are complementary. Reading is how you decide which inputs need testing, and running is how you confirm your reading was right. Neither replaces the other, and the reviewer who skips reading because the tests pass has given up the part of the review that finds the defects the tests were never written for.

## Write the claims down

Keep the claims in a list as you read, one per concern, with the line that raised it. The list becomes the review note, and it's the document the author responds to. A reviewer who keeps the concerns in their head tends to forget some of them by the time the author replies.

## Run it

The starter for this step is the settings loader from the worked read, followed by three cases. Each case is one of the claims you wrote: a missing file, a malformed line, and a value that contains an equals sign. Press **Run** (or F5) and read each line.

The starter prints what the loader does now. A missing file gives zero settings, which is the claim about silent empty results. The malformed file gives a count that doesn't reflect the bad line. The equals case keeps only the first value, `a`, which is the claim about splitting on every equals sign.

The expected output is what the spec requires. Press **Check** on the starter to see the mismatches, then press **Run** on the solution. The solution raises a clear error for a missing file and for a malformed line, and it keeps everything after the first equals sign.

Notice how the review worked. You didn't need to run the loader to write the claims. You ran it afterwards, to check each claim with the case that would show it. That's the order a reviewer should use.

> **A note on the code.** The starter and solution were written by hand to show the claims. They aren't a record of what any assistant produced. Use this step to practice turning a concern into a case you can run, not as a guide to what a particular tool does.

## Try it

For each of the three cases, write the claim in the form the worked read used, and say which line of the output confirms it. Then pick one claim that the starter does not show, and write the case that would check it.

Save your claims in a file called `reading-claims.txt` in your practice folder.

---
