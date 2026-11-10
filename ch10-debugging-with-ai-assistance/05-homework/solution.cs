// Homework solution (C#): every rating is added, and the count is the number of ratings.
using System;

static double Average(int[] ratings)
{
    int sum = 0;
    foreach (int rating in ratings)
    {
        sum += rating;
    }
    return (double)sum / ratings.Length;
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
