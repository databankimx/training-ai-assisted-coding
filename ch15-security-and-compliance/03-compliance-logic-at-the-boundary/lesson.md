# Compliance Logic at the Boundary

Compliance rules are often written as plain sentences, and the code that enforces them is written from the sentence. A rule such as "records are kept for 90 days" reads clearly until the code has to decide the case of exactly 90 days. Then the wording matters, and an assistant will often pick the reading that looks most natural, not the one the rule means.

This step is about that gap. The rule is written down, the code is run against it at the boundary, and the difference is visible in the output.

## Read the rule word by word

Consider three versions of the same rule, each a little different.

> **"Records are kept for 90 days."** Does a record 90 days old count as kept, or as past its time? The sentence doesn't say.
>
> **"Records older than 90 days are deleted."** A record 90 days old is not older than 90 days, so it's kept. A record 91 days old is older, so it's deleted.
>
> **"Records of 90 days or more are deleted."** Now a record 90 days old is deleted. The sentence is different, and the code must follow the sentence the auditor approved, not the one that sounds similar.

The three sentences differ by one word, and each produces a different result for the same record. The first is ambiguous. The second and third are not, and only one of them is the rule.

## Why the boundary is where compliance fails

A rule with a threshold has a boundary, and the boundary is the value at the threshold itself. Most test cases sit well away from it: a record of 30 days, a record of 400 days. Those cases pass for any comparison, `>` or `>=`, and they show nothing about the rule.

The boundary case is the one that separates the two. Chapter 11 showed the same effect in a refactoring, and Chapter 7 showed it in acceptance examples. Compliance makes it matter more, because the auditor will check exactly that case, and so will the record that falls on the day.

## Run it

The starter applies a retention rule to four records. Press **Run** (or F5) and read the four lines and the summary.

The records of 30 and 400 days are handled correctly. The record of 91 days is deleted, which is right. The record of exactly 90 days is deleted, and the rule says it should be kept. The summary says the job deleted three records, and the rule says two.

The expected output keeps the 90-day record. Press **Check** on the starter to see the difference. Then press **Run** on the solution, which changes the comparison to match the sentence "older than 90 days", and the summary shows two deletions.

> **A note on the code.** The starter and solution were written by hand to show the boundary. They aren't a record of what any assistant produced. A real retention job also has time zones, dates, and deletion logs, which this example leaves out.

## Make the rule say which side it's on

The fix is not only the comparison. The rule itself was ambiguous in one version, and the team has to decide what the words mean. Once they've decided, the sentence should say the boundary out loud, with the case stated: "a record exactly 90 days old is kept."

That sentence is worth writing in the spec, and in the test. A test named for the boundary case tells the next reader, and the next auditor, which side the rule takes.

> **Aside: why compliance text needs a worked example.**
> A rule is a sentence, and a sentence can be read two ways. A worked example is a case with an answer, and it can be read only one way. Auditors often ask for examples for exactly this reason, and the examples in your spec are the same thing: the rule, pinned to a case, so the code can be checked against it.

## Try it

Write one compliance rule from your own work that has a threshold, such as an age, a count, or an amount. Write three cases: one below the threshold, one exactly at it, and one above it. Write the expected result for each before you check any code, and state which side of the threshold the rule takes. Save the cases in a file called `boundary-cases.txt` in your practice folder.

---
