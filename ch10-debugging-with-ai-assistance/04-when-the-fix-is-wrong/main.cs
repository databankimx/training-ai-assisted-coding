// Lesson 10-4 starter (C#): the page-count fix, checked against cases that include an invalid input.
// Run it, read each case, then compare with the expected output. Don't fix anything yet.
using System;

static int PageCount(int items, int pageSize) => (items + pageSize - 1) / pageSize;

static void Check(int items, int pageSize, string expected)
{
    string actual;
    try
    {
        actual = PageCount(items, pageSize).ToString();
    }
    catch (Exception error)
    {
        actual = "error: " + error.Message;
    }
    string status = actual == expected ? "pass" : $"fail (expected {expected})";
    Console.WriteLine($"{items} items, size {pageSize}: {actual} {status}");
}

Check(7, 3, "3");
Check(0, 3, "0");
Check(5, 0, "error: page size must be positive");
