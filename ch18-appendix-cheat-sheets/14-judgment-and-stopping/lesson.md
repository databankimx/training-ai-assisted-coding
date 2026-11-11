# Cheat Sheet: Judgment and Stopping

*From Chapter 16. Use before a task, and during a session that isn't going well.*

## Does the assistant pay back?

Yes only when all three hold:

- **Familiar domain.** I can recognize a good answer.
- **Quick check.** I can verify the result cheaply.
- **Cheap fix.** A wrong answer is easy to correct.

If one fails, learn enough to check, bring in someone who knows, or do the task without the assistant.

## Stop when

- The same failure keeps returning after each fix.
- The edits are growing faster than the request.
- I can't explain the output, and no test would tell me it's wrong.
- The deadline is now the reason for each prompt.

Count the failing cases after every round. If the count doesn't fall in two rounds, stop.

## The recovery

Write the failing case and the rule it breaks. Restart from a complete spec in a new session, or shrink the scope to the one case that matters.

## Prototype to production

Close the gaps in order: spec, tests, review, dependencies and data, designed errors, then an owner.

## The six questions, in writing, before the task

1. Is the data allowed here?
2. Is the domain familiar enough to judge an answer?
3. What is the smallest surface that does the job?
4. What is the spec, and where does it live?
5. How will I check the result, and how fast?
6. What would make me stop?

## Keep some work unassisted

Write one small function a week by hand. Review one change a week against the spec before running it.

## Common mistake

Continuing a session because each reply looks like progress. Count the failures instead.
