// Lesson 7-4 starter (C#): the generated fines function, checked against the full acceptance table.
// Run it, read the check record, then compare it with the expected output. Don't fix anything yet.
using System;

static int FineCents(int daysOverdue)
{
    if (daysOverdue < 0) throw new ArgumentOutOfRangeException(nameof(daysOverdue));
    int chargeable = daysOverdue - 3 - 1;   // the grace period is applied one day too long
    if (chargeable <= 0) return 0;
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
