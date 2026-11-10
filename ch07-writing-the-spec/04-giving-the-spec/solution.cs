// Lesson 7-4 solution (C#): the follow-up applied. The grace-period arithmetic is corrected, and every row passes.
using System;

static int FineCents(int daysOverdue)
{
    if (daysOverdue < 0) throw new ArgumentOutOfRangeException(nameof(daysOverdue));
    int chargeable = Math.Max(0, daysOverdue - 3);
    return Math.Min(chargeable * 25, 2000);
}

static void Check(int days, int expected)
{
    string actual;
    try
    {
        actual = FineCents(days).ToString();
    }
    catch (ArgumentOutOfRangeException)
    {
        actual = "error";
    }
    string expectedText = expected < 0 ? "error" : expected.ToString();
    string status = actual == expectedText ? "pass" : $"fail (expected {expectedText})";
    Console.WriteLine($"days {days}: {actual} {status}");
}

Check(0, 0);
Check(3, 0);
Check(4, 25);
Check(83, 2000);
Check(200, 2000);
Check(-1, -1);
