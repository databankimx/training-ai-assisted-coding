// Lesson 8-5 solution (C#): the fine and the call site, both fixed.
using System;

static int FineCents(int daysOverdue)
{
    int chargeable = Math.Max(0, daysOverdue - 3);
    return chargeable * 25;
}

static int EstimateCents(int weightGrams) => (int)Math.Round(weightGrams * 1.3m, MidpointRounding.AwayFromZero);

bool circularPasses = FineCents(10) == FineCents(10);
Console.WriteLine("circular test: " + (circularPasses ? "passed" : "failed"));

int fine = FineCents(10);
Console.WriteLine("spec test: " + (fine == 175 ? "passed" : $"failed (expected 175, got {fine})"));

Console.WriteLine($"cost: {EstimateCents(2000)} cents");
