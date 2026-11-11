# Keeping Documentation Current

Documentation drifts. A change to the code arrives, the change is reviewed and merged, and the document that described the old behavior stays as it was. Nobody meant to leave it wrong. The review checked the code, and the document wasn't part of the change.

An assistant makes drift worse, because it produces documentation quickly and then forgets it exists. A generated document is only as current as the last time someone checked it against the code.

## Run it

The starter has a fines function whose cap was changed from 2000 cents to 1800 cents in a recent commit. The documentation still gives an example: 200 days overdue costs 2000 cents. Press **Run** (or F5) and read the three claims.

The first two claims are supported. The third is not. The example is now wrong, and anyone who reads it will expect the wrong number.

The expected output shows every claim supported, with the example corrected to the new cap. Press **Check** on the starter to see the failure. Then press **Run** on the solution. The function is the same as in the starter, because the decision was made in the code. Only the documentation changed, to match it.

> **A note on the code.** The starter and solution were written by hand to show drift. They aren't a record of what any assistant produced. The change of cap is an example of a decision, and the lesson is about the documentation that must follow it.

## Decide first, then update

Notice which side changed. The code changed because someone decided the cap should be 1800 cents. The documentation was written before that decision, so it's the side that is out of date. When the code and the documentation disagree, check the decision that produced the code, and update the document to match it.

The opposite case also happens. A document can be right and the code can be wrong, when a defect was introduced in a change. Then the fix goes in the code, and the documentation stays as it is. Check the spec, not only the last change, to decide which.

## Make the examples into checks

The examples are the part of documentation most likely to drift, and the easiest to check. A good habit is to keep every example in the documentation as a claim that runs in the project's tests. Then a change that makes an example untrue fails a test, and the example is updated in the same review as the code.

The runner's claim checks are a stand-in for that. In a real project, the claims would live in the test suite, and the documentation would quote them.

## Ask the assistant to find the drift

An assistant can help find drift if you give it both the documentation and the code, and ask it to list every sentence that the code no longer supports. Treat its list as a set of claims to check, not as a set of corrections. It may miss drift, and it may report drift that isn't there.

> **Aside: why drift is hard to notice.**
> A document that is slightly wrong still reads as if it's right. The sentence is grammatical, specific, and plausible, and the numbers look like they belong. A reader who doesn't run the code has no reason to doubt it, and the reviewer who approved the code change was looking at the code. Drift survives because the document is read as text, and the code is checked as behavior.

## Try it

Take a function you've changed recently, or change one in a copy. Find the documentation examples that the change made untrue, and write a claim for each. Run the claims before and after you update the examples, and record the results in a file called `drift-check.txt` in your practice folder. Write one sentence on whether the change was a decision or a defect, and which document was then correct.

---
