// Lesson 8-5 starter (C#): code that passes its checks and is still wrong.
// Run it, and compare each line with the expected output. Don't fix anything yet.
using System;

static int FineCents(int daysOverdue) => daysOverdue * 25;   // wrong: ignores the three-day grace period

static int EstimateCents(int weightGrams) => (int)Math.Round(weightGrams * 1.3m, MidpointRounding.AwayFromZero);

// Circular test: compares the function with itself, so it passes whatever the function returns.
bool circularPasses = FineCents(10) == FineCents(10);
Console.WriteLine("circular test: " + (circularPasses ? "passed" : "failed"));

// Spec test: 10 days overdue, with a three-day grace period, owes 175 cents.
int fine = FineCents(10);
Console.WriteLine("spec test: " + (fine == 175 ? "passed" : $"failed (expected 175, got {fine})"));

// Call site: the estimator takes grams, but this caller passes kilograms.
Console.WriteLine($"cost: {EstimateCents(2)} cents");
