// Lesson 11-4 solution (C#): the third checkpoint keeps the original's boundaries, so all three pass.
using System;
using System.Linq;

static int ShippingOriginal(int grams)
{
    if (grams > 10000) return 1200;
    if (grams > 5000) return 800;
    return 500;
}

static int ShippingV1(int weightGrams)
{
    if (weightGrams > 10000) return 1200;
    if (weightGrams > 5000) return 800;
    return 500;
}

static int TierCents(int weightGrams) => weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500;
static int ShippingV2(int weightGrams) => TierCents(weightGrams);

// Checkpoint 3, corrected: the boundaries stay strictly greater than, as in the original.
static int ShippingV3(int weightGrams)
{
    int cents = weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500;
    return cents;
}

static void Checkpoint(string name, Func<int, int> version)
{
    int[] cases = { 4999, 5000, 5001, 10000, 10001 };
    var differing = cases.Where(g => version(g) != ShippingOriginal(g)).ToList();
    if (differing.Count == 0)
    {
        Console.WriteLine($"checkpoint {name}: pass");
    }
    else
    {
        int g = differing[0];
        Console.WriteLine($"checkpoint {name}: fail (at {g} g: {version(g)}, expected {ShippingOriginal(g)})");
    }
}

Checkpoint("1 rename", ShippingV1);
Checkpoint("2 extract tiers", ShippingV2);
Checkpoint("3 combine conditions", ShippingV3);
