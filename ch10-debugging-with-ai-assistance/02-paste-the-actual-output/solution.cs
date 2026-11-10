// Lesson 10-2 solution (C#): the page count rounds up, so the partial last page is shown.
using System;
using System.Linq;

var items = new[] { 1, 2, 3, 4, 5, 6, 7 };
int pageSize = 3;
int pageCount = (items.Length + pageSize - 1) / pageSize;   // rounds up
int shown = 0;
for (int page = 0; page < pageCount; page++)
{
    var slice = items.Skip(page * pageSize).Take(pageSize).ToArray();
    shown += slice.Length;
    Console.WriteLine($"page {page}: {string.Join(" ", slice)}");
}
Console.WriteLine($"total shown: {shown} of {items.Length}");
