// Lesson 3-3 solution (C#): the portable forms, which work on .NET Framework 4.8 and later.
using System;
using System.Collections.Generic;
using System.Linq;

int rawScore = 150;
Console.WriteLine($"Score (portable): {Math.Min(Math.Max(rawScore, 0), 100)}");

var items = new[] { 1, 2, 3, 4, 5 };
var pairs = new List<string>();
for (int i = 0; i < items.Length; i += 2) pairs.Add(string.Join("+", items.Skip(i).Take(2)));
Console.WriteLine($"Pairs (portable): {string.Join(", ", pairs)}");

var values = new[] { 3, 1, 2 };
var sortedPortable = (int[])values.Clone();
Array.Sort(sortedPortable);
Console.WriteLine($"Sorted (portable): {string.Join(", ", sortedPortable)}");
Console.WriteLine($"Original: {string.Join(", ", values)}");
