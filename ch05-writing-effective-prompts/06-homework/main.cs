// Homework starter (C#): the round-one word counter, checked against the homework cases.
// Run it, read each line, then tighten the prompt. Don't fix anything yet.
using System;

static int CountWords(string text) => text.Split(' ').Length;   // round one: splits on spaces only, keeps empty pieces

static void Check(string text, int expected)
{
    int actual = CountWords(text);
    string status = actual == expected ? "pass" : $"fail (expected {expected})";
    Console.WriteLine($"\"{text}\" -> {actual} {status}");
}

Check("The cat sat.", 3);
Check("  many   spaces  here ", 3);
Check("Hello, world!", 2);
Check("", 0);
Check("   ", 0);
Check("naïve", 1);
