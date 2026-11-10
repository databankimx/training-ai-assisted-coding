// Lesson 9-5 solution (C#): the implementation written to pass the spec, and the suite restored to the spec's value.
using System;
using System.Collections.Generic;

var spec = new List<(int Days, int Cents)> { (3, 0), (4, 25), (200, 2000) };

// The suite, restored so that its expectation for day four matches the spec.
var suite = new List<(int Days, int Cents)> { (3, 0), (4, 25), (200, 2000) };

static int FineCents(int daysOverdue)
{
    int chargeable = Math.Max(0, daysOverdue - 3);
    return Math.Min(chargeable * 25, 2000);
}

foreach (var (days, cents) in suite)
{
    int actual = FineCents(days);
    Console.WriteLine($"test day {days}: {(actual == cents ? "pass" : "fail")}");
}

string disagreement = "";
foreach (var row in suite)
{
    var specRow = spec.Find(s => s.Days == row.Days);
    if (specRow.Cents != row.Cents)
    {
        disagreement = $"day {row.Days} expects {row.Cents}, spec says {specRow.Cents}";
        break;
    }
}
Console.WriteLine(disagreement == "" ? "suite agrees with spec: yes" : $"suite agrees with spec: no ({disagreement})");
