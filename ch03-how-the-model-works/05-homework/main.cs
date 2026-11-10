// Homework starter (C#): generated code for the hunt.
// Run it. The compiler reports any method it can't find, with a line number. Then hunt. Don't fix anything yet.
using System;
using System.Linq;

var line = " alpha, ,beta ,, gamma ";
var fields = line.Split(',')
    .Select(f => f.Trim().ToUpperInvariant())
    .Where(f => !string.IsNullOrEmpty(f))
    .ToList();
Console.WriteLine($"Fields: {string.Join(", ", fields)}");

var count = fields.CountNonEmpty();
Console.WriteLine($"Count: {count}");
