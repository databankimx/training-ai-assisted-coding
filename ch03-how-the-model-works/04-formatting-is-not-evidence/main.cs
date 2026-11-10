// Lesson 3-4 starter (C#): a documented function that is wrong, and a plain one that is right.
// Run it, and compare the output with the expected result. Don't fix anything yet.
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
