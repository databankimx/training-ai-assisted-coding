// Lesson 1-3 starter (C#): read before you accept.
// The placeholder in IsPrime accepts every number. Compare the output with your notes, then replace it.

static bool IsPrime(int n)
{
    // TODO: replace this placeholder with a real check.
    return true;
}

foreach (int n in new[] { 1, 2, 9, 11 })
{
    Console.WriteLine($"{n} -> {(IsPrime(n) ? "prime" : "not prime")}");
}
