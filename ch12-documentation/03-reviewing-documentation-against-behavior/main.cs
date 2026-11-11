// Lesson 12-3 starter (C#): a generated documentation comment, checked claim by claim against the function.
// Run it, read each claim, then compare with the expected output. Don't fix anything yet.
using System;

// Generated documentation:
//   Returns zero for negative days.
//   Charges 25 cents per day after the first three free days.
//   Caps the fine at 2000 cents.
//   Returns zero during the first three free days.
static int FineCents(int daysOverdue)
{
    if (daysOverdue < 0) throw new ArgumentOutOfRangeException(nameof(daysOverdue));
    int chargeable = daysOverdue - 3 - 1;   // the grace period is one day too long
    if (chargeable <= 0) return 0;
    return Math.Min(chargeable * 25, 2000);
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

Claim("returns zero for negative days", () => FineCents(-1) == 0);
Claim("caps the fine at 2000 cents", () => FineCents(200) == 2000);
Claim("charges 25 cents per day after the first three free days", () => FineCents(4) == 25);
Claim("returns zero during the first three free days", () => FineCents(3) == 0);
