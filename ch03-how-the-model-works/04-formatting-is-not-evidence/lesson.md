# Formatting Is Not Evidence

Assistants produce tidy code. The names are sensible, the indentation is consistent, the comments are full sentences, and the structure looks like what a careful developer would write. That's a real strength, and it's also a trap. Tidy output feels trustworthy, and the feeling has nothing to do with whether the code is correct.

This step shows the trap with a small example, then names the evidence that counts.

## Two versions of one function

Both versions below find the largest number in a list. One is tidy and wrong. The other is plain and correct. Each block is a complete program, and the starter file for this step contains the same code.

~~~examples
```csharp
using System;
using System.Collections.Generic;

// Returns the largest value in the list.
// Starts from zero, so every value in the list is compared against a known minimum.
static int LargestValue(List<int> values)
{
    int largest = 0;
    foreach (int value in values)
    {
        if (value > largest)
        {
            largest = value;
        }
    }
    return largest;
}

// Plain and correct: start from the first value, not from zero.
static int LargestValuePlain(List<int> values)
{
    int largest = values[0];
    foreach (int value in values)
    {
        if (value > largest) largest = value;
    }
    return largest;
}

var negatives = new List<int> { -4, -9, -2 };
Console.WriteLine($"Documented: {LargestValue(negatives)}");
Console.WriteLine($"Plain: {LargestValuePlain(negatives)}");
```
```python
def largest_value(values):
    """Return the largest value in the list.

    Starts from zero, so every value is compared against a known minimum.
    """
    largest = 0
    for value in values:
        if value > largest:
            largest = value
    return largest


# Plain and correct: start from the first value, not from zero.
def largest_value_plain(values):
    largest = values[0]
    for value in values:
        if value > largest:
            largest = value
    return largest


negatives = [-4, -9, -2]
print(f"Documented: {largest_value(negatives)}")
print(f"Plain: {largest_value_plain(negatives)}")
```
```javascript
/**
 * Returns the largest value in the array.
 * Starts from zero, so every value is compared against a known minimum.
 */
function largestValue(values) {
  let largest = 0;
  for (const value of values) {
    if (value > largest) {
      largest = value;
    }
  }
  return largest;
}

// Plain and correct: start from the first value, not from zero.
function largestValuePlain(values) {
  let largest = values[0];
  for (const value of values) {
    if (value > largest) largest = value;
  }
  return largest;
}

const negatives = [-4, -9, -2];
console.log(`Documented: ${largestValue(negatives)}`);
console.log(`Plain: ${largestValuePlain(negatives)}`);
```
~~~

The first version is the one with the helpful documentation, and it's wrong. Run the program with a list of negative numbers, such as `-4, -9, -2`, and the documented version returns `0`, because zero is larger than every value in the list. The comment says the function starts from a known minimum, and zero isn't the minimum of a list of negative numbers. The comment is confident, well-written, and false for the case that matters.

The second version has no documentation, and it's correct. It starts from the first value, so it works for any list that has at least one value.

> **Aside: why tidy output feels right.**
> People judge quality partly by how the thing looks. A clear name, a consistent layout, and a fluent comment all signal care, and in human writing they often do correlate with care. An assistant can produce all of those signals without any of the reasoning behind them, because they are patterns it learned from well-written code. The signals were never evidence on their own. In a human author they were a clue. In a generated function they are only a clue about style.

## The evidence that counts

What shows that a function works is a check you can run and repeat.

- **Examples with expected results, written first.** For the list above, you'd write `[-4, -9, -2]` expecting `-2` before you look at any code. A function that returns `0` fails in a way you can see immediately.
- **Edge cases.** Empty lists, one-element lists, all negative numbers, repeated values. These are where a tidy function most often fails.
- **Tests you can run.** A test runs the function and compares the result with the expected value. Repeating the run is what makes the result reliable.
- **Review by someone who reads the logic.** A reviewer who asks what the function does with an empty list is doing the check that formatting can't replace.

Formatting is what you look at last, not first. Once the function passes its examples, tidy formatting is a bonus. Before that, it's a distraction.

## Run it

Press **Run** (or F5) on the starter. The output shows `Documented: 0`, and the expected output for this step is `Documented: -2`. The plain version is right, and it prints `-2`. That mismatch is the finding, and Check will report it.

Then fix the documented version, so its comment matches its code, and check it again. The solution contains the corrected version, if you want to compare. Compare it only after you've fixed your own.

## Try it

Write the expected result for `largestValue([-4, -9, -2])` on paper before you run anything. Then run the first version in your chosen language, and compare. Write your expected result, the actual result, and one sentence about which one you'd have trusted from the comment alone, in a file called `formatting-check.txt` in your practice folder.

Then add two more examples of your own, one with an empty list and one with a single value. Predict what each version returns before you run it. Note which predictions you got wrong.

---
