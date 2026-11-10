// Lesson 3-3 starter (C#): the newer and portable forms of three tasks.
// The newer forms run silently. If one fails on your version, it prints the reason.
using System;
using System.Collections.Generic;
using System.Linq;

int rawScore = 150;
try { _ = Math.Clamp(rawScore, 0, 100); }
catch (Exception error) { Console.WriteLine($"Newer clamp failed: {error.Message}"); }
Console.WriteLine($"Score (portable): {Math.Min(Math.Max(rawScore, 0), 100)}");

var items = new[] { 1, 2, 3, 4, 5 };
try { _ = items.Chunk(2).ToList(); }
catch (Exception error) { Console.WriteLine($"Newer chunk failed: {error.Message}"); }
var pairs = new List<string>();
for (int i = 0; i < items.Length; i += 2) pairs.Add(string.Join("+", items.Skip(i).Take(2)));
Console.WriteLine($"Pairs (portable): {string.Join(", ", pairs)}");

var values = new[] { 3, 1, 2 };
try { _ = values.OrderBy(v => v).ToList(); }
catch (Exception error) { Console.WriteLine($"Newer sort failed: {error.Message}"); }
var sortedPortable = (int[])values.Clone();
Array.Sort(sortedPortable);
Console.WriteLine($"Sorted (portable): {string.Join(", ", sortedPortable)}");
Console.WriteLine($"Original: {string.Join(", ", values)}");
