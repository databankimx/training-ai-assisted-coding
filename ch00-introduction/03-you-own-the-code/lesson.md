# You Own the Code

Here is the rule that every other chapter depends on: **you own every line of code you deliver.** It doesn't matter whether you typed it, a colleague typed it, or an assistant generated it at two in the morning while you were asleep. If your name is on the change, you are responsible for what it does.

This sounds obvious. It stops being obvious the first time an assistant hands you forty lines that look right and nobody on the team can explain them.

## Why "the AI wrote it" doesn't work

Imagine a production problem. A customer report is wrong, a batch job fails, or a security scan flags a hole. Someone asks who wrote the code, and the answer is "the assistant did, and it seemed fine."

That answer doesn't help anyone fix the problem, and it doesn't protect the people who approved the change. The reviewer asks what the code was supposed to do. The author needs to know why it does what it does. Nobody gets far with "the model predicted it."

Responsibility doesn't move to the tool. The policy says it plainly: AI can support a task, but human judgment must always prevail, and AI outputs must be reviewed before anyone acts on them. The assistant is a tool you use, the same way you use a compiler or a search engine. You don't blame the compiler for a bug in your logic, and you don't blame the assistant for yours.

> **Aside: why accountability belongs to people.**
> Accountability exists so that someone can be asked a question and give a useful answer. A system that cannot explain itself, cannot be held to a promise, and does not share the consequences of a failure cannot be accountable. Software teams have always relied on people for this, even before AI existed. Review, sign-off, and the name on the commit are how a team says "I stand behind this." Those mechanisms still work, and they're the reason we keep them.

## The test you apply

Before you submit any code, you should be able to answer these questions without reading the code out loud:

- What does this code do, from start to finish?
- What inputs does it expect, and what does it do with bad ones?
- What happens when something goes wrong?
- Why did I choose this approach over the alternatives?
- Do I trust every library and function it calls, and can I name the version?

If the answer to any of these is "I'm not sure," you're not ready to submit. You can ask the assistant to explain the code, read the explanation, check it against the documentation, and then decide. You can also rewrite the part yourself. Either way, the decision is yours.

## What this rule does not mean

Ownership doesn't mean you have to write everything yourself. The course is about using assistants well, and a good assistant saves real time. Ownership means you don't submit what you don't understand.

It also doesn't mean you have to be the only reviewer. Your team's review process still applies to every change, whoever or whatever produced it. Review is not a sign of distrust. It's how a team makes sure two people have looked at the same thing. The development rules of engagement describe how that review works for our code: [Development Rules of Engagement](https://databankimx.sharepoint.com/:b:/r/sites/Hub-PS/DevTools/Policies/development-rules-of-engagement.pdf?d=w1c01477e09e048acbe4c96eba851a183&csf=1&web=1&e=soWe8x).

## Try it

Pick a short function from a project you know well, or write a three-line function yourself. Without running anything, explain it aloud, line by line, as though a new colleague were asking. Notice which lines you explained easily and which you had to think about. Those are the lines you should understand before they go into a pull request.

---
