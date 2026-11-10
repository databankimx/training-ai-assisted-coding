// Lesson 1-4 solution (C#): reject, refine, or write it yourself.

static bool IsPrime(int n)
{
    if (n < 2)
    {
        return false;
    }

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
