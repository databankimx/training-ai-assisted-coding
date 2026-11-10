// Lesson 10-2 starter (C#): a paging helper that drops the last partial page.
// Run it, copy the output exactly, then compare it with the expected output. Don't fix anything yet.
using System;
using System.Linq;

var items = new[] { 1, 2, 3, 4, 5, 6, 7 };
int pageSize = 3;
int pageCount = items.Length / pageSize;   // bug: integer division drops the partial last page
int shown = 0;
for (int page = 0; page < pageCount; page++)
{
    var slice = items.Skip(page * pageSize).Take(pageSize).ToArray();
    shown += slice.Length;
    Console.WriteLine($"page {page}: {string.Join(" ", slice)}");
}
Console.WriteLine($"total shown: {shown} of {items.Length}");
