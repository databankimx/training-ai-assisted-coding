# Homework: Three Rounds on One Function

This homework takes one small function through three prompts. You'll write a first prompt, run its output, tighten the prompt in two rounds, and keep every prompt and every output. The function is a word counter: given a sentence, it returns how many words the sentence contains.

Write your work in a file called `three-rounds.txt` in your practice folder. For each round, keep the prompt, the output you got, and one sentence on what the output did wrong or right.

## The task

Count the words in a sentence. Punctuation doesn't count as a word, and repeated spaces don't create empty words. A sentence with no words returns zero. Your language, version, and signature are yours to choose, and you should name them in your first prompt.

Here are the cases you'll check the output against. Keep this list open while you work, and don't add to it.

- `"The cat sat."` returns 3.
- `"  many   spaces  here "` returns 3.
- `"Hello, world!"` returns 2.
- `""` returns 0.
- `"   "` returns 0.

## Round one

Write a first prompt. Use whatever your instinct says, for a language you know. Most people write one line, and that's the point of this round: you're setting a baseline.

Here is an example of a round-one prompt, so you can see the level of detail it has.

> Write a function that counts the words in a sentence.

Run the output against the five cases above. Note which ones it gets wrong. You'll almost certainly find that it gets the punctuation case or the spaces case wrong, or both.

## Round two

Tighten the prompt by adding the parts that round one left out. Name the language and version. Give the signature. State the contract for punctuation and spaces. State what an empty sentence returns.

Here are three possible round-two prompts. They're examples of the kind of change, not templates to copy.

> Python 3.12. A function called `count_words` that takes a string and returns an integer. Words are separated by whitespace. Punctuation characters don't count as part of a word, so `"Hello, world!"` has two words. An empty string or a string with only spaces returns zero.

> C# for .NET 10. A static method called `CountWords` that takes a `string` and returns an `int`. Count runs of letters and digits, and treat anything else as a separator. A null input throws `ArgumentNullException`. An empty string returns zero.

> JavaScript for Node 20. A function called `countWords` that takes a string and returns a number. A word is a run of letters or digits. Everything else separates words. Return zero for an empty or whitespace-only string.

Run the output against the five cases again. Write down what changed, and whether any case that passed in round one now fails.

## Round three

The second tightening adds the constraint and the edge case that round two didn't cover. The constraint might be about dependencies or scope, and the edge case might be the null input or a non-ASCII letter. Choose the one that your round-two output got wrong, or that you think is most likely to go wrong in real use.

Here are three examples of a round-three prompt, each adding a different kind of detail.

> Python 3.12. A function called `count_words` that takes a string and returns an integer. Use only the standard library, and don't use regular expressions. Words are runs of letters or digits, so `"don't"` counts as two words, and `"naïve"` counts as one, because the letter ï is a letter. An empty string returns zero, and a `None` input raises `TypeError`.

> C# for .NET 10. A static method called `CountWords` that takes a `string`. Don't use `Regex` or any LINQ query expression. Count runs of letters and digits, where letters are checked with `char.IsLetterOrDigit`. A null input throws `ArgumentNullException`. The method must not change the input string.

> JavaScript for Node 20. A function called `countWords` that takes a string. Don't use regular expressions. Split on any character that is not a letter or digit, using a loop, and count the non-empty pieces. Use a letter check that doesn't rely on regular expressions, and say in a comment which check you used.

Run the output against the five cases, and against your own extra case. Note the result of each.

## Run it

The starter is a first-round counter: it's what a one-line prompt often produces, and it splits on spaces only. Its checks run the five cases from the task, plus one with an accented letter. Press **Run** (or F5) and read each line.

Three cases fail. Repeated spaces create empty pieces, so the counts are too high. The empty string counts as one word, because splitting it gives one empty piece, and a string of three spaces counts as four for the same reason. Each failure points to a part of the prompt that was missing: the empty pieces are a missing contract for spaces, and the empty cases are a missing rule for an empty sentence.

Press **Check** on the starter, then press **Run** on the solution. The solution is the round-three counter: runs of letters and digits are words, and it handles every case, including the accented letter.

Use the harness as you tighten your prompt. After each round, run the cases again, and keep the output with the prompt that produced it. Your own prompts won't match the starter's code, and that's the point: the harness checks the behavior, not the wording.

> **A note on the code.** The starter and solution were written by hand to show the failures. They aren't a record of what any assistant produced. Use the harness to check your own outputs.

## What to hand in

Your file should contain three prompts, three outputs, and three sentences, in that order. Then add one final paragraph that answers two questions. Which round changed the output the most, and which part of the prompt did that change come from? If your round-three output was still wrong on any case, which part of the prompt would you change next?

---

~~~spoiler
Answer key. Your prompts will differ, and that's fine. What matters is that each round changes the part of the prompt that caused the mistake, and that you check every round against the cases.

**What round one usually gets wrong.** A one-line prompt almost always fails the punctuation case, because "word" is never defined. Some outputs split on spaces only, so `"Hello, world!"` returns two only by accident, and some count `"don't"` as one word and others as two. The empty and whitespace-only cases often fail, because the function returns one for an empty string when it splits on spaces and gets a single empty piece. Those failures are what the six parts are for.

**What round two usually fixes.** Naming the language and the version removes the choice between a regex library and a loop. Stating what counts as a word, and that punctuation separates words, fixes the punctuation case. Stating what an empty string returns fixes the zero cases. Round two usually passes the first four cases and still fails on the edge the prompt didn't mention, such as the null input or the accented letter.

**What round three usually fixes.** The constraint about regular expressions matters because a regex is a common default, and it can handle the punctuation case while missing the non-ASCII letters, depending on the pattern. Naming the non-ASCII case, and the null behavior, removes the last guesses. A good round three passes all five cases and the extra case you chose.

**Common mistakes in this homework.** Changing several things in one round, so you can't tell which change fixed which case. Accepting an output that passes the cases without reading it. Running the cases against the second output's code instead of the third, because the old file was still open. Writing a round-three prompt that adds a constraint nobody needed, which makes the output harder to review without making it more correct.

**What good work looks like.** A file where every round has a visible reason for its change, each change traces to a missing part of the six, and every output has a check you ran. The reflection names the round that mattered most, and points to the part of the prompt that did the work.
~~~

---
