# Why a Written Spec Beats a Long Chat

A long conversation with an assistant feels productive. Each message adds a detail, each answer makes progress, and by the end there's a lot of agreed material scattered through the transcript. The trouble is that the agreement lives in the transcript, and the transcript is the one thing nobody can review, hand over, or rely on.

This step explains what a file gives you that a conversation can't, and how to tell when a chat has started doing a spec's job badly.

## Four things a file gives you

**1. A place to be wrong on purpose.** A draft spec can be changed, struck through, or argued with. A conversation records every change as a new message, so the final agreement is buried under the decisions it replaced.

**2. Something a second person can review.** A colleague can read a spec in ten minutes and tell you what you missed. Asking them to read forty messages of conversation is a different request, and they'll usually decline.

**3. Something that survives the session.** A conversation ends. A file stays in the repository, where it's versioned, linked from the pull request, and found by the next person who needs it.

**4. A way to tell when you're finished.** A spec lists what must be true. A conversation has no such list, so "finished" becomes "the assistant stopped asking questions," which isn't the same thing.

## The same request, two ways

Here is the grace-period feature, asked for in a long chat. Each message is reasonable on its own.

> **Message 1:** Can we add a grace period to the fines calculator?
>
> **Message 2:** Three days, I think. Make it so the first three days are free.
>
> **Message 3:** Actually, should the cap apply before or after the grace period?
>
> **Message 4:** After. The cap is still 2000 cents.
>
> **Message 5:** What happens for a book returned on its due date?
>
> **Message 6:** It should owe nothing, like before.
>
> **Message 7:** Good. Now write it.

After seven messages, the agreed rules are: a three-day grace period, the cap applied after it, and no fine on the due date. None of that is written anywhere except in the transcript. A reviewer would have to reconstruct it, and the next person to change the feature would have to find the transcript first.

Here is the same material as a spec fragment.

> **Grace period.** The first three days after the due date are free. The fine applies to days beyond them, at 25 cents per day. The 2000-cent cap applies after the grace period is subtracted. A book returned on its due date owes 0 cents.

The fragment is shorter than the conversation, and it says the same thing without the back-and-forth. A reviewer can check it in a minute. The next developer doesn't need the transcript.

## Signs that a chat is doing a spec's job

Some conversations should have been specs from the beginning. These are the signs that the agreement has started to matter more than the exchange.

- **You're repeating a decision.** If you've said "three days" twice, it's a decision, and it belongs in a document.
- **Someone asks what was agreed.** If the answer requires scrolling back through the transcript, the agreement isn't finished.
- **The code depends on a rule that only appears once.** A rule stated in message four and forgotten in message nine is a bug waiting for a reviewer.
- **You'd want to show the decision to someone else.** If you'd forward the chat, you'd forward a spec instead.

> **Aside: why a conversation forgets its decisions.**
> Chapter 3 described how a long conversation can lose its early constraints. That's the mechanical reason. The human reason is that a conversation rewards the next message, not the agreed one. Each reply is a fresh step, and a decision made in message four feels settled in the moment, so nobody writes it down. A spec forces the decision into a form that has to be finished before anyone can rely on it.

## The rule to take away

A chat is good for finding out what you want. A spec is good for saying what you want. Once the conversation has produced a decision, write the decision down, and move the rest of the work to the file. The next step shows what the file contains.

## Try it

Think of a conversation you've had with an assistant about a piece of work that ran longer than a few messages. Write down the decisions it produced, one per line, in a file called `chat-decisions.txt` in your practice folder. Then count how many of those decisions were written down anywhere except the transcript. Note the number, and which decision you'd most want a reviewer to check.

---
