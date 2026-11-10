// Lesson 10-3 starter (C#): a fix someone proposed for the page-count bug. Check it against the cases before accepting it.
// Run it, read each case, then compare with the expected output. Don't fix anything yet.
using System;

static int PageCount(int items, int pageSize) => items / pageSize + 1;   // proposed fix

static void Check(int items, int pageSize, int expected)
{
    int actual = PageCount(items, pageSize);
    string status = actual == expected ? "pass" : $"fail (expected {expected})";
    Console.WriteLine($"{items} items, size {pageSize}: {actual} pages {status}");
}

Check(7, 3, 3);
Check(6, 3, 2);
Check(0, 3, 0);
