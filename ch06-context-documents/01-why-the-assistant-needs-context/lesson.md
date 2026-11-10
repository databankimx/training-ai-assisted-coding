# Why the Assistant Needs Context

An assistant works with what's in front of it: the request, the files you've shared, and the conversation so far. Anything outside that is invisible, and the assistant doesn't know it's invisible. It doesn't say "I don't know your naming rules." It writes code that follows the most common naming rules it has seen, and the code looks fine.

This step lists the gaps. Each gap has a typical mistake, and that mistake is what the context document exists to prevent.

## Four things the assistant can't see

**1. Memory across sessions.** A new session starts empty. Yesterday's conversation about your error-handling policy isn't available today, unless the tool has been set up to carry it, and even then you can't be sure what was kept. The assistant that helped you design a module on Monday may not know it exists on Tuesday.

Typical mistake: the assistant reinvents a helper that already exists in the project, because it has no record that the helper was written.

**2. Your internal code.** The assistant has seen a great deal of public code. It has seen almost none of yours. A method called `EstimateCents` in your project has no public history, so the assistant can only guess what it does from its name.

Typical mistake: the assistant calls a method that doesn't exist in your project, or calls one that does exist with the wrong arguments, because it inferred the signature from a similar public library.

**3. Your conventions.** Naming, error types, money handling, logging, the way you split files, and the test framework you use are all choices your team made. They're rarely written in one place, and the assistant has no way to learn them from the code alone, because the code is only one example of them.

Typical mistake: the assistant uses floating-point numbers for money, because it's the most common pattern in public examples, and your team forbids it.

**4. Your reasons.** Some code looks wrong and is right, for a reason that lives in a ticket, a meeting, or a customer's contract. A context document can carry the reason. The assistant has no other way to find it.

Typical mistake: the assistant "fixes" a deliberate workaround, and removes the one thing that made a client's integration work.

## Why this costs you more than it looks

Each gap produces mistakes that look like ordinary bugs, but they're harder to catch than most. The code compiles. It follows a convention. It reads well. The mistake is only visible to someone who knows the project, and the reviewer may not be that person.

Chapter 3 showed that an assistant's output carries the appearance of care whether or not the care is there. Context changes that. A document that describes your project gives the assistant the facts it would otherwise guess, and it turns many of those guesses into correct answers, before the review even starts.

> **Aside: why more context isn't always better.**
> The context window has a limit, as Chapter 3 explained, and every token in it competes for attention. A context document stuffed with everything you know about the project can crowd out the part of the conversation that matters. The aim is the smallest set of facts that prevents the mistakes you've seen, not a copy of the whole wiki. The next step shows how to choose what goes in.

## Test yourself on the gaps

For each of the four gaps, think of one piece of your own project that the assistant couldn't know. Write it in a sentence, and then write the mistake the assistant would most likely make without it. Keep the four pairs in a file called `context-gaps.txt` in your practice folder.

If you're using a practice project, invent the pieces. A made-up naming rule is fine. The point is to practice noticing the gap, not to describe anything real.

---
