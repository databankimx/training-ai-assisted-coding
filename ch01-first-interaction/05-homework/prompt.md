# Sample prompt and reasoning

This file shows the prompt used to build the sample solution, and explains the reasoning behind each choice in that prompt. The solutions for C#, Python, and JavaScript follow from it. Read your own attempt first, then compare.

## The prompt

```text
Write three small functions in <your language>:
- Max3(a, b, c) returns the largest of three integers.
- IsPalindrome(text) returns true when the text reads the same forwards and backwards,
  ignoring case. The empty string is a palindrome.
- CountVowels(text) returns how many of the letters a, e, i, o, u the text contains,
  ignoring case.
Each function must pass these examples:
Max3(3, 9, 4) -> 9
Max3(-1, -5, -2) -> -1
IsPalindrome("level") -> true
IsPalindrome("Hello") -> false
IsPalindrome("") -> true
CountVowels("AI coding") -> 4
CountVowels("rhythm") -> 0
Use no external libraries. Show only the three functions.
```

## Why the prompt is built this way

The prompt names each function, states its rule in words, and fixes the examples before the assistant writes a line. The examples are decided on paper first, so the check is a real test rather than a record of whatever the assistant produced.

It also settles the empty string, which a careless prompt would leave open. Without that line, an assistant might special-case the empty string, or might not, and you would have no way to tell which one you received.

The prompt asks for no external libraries, because the functions are small enough that a library would only add a dependency to review.

## The reasoning behind the solution

**Max3** uses the language's built-in maximum. In C# `Math.Max` takes two arguments, so it is applied twice. The examples mix positive and negative numbers, because a common bug is starting from zero, which gives the wrong answer when every input is negative.

**IsPalindrome** lowers the case first, because the rule ignores case. In C# and JavaScript it compares characters from both ends, moving inward. In Python the slice `[::-1]` reverses the whole text, which is shorter. The empty string needs no special case, since both versions find nothing to compare and report true. Deciding that on paper, before the code, is what the empty-string example is for.

**CountVowels** lowers the case, then counts each letter that appears in the string of vowels. `"AI coding"` has four vowels, the letters `a`, `i`, `o`, and `i`, which checks that the case rule works. `"rhythm"` has none, which checks the zero case.

## What to look for when you compare

- Did your Max3 handle negative numbers correctly, not just positive ones?
- Did your palindrome check ignore case, and did it accept the empty string?
- Did your vowel count include uppercase vowels?
- Did the assistant's version handle the empty string without a special case you didn't ask for?

If your version differs and still passes every example, the examples are the test. If it fails one, that failure is the finding you record in your decisions file.
