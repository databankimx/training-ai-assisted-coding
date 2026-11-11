// Lesson 12-4 solution (C#): the documentation example updated to the cap the code now enforces.
using System;

// Examples from the documentation:
//   Three days overdue costs nothing.
//   Four days overdue costs 25 cents.
//   200 days overdue costs 1800 cents, because the cap is 1800 cents.
static int FineCents(int daysOverdue)
{
    if (daysOverdue < 0) throw new ArgumentOutOfRangeException(nameof(daysOverdue));
    int chargeable = Math.Max(0, daysOverdue - 3);
    return Math.Min(chargeable * 25, 1800);
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
Claim("200 days overdue costs 1800 cents", () => FineCents(200) == 1800);
