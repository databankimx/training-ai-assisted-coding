// Homework solution (C#): the same task with real LINQ methods.
using System;
using System.Linq;

var line = " alpha, ,beta ,, gamma ";
var fields = line.Split(',')
    .Select(f => f.Trim().ToUpperInvariant())
    .Where(f => !string.IsNullOrEmpty(f))
    .ToList();
Console.WriteLine($"Fields: {string.Join(", ", fields)}");
Console.WriteLine($"Count: {fields.Count}");
Console.WriteLine($"Sorted: {string.Join(", ", fields.OrderBy(f => f))}");
