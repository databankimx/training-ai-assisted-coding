// Lesson 15-3 starter (C#): a retention rule. Records older than 90 days are deleted; a record exactly 90 days old is kept.
// Run it, read each line, then compare with the expected output. Don't fix anything yet.
using System;
using System.Linq;

string Decide(int ageDays) => ageDays >= 90 ? "deleted" : "kept";   // defect: a record exactly 90 days old is deleted

var records = new (int Id, int AgeDays)[] { (1, 30), (2, 90), (3, 91), (4, 400) };
foreach (var r in records)
{
    Console.WriteLine($"record {r.Id} ({r.AgeDays} days): {Decide(r.AgeDays)}");
}

int deleted = records.Count(r => Decide(r.AgeDays) == "deleted");
Console.WriteLine($"retention job: deleted {deleted} of {records.Length}");
