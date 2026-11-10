// Lesson 1-4 starter (C#): reject, refine, or write it yourself.
// The IsPrime below came from an earlier suggestion. It's wrong for 1. Find the fault, and fix it.

static bool IsPrime(int n)
{
    for (int i = 2; i < n; i++)
    {
        if (n % i == 0)
        {
            return false;
        }
    }
    return true;
}

foreach (int n in new[] { 1, 2, 9, 11 })
{
    Console.WriteLine($"{n} -> {(IsPrime(n) ? "prime" : "not prime")}");
}
