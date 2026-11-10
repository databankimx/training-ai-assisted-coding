// Lesson 3-4 solution (C#): the documented function, corrected to start from the first value.
using System;
using System.Collections.Generic;

// Returns the largest value in the list.
// Starts from the first value, so it works for any list with at least one value.
static int LargestValue(List<int> values)
{
    int largest = values[0];
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
