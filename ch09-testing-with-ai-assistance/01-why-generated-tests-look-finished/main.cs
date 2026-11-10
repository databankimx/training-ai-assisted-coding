// Lesson 9-1 starter (C#): a generated test suite, run against the fines function.
// Run it, read each result, then compare with the expected output. Don't fix anything yet.
using System;

static int FineCents(int daysOverdue)
{
    if (daysOverdue < 0) throw new ArgumentOutOfRangeException(nameof(daysOverdue));
    int chargeable = daysOverdue - 3 - 1;   // the grace period is one day too long
    if (chargeable <= 0) return 0;
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

Test("returns a non-negative fine", () => FineCents(10) >= 0);
Test("caps at 2000", () => FineCents(200) == 2000);
Test("is stable across calls", () => FineCents(10) == FineCents(10));
Test("rejects negative days", () => Throws(() => FineCents(-1)));
