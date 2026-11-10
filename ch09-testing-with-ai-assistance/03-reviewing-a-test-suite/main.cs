// Lesson 9-3 starter (C#): a weak test suite, run against three deliberately broken versions of the fines function.
// Run it, read each mutant, then compare with the expected output. Don't fix anything yet.
using System;
using System.Collections.Generic;
using System.Linq;

static int Fine(int daysOverdue, string mutant)
{
    if (daysOverdue < 0 && mutant != "no error") throw new ArgumentOutOfRangeException(nameof(daysOverdue));
    int chargeable = mutant == "grace one day long" ? daysOverdue - 4 : daysOverdue - 3;
    if (chargeable < 0) chargeable = 0;
    int cap = mutant == "no cap" ? int.MaxValue : 2000;
    return Math.Min(chargeable * 25, cap);
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

static bool SafeRun(Func<Func<int, int>, bool> test, string mutant)
{
    try
    {
        return test(days => Fine(days, mutant));
    }
    catch (Exception)
    {
        return false;
    }
}

// The weak suite, written from the code's own shape rather than from the rules.
var suite = new List<(string Name, Func<Func<int, int>, bool> Test)>
{
    ("returns a non-negative fine", f => f(10) >= 0),
    ("caps at 2000", f => f(200) == 2000),
    ("is stable across calls", f => f(10) == f(10)),
    ("rejects negative days", f => Throws(() => f(-1))),
};

foreach (var mutant in new[] { "grace one day long", "no cap", "no error" })
{
    bool caught = suite.Any(t => !SafeRun(t.Test, mutant));
    Console.WriteLine($"mutant {mutant}: {(caught ? "caught" : "missed")}");
}
