// Lesson 3-2 starter (C#): two calls an assistant produced.
// Run the file. The compiler reports each method it can't find, with a line number. Don't fix anything yet.
using System;
using System.Collections.Generic;
using System.Linq;

var names = new List<string> { "Mira", "", "Adam", "Chen" };

var firstThree = names.SortBy(n => n).Take(3).ToList();
Console.WriteLine($"Sort and take: {string.Join(", ", firstThree)}");

var cleaned = names.RemoveEmpty();
Console.WriteLine($"Remove empty: {string.Join(", ", cleaned)}");
