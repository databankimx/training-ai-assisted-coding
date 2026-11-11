# Stop Conditions

A session converges when each round gets closer to the answer. It stops converging when the rounds go around in circles, or drift away from the goal. The trouble is that a non-converging session doesn't announce itself. Each reply looks like progress, and the next prompt seems like the one that will fix it.

Chapter 5 said to restart when corrections stack up. This step gives you the full set of stop conditions, with the sign of each one, and the recovery to choose instead of another round.

## Four stop conditions

**Repeated failure to converge.** The same failure comes back after each fix, or a fix for one case breaks another. The sign is a pattern in the failure list: the same case, or a rotating set of cases.

**Editing more than writing.** You spend more time correcting the output than you would have spent writing the code, or the assistant's changes are growing larger than the request. The sign is a diff that keeps getting bigger without the scope getting bigger.

**Not understanding the output.** You accept code you can't explain line by line. The sign is a moment when you think "I'm not sure what this does, but it passes", and you have no test that would tell you it was wrong.

**Deadline pressure.** The schedule is now the reason the next round is needed, and the quality of each round is falling. The sign is that your prompts are getting shorter and more urgent.

## An example of drift

Here is a session that stopped converging. The task was a function that parses a date from a file name. Each message is a real kind of request, and the sequence shows the drift.

> **Round 1:** Parse the date from the file name.
> **Round 2:** It fails on names without a date. Handle that.
> **Round 3:** Now it returns the wrong month for names with a dash. Fix that.
> **Round 4:** The dash fix broke the names without a date. Fix both.
> **Round 5:** Both pass now, but the function is three times longer than before. Simplify it.
> **Round 6:** The simplified version fails on the dash names again.

By round six, the session has failed on the same case twice, the code has grown, and each request is a repair of the last one. That's the first stop condition, repeated failure, and the second, editing more than writing. The right move was to stop at round four, not to write round seven.

## The recovery for each condition

Each stop condition has a recovery that replaces another round of prompting.

- **Repeated failure.** Write the one case that fails and the rule it breaks, on paper, before the next prompt. Often the case shows that the spec is missing a rule, and the fix is in the spec, not the code.
- **Editing more than writing.** Restart from the spec with a complete prompt, as Chapter 5 showed. Keep the old code only for reference.
- **Not understanding the output.** Stop accepting the code. Write the tests that would tell you whether it works, or ask someone who knows the domain to read it.
- **Deadline pressure.** Shrink the scope to the one case that matters, and make the rest a separate, later task with its own spec.

> **Aside: why a session feels like progress when it isn't.**
> Each reply arrives with a fluent explanation and a change that looks like a fix. The sense of motion is produced by the conversation, not by the code's behavior. Counting the failing cases after each round, rather than reading each reply, is the cheapest way to see whether the session is moving.

## A rule for the session

Count the failing cases after every round, and write the number in the margin. If the number doesn't fall after two rounds, stop the session, and use one of the recoveries above. The count takes ten seconds, and it's the most reliable signal you have that a session has stopped converging.

## Try it

Think of a session, real or remembered, that went on too long. Write its rounds in a list, with the failing cases after each one. Name the stop condition that applied, and the round where you should have stopped. Then write the recovery you would have chosen at that point. Save your list in a file called `session-review.md` in your practice folder.

---
