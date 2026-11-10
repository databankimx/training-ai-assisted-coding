// Lesson 1-2 solution (C#): let the assistant finish a small function.

static int Add(int a, int b)
{
    return a + b;
}

static bool IsEven(int n)
{
    // The number is even when dividing it by two leaves no remainder.
    return n % 2 == 0;
}

Console.WriteLine($"2 + 3 = {Add(2, 3)}");
Console.WriteLine($"4 is {(IsEven(4) ? "even" : "odd")}");
Console.WriteLine($"7 is {(IsEven(7) ? "even" : "odd")}");
