// Lesson 3-2 solution (C#): the same two tasks with real LINQ methods.
using System;
using System.Collections.Generic;
using System.Linq;

var names = new List<string> { "Mira", "", "Adam", "Chen" };

var firstThree = names.OrderBy(n => n).Take(3).Select(n => n == "" ? "(empty)" : n).ToList();
Console.WriteLine($"Sort and take: {string.Join(", ", firstThree)}");

var cleaned = names.Where(n => !string.IsNullOrEmpty(n)).ToList();
Console.WriteLine($"Remove empty: {string.Join(", ", cleaned)}");
