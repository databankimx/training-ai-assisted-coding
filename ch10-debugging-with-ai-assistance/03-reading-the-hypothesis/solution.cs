// Lesson 10-3 solution (C#): the fix that rounds up, checked against the same three cases.
using System;

static int PageCount(int items, int pageSize) => (items + pageSize - 1) / pageSize;

static void Check(int items, int pageSize, int expected)
{
    int actual = PageCount(items, pageSize);
    string status = actual == expected ? "pass" : $"fail (expected {expected})";
    Console.WriteLine($"{items} items, size {pageSize}: {actual} pages {status}");
}

Check(7, 3, 3);
Check(6, 3, 2);
Check(0, 3, 0);
