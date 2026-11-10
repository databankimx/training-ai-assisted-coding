// Homework solution (C#): the round-three word counter. Runs of letters and digits are words.
using System;

static int CountWords(string text)
{
    if (text == null) throw new ArgumentNullException(nameof(text));
    int count = 0;
    bool inWord = false;
    foreach (char c in text)
    {
        if (char.IsLetterOrDigit(c))
        {
            if (!inWord)
            {
                count++;
                inWord = true;
            }
        }
        else
        {
            inWord = false;
        }
    }
    return count;
}

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
