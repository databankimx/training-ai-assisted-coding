// Lesson 5-2 solution (C#): the strong version, written from the six-part prompt.
using System;
using System.Collections.Generic;

static int Largest(List<int> values)
{
    if (values.Count == 0)
    {
        throw new ArgumentException("The list is empty.", nameof(values));
    }
    int max = values[0];
    foreach (int value in values)
    {
        if (value > max) max = value;
    }
    return max;
}

var negatives = new List<int> { -4, -9, -2 };
Console.WriteLine($"Negatives: {Largest(negatives)}");

try
{
    Largest(new List<int>());
    Console.WriteLine("Empty: no error");
}
catch (ArgumentException)
{
    Console.WriteLine("Empty: rejected");
}
