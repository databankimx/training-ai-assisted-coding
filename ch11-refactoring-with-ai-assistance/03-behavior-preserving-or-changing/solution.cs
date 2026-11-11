// Lesson 11-3 solution (C#): a refactor that keeps the original's arithmetic, and the same cases agree.
using System;

static string FormatPriceOriginal(int cents, bool member)
{
    int amount = cents;
    if (member) amount = amount - amount / 10;
    int dollars = amount / 100;
    int rest = amount % 100;
    return "$" + dollars + "." + (rest < 10 ? "0" : "") + rest;
}

// Behavior-preserving refactor: the same subtraction, written once, and the same two-digit cents.
static string FormatPriceRefactored(int cents, bool member)
{
    int discounted = member ? cents - cents / 10 : cents;
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
