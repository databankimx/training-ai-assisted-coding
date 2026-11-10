// Lesson 9-5 starter (C#): test-first. The suite comes first, the implementation is a placeholder, and the suite is checked against the spec.
// Run it, read each test, then compare with the expected output. Don't fix anything yet.
using System;
using System.Collections.Generic;

// The spec, as data: days overdue, and the expected fine in cents.
var spec = new List<(int Days, int Cents)> { (3, 0), (4, 25), (200, 2000) };

// The suite. Its expectation for day four was changed to match an earlier defect.
var suite = new List<(int Days, int Cents)> { (3, 0), (4, 100), (200, 2000) };

// The implementation has not been written yet. The placeholder is the red state.
static int FineCents(int daysOverdue) => -1;

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
