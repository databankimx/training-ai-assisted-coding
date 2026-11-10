// Lesson 5-2 starter (C#): the weak version of the largest-value function, from a one-line prompt.
// Run it, and compare each line with the expected output. Don't fix anything yet.
using System;
using System.Collections.Generic;

static int Largest(List<int> values)
{
    int max = 0;
    foreach (int value in values)
    {
        if (value > max) max = value;
    }
    return max;
}

var negatives = new List<int> { -4, -9, -2 };
Console.WriteLine($"Negatives: {Largest(negatives)}");

var empty = new List<int>();
Console.WriteLine($"Empty: {Largest(empty)}");
