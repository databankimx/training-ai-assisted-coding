# Skill and Unassisted Practice

Every review in this course depended on a skill that the reviewer already had. You can tell a wrong rounding rule from a right one only if you know rounding. You can spot a missing owner check only if you have thought about who may see what. The assistant can produce answers faster than those skills develop, and a skill you never use fades.

This is the quiet cost of heavy use. It doesn't show up in any one task. It shows up later, when the assistant is unavailable, wrong, or out of date, and the person who should catch the error no longer can.

## How a skill fades

A skill fades through disuse, and the disuse is usually a sensible choice made many times. You let the assistant write the loop because it's faster. You let it choose the boundary because the test passed. Each choice saves minutes, and the total costs the ability to judge the next loop or the next boundary.

The fade is hard to notice, because the output stays good. The reviewer's judgment decays while the review still looks complete.

## Three signs

**You accept an answer you couldn't have written.** Not a problem in itself, but if you couldn't write it and couldn't check it, you have no basis for accepting it.

**You need the assistant to explain a concept you used to know.** A concept you once applied and now need explained has faded, and the explanation may be as unreliable as the code.

**You feel uneasy reviewing code without the assistant.** That unease is the sign of a skill you have stopped using, and it's the one a reviewer most needs.

## A practice routine

The fix is not to stop using the assistant. It's to keep some work unassisted, so the skill stays in use, and to choose which work that is.

**Write one function a week without it.** Pick something small in a domain you want to keep sharp. Write it first, then compare it with the assistant's version and note what differs.

**Review a generated change without running it first.** Read the diff against the spec, and predict the result of each case by hand. Then run the cases and check your predictions.

**Solve one bug from the log, not from the suggestion.** Read the output, form a hypothesis, and test it before you ask the assistant. Use the assistant to check your reasoning, not to produce it.

> **Example.** A developer who writes one parser a month by hand, and reviews every parser the assistant writes against it, keeps the parsing skill and the reviewing skill. A developer who only reviews assistant parsers keeps the reviewing skill for a while, and loses the sense of what a wrong parser looks like.

> **Aside: why the reviewer's skill is the scarce one.**
> The assistant produces code cheaply. The judgment that decides whether the code is right is not produced by the assistant. It comes from having done the work, and it's the one part of the process that gets more expensive as the code gets cheaper. Protecting it is a deliberate choice, and it's the choice this step asks you to make.

## Try it

Choose one skill from your work that you use with an assistant, such as writing boundary cases, reading a diff, or checking a rounding rule. Write one small unassisted task that would keep it in use, and schedule it for next week in a note. Then write one sentence on when you last used the skill without the assistant. Save your note in a file called `practice-plan.md` in your practice folder.

---
