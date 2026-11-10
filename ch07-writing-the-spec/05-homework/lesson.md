# Homework: A Spec for a Settings Parser

This homework runs the whole chapter once, on a piece of work you haven't seen before. You'll write the spec and its acceptance table from a short description, hand the spec to an assistant, check the output, and fix a defect.

Write your work in a file called `settings-spec.txt` in your practice folder. Keep your `SPEC.md`, your acceptance table, the prompt you gave the assistant, the output, your check record, and your fix, in that order.

## The description

> Write a function that reads a settings line, such as `name=archive; retention_days=30; enabled=true`, and returns the settings as a map from name to value. Names and values are trimmed of surrounding spaces. Empty segments between semicolons are ignored. A segment with no equals sign is an error. A name that is empty is an error. The same name appearing twice is an error. A value may be empty.

That's the whole description. Everything else in your spec has to come from you, and the description leaves a good number of decisions open. Find them before you write any code.

## Step one: write the spec

Use the six sections from the template step: purpose, inputs and outputs, errors, constraints, out of scope, and acceptance examples. Choose your language and version, and state them. Decide what the output type is, and what the error type is, and write both down.

Some of the decisions the description doesn't settle are these. Write your answer to each one in the spec.

- Is a value that contains an equals sign allowed, such as `url=a=b`? If so, what is the value?
- What is the result for an empty line, or a line that contains only spaces?
- Is a trailing semicolon an empty segment, and therefore allowed?
- Are the error types the same for all three error cases, or does each have its own type?
- Is the parser case-sensitive for names?

If you find a decision you can't settle from the description, write it as an open question in the spec, and decide it before you generate code. Don't let the assistant decide it for you.

## Step two: write the acceptance table

Write at least ten rows. Every rule in the description needs one example on each side of its boundary, and every error needs one example. Work each expected value out by hand, separately from the spec, and check it a second time.

## Step three: generate and check

Give the spec to the assistant with the instruction from the giving-the-spec step, and say that the acceptance table is authoritative. Run every row of the table against the output, and fill in a check record with the expected value, the actual value, and a pass or fail for each row.

Write the code in your language. If the output compiles and runs but fails any row, you've found a defect, and that's the goal of this step.

## Step four: fix one defect

Choose one failing row, and write a precise follow-up in the form the giving-the-spec step showed: the row, the expected value, the actual value, the rule it breaks, the scope of the fix, and what must not change. Run the whole table again after the fix, not only that row.

If every row passes on the first try, don't assume the output is right. Write three more rows that you think the spec might have missed, and check those. Record what you found, even if it's nothing.

## Run it

The starter contains a generated parser, and ten of the rows from the answer key. The two rows it leaves out are the line of spaces only and the case-sensitive name, which you can add yourself. Each row is an acceptance example, and the harness prints the check record: the input, the actual result, and pass or fail. Press **Run** (or F5) and read the record.

Some rows fail. The parser splits on every equals sign, doesn't trim spaces, and overwrites a duplicate name. Each failing row names a rule from the spec, so the record tells you which part of the parser to review.

Press **Check** on the starter, then press **Run** on the solution. The solution applies the fixes the failing rows point to, and every row passes.

The harness is a stand-in for the table you write yourself. Your own spec and rows matter more than these ten, because the rows here were written for you. Use the harness to practice, and then write the table that your own spec needs.

> **A note on the code.** The starter and solution were written by hand to show the defects and the fixes. They aren't a record of what any assistant produced. A real generated parser may fail in different rows, and you'll find those with your own table.

## What to hand in

Your file should contain the spec, the acceptance table, the prompt, the output, the check record, the follow-up, and the second check record. Then add a short paragraph that answers two questions. Which decision did you find most difficult to settle in the spec, and would a different decision have changed any of your rows? Which defect did the table catch that a reading of the code would most likely have missed?

---

~~~spoiler
Answer key. Your spec will settle some decisions differently, and that's fine. What matters is that each decision is written down, that every row of your table traces to a rule in the spec, and that your check record is honest about what passed and failed.

**A sample set of decisions.** Settle each one in the spec, and write it in your own words.

- A value may contain an equals sign. The first equals sign separates the name from the value, and everything after it is the value. So `url=a=b` gives the name `url` and the value `a=b`.
- An empty line, or a line of spaces only, returns an empty map, not an error. The description says empty segments are ignored, and a line with nothing in it has no segments that matter.
- A trailing semicolon creates an empty segment, which is ignored.
- Each error is a separate exception type, or one type with a message that names the error. Either works, provided the spec says which.
- Names are case-sensitive. `Name` and `name` are different keys.

**A sample acceptance table.**

| Input | Expected result |
|---|---|
| `name=archive` | `{name: archive}` |
| `name=archive;` | `{name: archive}` |
| `name = archive ; enabled = true` | `{name: archive, enabled: true}` |
| `url=a=b` | `{url: a=b}` |
| `name=` | `{name: (empty)}` |
| `` (empty line) | `{}` |
| `   ` (spaces only) | `{}` |
| `;;name=x;;` | `{name: x}` |
| `name` (no equals sign) | error |
| `=archive` (empty name) | error |
| `name=a; name=b` (duplicate) | error |
| `Name=a; name=b` | `{Name: a, name: b}` |

Every row above has a boundary or an error on it. Notice that the table includes the cases most people leave out: an empty value, a line of spaces, a value with an equals sign, and a name that differs only in case.

**Defects that tables commonly catch.** These are the defects students most often report, and they're worth checking for in any output.

- Splitting on every equals sign, so `url=a=b` fails or loses the second part.
- Treating an empty value as an error, because the code checks for a falsy value rather than a missing one.
- Trimming only the start of a value, or only the end, so `name = archive ` keeps a trailing space.
- Overwriting a duplicate key silently, instead of raising the error the spec names.
- Returning `null` or `undefined` for an empty line, instead of an empty map.
- Lowercasing names, which the spec didn't ask for.
- Ignoring the trailing semicolon, and then failing on the empty segment it creates.

**What a good fix looks like.** A follow-up that names one row, states the rule, changes only the parsing logic for that rule, and keeps every other row passing. After the fix, the whole table runs again, and the check record shows every row.

**What good work looks like.** A spec whose open decisions are written down before any code exists, a table with a boundary and an error for each rule, a check record that reports the failures as they happened, and a fix that is scoped to one rule and confirmed against the full table.
~~~

---
