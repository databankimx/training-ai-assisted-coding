# Reviewing Documentation Against Behavior

A documented sentence is a claim, and a claim can be run. The reviewer's job is to take each sentence, decide what would show it is true, and check it. A sentence that can't be checked isn't a claim yet, and a sentence that fails the check is a defect in the documentation or in the code. Either way, it has to be resolved before the document is published.

This step gives you the method, and a claim check you can run.

## Run it

The starter has a generated documentation comment for the fines function, with four sentences. Each sentence is turned into a claim, and the claim is run against the function. Press **Run** (or F5) and read the four lines.

Two claims are supported and two are not. The first unsupported claim says the function returns zero for negative days. The function throws instead, so the claim fails. The second unsupported claim says the fine is 25 cents per day after the first three free days. The function gives zero for four days, because it applies the grace period one day too long.

The expected output shows every claim supported, which happens when the code and the documentation agree with the spec. Press **Check** on the starter to see the mismatch. Then press **Run** on the solution. The solution keeps the spec's behavior, and it corrects the documentation's first sentence to say what the function really does.

> **A note on the code.** The starter and solution were written by hand to show the difference between a document and its code. They aren't a record of what any assistant produced. The lesson is the method: each sentence becomes a check you run.

## Turn a sentence into a claim

A claim has three parts: the input, the expected behavior, and the condition under which the sentence is true. "Returns zero for negative days" becomes "calling with negative days gives zero." The first thing to notice is that this claim is false, because the function throws. The sentence was guessed from a convention, and the check finds the guess.

Some sentences are harder to check, such as "the fine is easy to understand." A claim like that isn't a claim, and the reviewer should either make it specific or remove it. A documentation sentence that no test could contradict isn't adding information.

## Decide which side is wrong

When a claim fails, two things could be wrong: the documentation, or the code. The spec decides which. If the spec says the function should apply a three-day grace period, then the code is wrong and the documentation is right. If the spec says nothing and the code is what the team uses, then the documentation has to describe the code, and the team should decide whether the behavior is intended.

Never fix a failing claim by changing the documentation to match a defective function. That turns a defect into a documented feature, and the defect is then harder to find.

> **Aside: why the test is a check on the document.**
> A document's sentences are, in effect, a second specification. They're often less precise than the first, and they're read by people who never see the code. A check that runs each sentence keeps the second specification honest. It's a cheap way to make sure the documentation still describes something real.

## Try it

Choose a function and write five sentences describing it, including at least one you suspect is wrong. Turn each sentence into a claim, with an input and an expected behavior. Run the claims against the function, and record supported or unsupported for each. For any unsupported claim, say which side the spec supports. Save the record in a file called `claim-check.txt` in your practice folder.

---
