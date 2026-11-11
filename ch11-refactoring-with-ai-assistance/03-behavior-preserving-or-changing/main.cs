// Lesson 11-3 starter (C#): an assistant's refactor of FormatPrice, compared with the original on the same cases.
// Run it, read each line, then compare with the expected output. Don't fix anything yet.
using System;

static string FormatPriceOriginal(int cents, bool member)
{
    int amount = cents;
    if (member) amount = amount - amount / 10;   // members get 10% off, rounded down to the cent
    int dollars = amount / 100;
    int rest = amount % 100;
    return "$" + dollars + "." + (rest < 10 ? "0" : "") + rest;
}

// The assistant's refactor: shorter, and it looks equivalent.
static string FormatPriceRefactored(int cents, bool member)
{
    int discounted = member ? cents * 9 / 10 : cents;
    return $"${discounted / 100}.{discounted % 100:D2}";
}

static void Compare(int cents, bool member, string label)
{
    string original = FormatPriceOriginal(cents, member);
    string refactored = FormatPriceRefactored(cents, member);
    string verdict = original == refactored ? "same" : "different";
    Console.WriteLine($"{label}: original {original}, refactored {refactored} {verdict}");
}

Compare(105, true, "105 member");
Compare(100, false, "100 regular");
Compare(1999, true, "1999 member");
