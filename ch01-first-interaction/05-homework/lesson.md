# Homework: A Three-Function Module

This homework puts the whole chapter into one small job. You'll write a module with three functions. For each function, you'll write the expected results first, let the assistant write the function, and check it against your expectations. Then you'll decide what to do with anything that fails.

You'll do the work in your own practice folder, in the language you chose. The starter file is empty, apart from a comment that says where your code goes. There's no solution in the editor until you ask for one. That's deliberate. The point is the process, and a finished answer you can look at would make the process easy to skip.

## The three functions

**`Max3(a, b, c)`** returns the largest of three numbers.

**`IsPalindrome(text)`** returns true when the text reads the same forwards and backwards. Ignore case, so `Racecar` counts.

**`CountVowels(text)`** returns how many of the letters `a`, `e`, `i`, `o`, and `u` the text contains. Ignore case.

Each function is small. Your job is to be precise about what each one should do before the assistant writes it.

## Step 1: write the expectations first

Before you ask for any code, write a notes file in your practice folder called `expectations.txt`. For each function, list at least four input and output pairs, and include at least one edge case. Here are some examples to get you started. Add your own, and don't copy these as your full list:

```text
Max3(3, 9, 4)            -> 9
Max3(-1, -5, -2)         -> -1
IsPalindrome("level")    -> true
IsPalindrome("Hello")    -> false
CountVowels("AI coding") -> 4
```

Include at least one case where the answer is surprising until you think about it. A good example is an empty string: what should `IsPalindrome("")` return, and what should `CountVowels("")` return? Decide on paper before you look at any code.

## Step 2: let the assistant write each function

Write each function's signature in your editor, add a comment that states the rule in words, and let the assistant suggest the body. Use the same habits as the earlier steps: read the suggestion, trace one example by hand, and press Tab only when the suggestion does what your comment says.

If you want a prompt for the assistant rather than inline completion, write one that includes your expectations. A useful prompt looks like this:

```text
Write a function IsPalindrome(text) that returns true when the text reads the same
forwards and backwards, ignoring case. Here are examples it must pass:
IsPalindrome("level") -> true
IsPalindrome("Hello") -> false
IsPalindrome("Racecar") -> true
Show only the function.
```

Notice that the prompt includes the examples. That's the same specification habit from Chapter 0, in its smallest form.

## Step 3: check every function

Write a short test script in your language. It should call each function with every example in your notes, and print the result next to the expected value. A line that doesn't match is a finding.

For each finding, decide which of the three choices from the last step fits: keep the suggestion, refine it with a specific request, or write the fix yourself. Write your decision in a file called `decisions.txt`, with one line per finding.

## What to hand in

Keep these files in your practice folder:

- `expectations.txt`, with your input and output pairs, written before the code
- Your three functions, in your language
- Your test script, and its output
- `decisions.txt`, with your decision for each finding, or a line that says there were none

If there were no findings, write why. A function that passes the examples you wrote is good evidence. Say whether you think your examples were thorough enough, and what you would add.

## Sample solution

When you've finished, press **Show solutions (spoiler)** in the Source tab. It shows a short note on the reasoning behind the sample solution, the sample prompt (`prompt.md`), and the solution in all three languages. A file selector then appears, so you can switch between `prompt.md` and the code. Read the note after you've made your own decisions, not before. The gate stays open the next time you visit this step.

## Optional review

If you're an employee, you can ask the development team at development@databankimx.com for a code review of your three functions. The review is optional. It's offered as a second reader, not as a grade.

---
