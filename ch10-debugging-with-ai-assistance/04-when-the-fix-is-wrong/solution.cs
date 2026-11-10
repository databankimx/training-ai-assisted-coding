// Lesson 10-4 solution (C#): the page-count fix with the invariant checked, so an invalid page size is reported.
using System;

static int PageCount(int items, int pageSize)
{
    if (pageSize <= 0) throw new ArgumentException("page size must be positive");
    return (items + pageSize - 1) / pageSize;
}

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
