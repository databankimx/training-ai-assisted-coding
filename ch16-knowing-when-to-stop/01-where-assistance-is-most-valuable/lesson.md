# Where Assistance Is Most Valuable

An assistant doesn't help every task equally. Some tasks come out faster and better with it, and others come out slower and worse, and the difference is not the difficulty of the task. It's whether three conditions hold.

## Three conditions

**A familiar domain.** You know enough about the problem to recognize a good answer when you see one. An answer in a domain you know can be judged in seconds, and a wrong one is caught before it does harm.

**A quick check.** You can verify the result cheaply: a test that runs in a second, a value you can compute by hand, or a diff small enough to read in a minute. The faster the check, the more attempts you can afford, and the less you have to trust the first answer.

**A cheap fix.** If the answer is wrong, the cost of correcting it is low. A wrong suggestion in a scratch file costs nothing. A wrong suggestion in a production migration costs a rollback.

When all three hold, assistance usually pays back. When none holds, it usually costs more than it saves.

## Sort some tasks

Here are four tasks. Each one is judged against the three conditions.

> **Writing a parser for a file format you know well, with a test suite you already have.** The domain is familiar, the suite is a quick check, and a wrong parser is fixed in minutes. All three hold, so the assistant pays back.
>
> **Designing the data model for a system you have never worked on.** The domain is unfamiliar, so you can't judge a good design from a bad one. The check is slow, because a model is tested by living with it. The fix is expensive. Two conditions fail, and the assistant may give a fluent design you have no way to evaluate.
>
> **Renaming a variable across a file you can see.** The domain is trivial, the diff is easy to read, and a mistake is undone in a second. The assistant helps a little, and the work is so small that a plain search and replace may be faster.
>
> **Choosing the cryptographic approach for a feature that handles customer payments.** The domain may be unfamiliar, the check requires a specialist, and a wrong choice is costly and hard to undo. The conditions fail, and the decision belongs to the specialist, with the assistant at most explaining the options.

The first task is where assistance is most valuable. The second and fourth are where it is most dangerous, because they look like tasks the assistant can do. The third is where it is merely unnecessary.

> **Aside: why unfamiliar work tempts the wrong use.**
> When a domain is new to you, the assistant's answer is the only fluent answer in the room, and fluency is persuasive. That's when the three conditions matter most. A familiar domain lets you judge the answer. An unfamiliar one doesn't, and the assistant's confidence is no evidence that it is right. The honest response to unfamiliar work is to learn enough to check the answer first, or to bring in someone who knows the domain.

## Use the conditions as a question

Before a task, ask the three questions and write the answers in a line. If all three are yes, use the assistant. If any is no, decide whether you can make it yes: learn the domain, write the check, or make the fix cheaper by working in a small scope. If you can't, the task is better done without the assistant, or with a person who knows the domain.

## Try it

Choose three tasks from your recent work. Answer the three questions for each, in one line. Give each task a verdict: assistant, assistant with a check first, or without. For the task where your answer was no to any condition, write the single change that would turn it into a yes. Save your answers in a file called `assistance-fit.txt` in your practice folder.

---
