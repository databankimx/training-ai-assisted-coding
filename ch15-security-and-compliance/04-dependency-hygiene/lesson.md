# Dependency Hygiene

A dependency is code you didn't write, and it becomes part of what you ship. Its license decides what you may do with it, and a license problem is discovered late, often when a client's lawyer or a scan asks. An assistant suggests packages freely, and it has no view of your license policy, so every suggestion is a question to answer before the package is added.

Chapter 2, step 4 gave the rule. This step shows how to apply it, with the license of each dependency checked against an allow list.

## What a license tells you

A license is a set of permissions. Some are permissive: they let you use, change, and ship the code in a closed-source product, usually with a notice. Others are copyleft: they require that code which uses them is also released under the same terms, which a closed-source product can't do. Some licenses are unclear, or absent altogether.

Three examples show the range.

> **MIT, Apache-2.0, BSD-3-Clause, ISC.** Permissive. Allowed for closed-source commercial use under the team's list, with the notices kept.
>
> **GPL-3.0.** Copyleft. Using it in a closed-source product is a question for legal and the team lead, not a decision for the developer who found it.
>
> **No license found.** Unknown. Nobody can say what the code allows, so it is treated as not allowed until someone with authority says otherwise.

## The allow list

The team keeps a list of licenses it has approved, and it checks every new dependency against that list. Anything not on the list needs review. The list is short on purpose, because each entry is a decision someone made once for all future uses.

## Run it

The starter checks five dependencies against the allow list. Press **Run** (or F5) and read the five lines.

The check says every dependency is allowed. That's the defect: the allow list is never consulted. The copyleft dependency and the one with no license pass the same way as the permissive ones. A reviewer who read only the output would see five approvals.

The expected output shows the three permissive dependencies allowed, and the other two held for review, each with a reason. Press **Check** on the starter to see the difference. Then press **Run** on the solution, which applies the allow list and says why each held dependency is held.

> **A note on the code.** The starter and solution were written by hand to show the check. They aren't a record of what any assistant suggested. A real check reads the license from the package's metadata, and it compares the full license expression, not a short name, because some packages offer several licenses.

## A suggestion is not an approval

When an assistant suggests a package, the suggestion is a question: what is it, and what is its license? It isn't an approval. A package that appears in a generated import list has passed through no review at all, and its license has not been checked.

> **Suggestion from an assistant:** add `some-parser` for parsing the report format.
>
> **What to do next:** check its license against the allow list, and if it's not on the list, route it to review before adding it. Ask whether the parsing can be done with a dependency already approved.

This is the step where the suggestion is most likely to break the rule. The assistant knows nothing about your allow list, and it will suggest whatever solves the problem most quickly.

> **Aside: why the license check belongs in the build, not in a memory.**
> A rule kept in someone's head is applied when they remember it. A check in the build is applied to every change, and it fails the build when a package is not on the list. The same principle as the diff review in Chapter 13: a control that depends on the person who adds the package is a control that will sometimes be skipped.

## Try it

List three packages your current project uses, or would use for a common task such as parsing, logging, or testing. For each, write its license, the allow-list result, and what you would do with a result that needs review. Save your list in a file called `licenses.md` in your practice folder.

---
