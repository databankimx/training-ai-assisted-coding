# Refactoring with AI Assistance

Refactoring means changing the structure of code without changing what it does. It sounds like a safe activity, and it's one of the places an assistant is most useful, because it's good at the repetitive parts: renaming, moving code, and removing duplication. It's also a place where a quietly changed behavior can get past everyone, because the new code looks cleaner than the old.

The rule for this chapter is that a refactoring is only a refactoring if the behavior is the same. That rule is easy to state and hard to keep, and the tools that help keep it are tests and checkpoints.

## What you'll do

1. **Why broad refactoring prompts go wrong.** Asking for "a cleaner version" invites changes nobody asked for.
2. **Where the assistant does well.** Naming, structure, and duplication, and how to ask for them.
3. **Behavior-preserving or behavior-changing.** Telling the two apart in a diff, using cases the old and new code must agree on.
4. **Checkpoints during refactoring.** Stopping after each change, and checking before the next one starts.

The homework is a module with three refactoring changes already applied by an assistant. One of them changes behavior. You find it with checkpoints and fix it. The summary has three quizzes.

The runnable steps compare old and new code case by case. The result is a visible line for each case, so a behavior change shows up as a line that differs.

---
