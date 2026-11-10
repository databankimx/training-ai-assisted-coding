# Homework solution: the prompt and the reasoning

This note describes how the sample solution was built. The prompt used to build it is in `prompt.md`, and this note explains the reasoning behind each decision in the code. Read your own attempt first, then compare. The code is in three files, one per language. Each prints the same checks, so you can compare the output.

## The prompt

The prompt is in `prompt.md`. It names each function, states its rule in words, and fixes the examples before the assistant writes a line. It also settles the empty string, which a careless prompt would leave open.

## The reasoning

**Max3** uses the language's built-in maximum, applied twice for C# because its `Math.Max` takes two arguments. The examples cover a mix of positive and negative numbers, because a common bug is starting from zero, which gives the wrong answer for all-negative inputs.

**IsPalindrome** lowers the case first, because the rule ignores case. In C# and JavaScript it compares characters from both ends, moving inward. In Python the slice `[::-1]` reverses the whole text, which is shorter. The empty string needs no special case: both versions find nothing to compare and report true. Deciding this on paper, before the code, is what the empty-string example is for.

**CountVowels** lowers the case, then counts each letter that appears in the string of vowels. The example `"AI coding"` has four vowels, the letters `a`, `i`, `o`, and `i`, which is a good check that the case rule works. `"rhythm"` has none, so it checks the zero case.

## What to look for when you compare

- Did your Max3 handle negative numbers correctly, not just positive ones?
- Did your palindrome check ignore case, and did it accept the empty string?
- Did your vowel count include uppercase vowels?
- Did the assistant's version handle the empty string without a special case you didn't ask for?

If your version differs and still passes every example, the examples are the test. If it fails one, that failure is the finding you record in your decisions file.
