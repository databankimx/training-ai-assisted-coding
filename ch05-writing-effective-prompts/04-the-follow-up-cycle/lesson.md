# The Follow-Up Cycle

Few prompts are right the first time, and that's fine. Working with an assistant is usually a cycle: you send a prompt, read the output, notice what's wrong, and send a follow-up. The cycle works well when each follow-up is precise. It works badly when each follow-up is a complaint, and the conversation grows into a long argument that Chapter 3 warned about.

This step covers how to run the cycle well, and when to stop running it. Most of it is shown through short exchanges, so you can see the difference between a useful follow-up and a wasted one.

## Refine the part that failed

When an output is wrong, the most useful question is which of the six parts let the mistake through. If the code starts from zero, the contract didn't cover negative numbers. If it returns zero for an empty list, the error behavior wasn't stated. Find the part, and change that part.

Here is the largest-value function again, with the first output starting from zero. Compare the two follow-ups.

> **Vague follow-up:**
> This isn't right. Try again.
>
> **Precise follow-up:**
> The method starts from zero, so a list of negative numbers returns zero. Start from the first value instead. Keep the method name, the parameter type, and the exception message the same.

The vague version asks the assistant to guess what's wrong again, and it may change things you were happy with. The precise version names the failure, gives the fix, and says what must stay the same.

## Keep what works

Every follow-up risks breaking what was already right, so say what must stay the same. Without that, a correction to one line often comes back with changes to several others. These examples each add a keep-clause to a correction.

> Correction without a keep-clause:
> Add a check for null.
>
> Correction with a keep-clause:
> Add a check for null at the top of the method, and throw `ArgumentNullException`. Keep everything else exactly as it is, including the loop and the return value.

> Correction without a keep-clause:
> Make the variable names clearer.
>
> Correction with a keep-clause:
> Rename `x` to `customerCount` and `tmp` to `runningTotal`. Don't rename anything else, and don't change the logic.

> Correction without a keep-clause:
> Add a log message.
>
> Correction with a keep-clause:
> Add one log line before the `return`. Don't change the return value, the exceptions, or the order of the other statements.

## Check after each round

After each follow-up, test the output against the case that failed, and against one case that passed before. A fix that solves the new problem and breaks an old one is common, and it's easy to miss when you only read the code.

Chapter 9 covers testing in full. For now, the rule is simple: each round should end with a check you ran, not with a sentence that says the code looks better. These are the kinds of checks that follow a correction.

> Round check: Run the empty list, the one-value list, and the all-negative list. Compare each result with the expected value from the specification.

> Round check: Run the three existing tests for `Withdraw`. They must still pass, and the new log line must not appear in their assertions.

## Recognize a follow-up that's really a restart

Some follow-ups are signals that the conversation has gone off track. A common one is a follow-up that asks the assistant to undo its own last fix.

> User: Thanks. Now add a null check.
> Assistant: [adds the null check, and removes the empty-list exception it had added in an earlier round]
> User: Put the empty-list exception back.
> Assistant: [restores it, and drops the null check]
> User: I need both.

The conversation now holds two versions of the same requirement, and each change undoes the last. A third follow-up will probably make the same mistake. The better move is to write both requirements into a single complete prompt and start a new session.

## When to stop and start again

A conversation that has gone through several rounds is carrying a lot of history. Some of that history is now wrong: an early attempt you rejected, a constraint corrected halfway, a misunderstanding never cleared up. The assistant may keep returning to those earlier versions. Chapter 3 explained that long conversations lose their early constraints, and they also keep their early mistakes.

A useful rule is this. If two follow-ups haven't fixed the problem, stop the conversation. Write one complete prompt that includes the corrected spec from the start, and send it in a new session. Here is the same request before and after a restart.

> **Stacked corrections, three rounds in:**
> Round one: Write a function that returns the largest value.
> Round two: It should throw on an empty list.
> Round three: It also must handle negative numbers, and the throw should be an `ArgumentException`, not a `ValueError`.
> Round four: Now it's back to returning zero for negatives.

> **Restarted, with one complete prompt:**
> C# for .NET Framework 4.8. A static method called `Largest` that takes a `List<int>` and returns its largest value. The list may contain negative numbers. If the list is empty, throw an `ArgumentException` whose message says so. Don't use LINQ.

The second prompt carries every correction at once, and nothing from the earlier rounds can drift back in.

Watch for these signs that it's time to restart:

- The assistant fixes one thing and breaks another each time.
- You're repeating a constraint you already gave.
- The output keeps adding back something you removed.
- You've lost track of which version is the current one.

> **Aside: why stacked corrections drift.**
> Each follow-up is read together with everything before it, and the earlier wrong answers are still in the context. The model is trying to be consistent with the conversation it has, including its own earlier mistakes. A fresh prompt has no such history to be consistent with, so it can start from your spec. The restart isn't a failure of the conversation. It removes a source of confusion the conversation has built up.

## Try it

Imagine a first output that starts from zero. Write three follow-ups for it: one vague, one precise without a keep-clause, and one precise with a keep-clause. Then write a sentence on what each is likely to produce. Save the three in a file called `follow-ups.txt` in your practice folder.

---
