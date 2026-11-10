# A Review Checklist

A checklist keeps a review consistent. It makes sure the reviewer asks the same questions about every change, including the ones that are easy to skip on a tired afternoon. Checklists also have a failure mode of their own: a reviewer can tick every box without reading the code. This step covers a checklist that works in any language, and how to use it so that each item produces a finding or a reason.

## The checklist

The items below are grouped by the reading order from step 1. Each one is a question about the change, and each one should have a recorded answer.

**The public surface**
- The signatures match the spec: names, parameter types, units, and return types.
- The exceptions match the spec, and each one carries a message that names the problem.

**The data and the errors**
- Every error condition in the spec has a path in the code, and each path does what the spec says.
- No catch-all handler hides an error the spec names.
- No failure is turned into a silent default, such as zero, an empty collection, or null.

**External calls and time**
- Every call that waits on the outside world has a failure path and, where relevant, a timeout.
- Asynchronous work isn't blocked on, and every asynchronous call is awaited.
- A cancellation or stop signal, if the signature accepts one, reaches the calls that wait.

**Values and dependencies**
- No credential, address, or environment-specific value is written into the source.
- Every call exists in the target version's reference, and none is marked deprecated or obsolete without a reason.
- Any new dependency has passed the license and security checks in Chapter 2, step 4.

**Evidence**
- The build produced no new warnings, or each new warning has a recorded decision.
- The acceptance examples from the spec have been run, and every row passes.
- Boundary and error cases are covered by a test, not only the typical case.

**Structure**
- The structure is no bigger than the task. Each class, interface, or layer has a reason.
- Naming and style follow the team's conventions. These come last, and they never outrank the items above.

## A filled-in entry

Here is the checklist applied to the settings loader from the reading step. The entries show what a useful answer looks like. Each one is a result and a reason, not a tick.

> **The data and the errors**
> - Every error condition in the spec has a path: **fail.** A missing file returns an empty map and doesn't raise the error the spec requires.
> - No catch-all handler hides an error the spec names: **fail.** The handler catches every exception, including the missing-file and malformed-line cases.
> - No failure is turned into a silent default: **fail.** An empty map is returned for a missing file, so a missing file looks like an empty configuration.
>
> **Values and dependencies**
> - No credential or address is in the source: **pass.** The method takes a path from the caller, and nothing environment-specific is written in.
>
> **Evidence**
> - The acceptance examples have been run: **not yet.** The table includes a value containing an equals sign, which the parsing rule requires to keep everything after the first one. The current code splits on every equals sign, so that row will fail when run.

Notice what the entries do. Each one names the failed rule, or the reason a rule doesn't apply. The last entry records a test that hasn't run yet, rather than assuming the result. A checklist filled in that way is a review. A checklist with every box ticked is a rubber stamp.

## Use the checklist without box-ticking

Three habits keep the checklist honest.

**Record a reason for every answer.** A pass needs a sentence about what you checked, and a fail needs the claim from step 1. "Pass" alone tells the author nothing, and it tells you nothing next month.

**Mark items as not applicable, with a reason.** A change with no external calls doesn't need the timeout item. Say so, and say why. An item marked "not applicable" with no reason looks like a skipped item.

**Don't let the checklist replace reading.** The checklist covers the questions you remember to ask. The reading finds the questions you didn't think of. Use both, and when the checklist passes but the reading raises a concern, the concern is a finding.

> **Aside: why checklists work, and when they fail.**
> Checklists work because they make a reviewer ask questions in the same order every time, and that consistency catches defects that memory would skip. They fail when the questions become a ritual, answered without looking. A checklist keeps the review honest only while each answer depends on the code in front of you. The moment an answer could be filled in without opening the file, the checklist has stopped doing its job.

## Try it

Choose one function you've written recently, or invent one. Fill in the checklist for it, with a result and a reason for every item. Mark at least one item not applicable, with a reason. Save the completed checklist in a file called `review-checklist.md` in your practice folder.

---
