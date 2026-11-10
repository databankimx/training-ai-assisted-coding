// Homework solution (C#): three small functions, checked with examples.

using System;

static int Max3(int a, int b, int c)
{
    return Math.Max(a, Math.Max(b, c));
}

static bool IsPalindrome(string text)
{
    string cleaned = text.ToLowerInvariant();
    int left = 0;
    int right = cleaned.Length - 1;
    while (left < right)
    {
        if (cleaned[left] != cleaned[right])
        {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

static int CountVowels(string text)
{
    int count = 0;
    foreach (char letter in text.ToLowerInvariant())
    {
        if ("aeiou".Contains(letter))
        {
            count++;
        }
    }
    return count;
}

Console.WriteLine($"Max3(3, 9, 4) = {Max3(3, 9, 4)}");
Console.WriteLine($"Max3(-1, -5, -2) = {Max3(-1, -5, -2)}");
Console.WriteLine($"IsPalindrome(level): {(IsPalindrome("level") ? "yes" : "no")}");
Console.WriteLine($"IsPalindrome(Hello): {(IsPalindrome("Hello") ? "yes" : "no")}");
Console.WriteLine($"IsPalindrome(empty): {(IsPalindrome("") ? "yes" : "no")}");
Console.WriteLine($"CountVowels(AI coding) = {CountVowels("AI coding")}");
Console.WriteLine($"CountVowels(rhythm) = {CountVowels("rhythm")}");
