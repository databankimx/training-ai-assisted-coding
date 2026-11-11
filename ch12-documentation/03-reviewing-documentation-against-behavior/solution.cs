// Lesson 12-3 solution (C#): the function fixed to the spec, and the documentation corrected to match it.
using System;

// Returns the fine in cents for an item returned after the due date.
// Throws an argument error for negative days.
// The first three days after the due date are free.
// After that, the fine is 25 cents per day, capped at 2000 cents.
static int FineCents(int daysOverdue)
{
    if (daysOverdue < 0) throw new ArgumentOutOfRangeException(nameof(daysOverdue));
    int chargeable = Math.Max(0, daysOverdue - 3);
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

Claim("throws for negative days", () => { try { FineCents(-1); return false; } catch (ArgumentOutOfRangeException) { return true; } });
Claim("caps the fine at 2000 cents", () => FineCents(200) == 2000);
Claim("charges 25 cents per day after the first three free days", () => FineCents(4) == 25);
Claim("returns zero during the first three free days", () => FineCents(3) == 0);
