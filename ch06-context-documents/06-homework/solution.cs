// Homework solution (C#): the grace period applied before the cap, as the context document requires.
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
    Console.WriteLine($"days {days} -> {actual} {status}");
}

Check(0, 0);
Check(1, 0);
Check(4, 25);
Check(200, 2000);
Check(-1, -1);
