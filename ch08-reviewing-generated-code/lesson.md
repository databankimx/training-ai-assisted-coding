# Reviewing Generated Code

Generated code looks finished. It's formatted, it's named sensibly, it has comments, and it often compiles on the first try. Those signs are real, and Chapter 3 showed why they're not evidence. A review is the step that turns a plausible result into a decision, and this chapter is about doing that step with discipline.

The reviewer's job is not to admire the code or to rewrite it. It's to find the places where the code is wrong, to decide whether each one matters, and to say so in a form the author can act on.

## Why generated code needs a different kind of review

A human author usually writes code with a picture of what it's for. They know which parts they were unsure about, and they often remember the shortcut they took. An assistant has no such picture. Its output is the most likely continuation of your request, and it doesn't flag its own doubts. The defects in generated code therefore hide in the places a careful human would have hesitated, and they look like confidence.

That changes the review. A reviewer of generated code should assume that every line is a claim, and ask what evidence supports it.

## What you'll do

1. **Reading before running.** How to read a change in the order that finds the most defects.
2. **Stale and invented APIs.** How to spot a call that doesn't exist, or exists in a different version.
3. **Common failure modes.** The defects that generated code produces most often, with examples in three languages.
4. **A review checklist.** A checklist that works in any language, and how to use it without turning review into box-ticking.
5. **Code that passes every check and is still wrong.** Why automated checks aren't enough, and what the review has to add.

The homework is a review of three generated functions, with defects in each, and a written review note for each one. The summary has three quizzes.

---
