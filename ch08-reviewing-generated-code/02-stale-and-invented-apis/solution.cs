// Lesson 8-2 solution (C#): the same three tasks, written with calls that exist in .NET 10.
using System;
using System.Collections.Generic;
using System.Linq;

var names = new List<string> { "Mira", "Adam", "Chen" };
var sorted = names.OrderBy(n => n).ToList();
Console.WriteLine("sorted names: " + string.Join(", ", sorted));

int score = Math.Clamp(150, 0, 100);
Console.WriteLine($"clamped score: {score}");

Console.WriteLine("timestamp is utc: " + (DateTime.UtcNow.Kind == DateTimeKind.Utc).ToString().ToLower());
