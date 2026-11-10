// Homework starter (C#): a rating average with a seeded bug. Run it, debug it, and record each hypothesis.
// Don't change the code until you have a hypothesis you can test.
using System;

static double Average(int[] ratings)
{
    int sum = 0;
    for (int i = 0; i < ratings.Length - 1; i++)
    {
        sum += ratings[i];   // seeded bug: the last rating is never added
    }
    return (double)sum / (ratings.Length - 1);
}

static void Check(int[] ratings, double expected)
{
    double actual = Average(ratings);
    string status = actual == expected ? "pass" : $"fail (expected {expected})";
    Console.WriteLine($"ratings {string.Join(",", ratings)}: {actual} {status}");
}

Check(new[] { 4, 5, 3, 2 }, 3.5);
Check(new[] { 5, 5 }, 5);
Check(new[] { 2, 4, 6 }, 4);
