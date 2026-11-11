// Lesson 15-3 solution (C#): the boundary follows the rule. Only records older than 90 days are deleted.
using System;
using System.Linq;

string Decide(int ageDays) => ageDays > 90 ? "deleted" : "kept";

var records = new (int Id, int AgeDays)[] { (1, 30), (2, 90), (3, 91), (4, 400) };
foreach (var r in records)
{
    Console.WriteLine($"record {r.Id} ({r.AgeDays} days): {Decide(r.AgeDays)}");
}

int deleted = records.Count(r => Decide(r.AgeDays) == "deleted");
Console.WriteLine($"retention job: deleted {deleted} of {records.Length}");
