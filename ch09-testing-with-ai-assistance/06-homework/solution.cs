// Homework solution (C#): the suite completed with tests on either side of the grace period.
using System;
using System.Collections.Generic;
using System.Linq;

static int Fine(int daysOverdue, string mutant)
{
    if (daysOverdue < 0 && mutant != "no error") throw new ArgumentOutOfRangeException(nameof(daysOverdue));
    int grace = mutant == "grace one day long" ? 4 : mutant == "grace two days short" ? 2 : 3;
    int chargeable = Math.Max(0, daysOverdue - grace);
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

// The completed suite. The two added tests sit on each side of the grace period.
var suite = new List<(string Name, Func<Func<int, int>, bool> Test)>
{
    ("returns a non-negative fine", f => f(10) >= 0),
    ("caps at 2000", f => f(200) == 2000),
    ("zero for a book returned on time", f => f(0) == 0),
    ("rejects negative days", f => Throws(() => f(-1))),
    ("zero within the grace period, on the last free day", f => f(3) == 0),
    ("25 cents on the first chargeable day", f => f(4) == 25),
};

foreach (var mutant in new[] { "grace one day long", "grace two days short", "no cap", "no error" })
{
    bool caught = suite.Any(t => !SafeRun(t.Test, mutant));
    Console.WriteLine($"mutant {mutant}: {(caught ? "caught" : "missed")}");
}
