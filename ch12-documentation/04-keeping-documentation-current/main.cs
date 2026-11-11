// Lesson 12-4 starter (C#): documentation examples that have drifted from the code.
// A recent commit changed the cap from 2000 to 1800 cents, and the documentation was not updated.
// Run it, read each claim, then compare with the expected output. Don't fix anything yet.
using System;

// Examples from the documentation:
//   Three days overdue costs nothing.
//   Four days overdue costs 25 cents.
//   200 days overdue costs 2000 cents.
static int FineCents(int daysOverdue)
{
    if (daysOverdue < 0) throw new ArgumentOutOfRangeException(nameof(daysOverdue));
    int chargeable = Math.Max(0, daysOverdue - 3);
    return Math.Min(chargeable * 25, 1800);   // the cap changed from 2000 to 1800 in a recent commit
}

static void Claim(string text, Func<bool> holds)
{
    bool supported;
    try
    {
        supported = holds();
    }
    catch (Exception)
    {
        supported = false;
    }
    Console.WriteLine($"claim \"{text}\": {(supported ? "supported" : "unsupported")}");
}

Claim("three days overdue costs nothing", () => FineCents(3) == 0);
Claim("four days overdue costs 25 cents", () => FineCents(4) == 25);
Claim("200 days overdue costs 2000 cents", () => FineCents(200) == 2000);
