// Lesson 9-1 solution (C#): the fines function fixed, and tests written from the spec.
using System;

static int FineCents(int daysOverdue)
{
    if (daysOverdue < 0) throw new ArgumentOutOfRangeException(nameof(daysOverdue));
    int chargeable = Math.Max(0, daysOverdue - 3);
    return Math.Min(chargeable * 25, 2000);
}

static bool Throws(Action action)
{
    try
    {
        action();
        return false;
    }
    catch (Exception)
    {
        return true;
    }
}

static void Test(string name, Func<bool> test)
{
    bool passed;
    try
    {
        passed = test();
    }
    catch (Exception)
    {
        passed = false;
    }
    Console.WriteLine($"test {name}: {(passed ? "pass" : "fail")}");
}

Test("zero within the grace period", () => FineCents(3) == 0);
Test("25 cents per day after the grace period", () => FineCents(4) == 25);
Test("caps at 2000", () => FineCents(200) == 2000);
Test("rejects negative days", () => Throws(() => FineCents(-1)));
