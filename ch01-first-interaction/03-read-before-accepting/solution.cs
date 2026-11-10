// Lesson 1-3 solution (C#): read before you accept.

static bool IsPrime(int n)
{
    // Check whether any number from 2 up to the square root divides n.
    if (n < 2)
    {
        return false;
    }

    for (int i = 2; i * i <= n; i++)
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
