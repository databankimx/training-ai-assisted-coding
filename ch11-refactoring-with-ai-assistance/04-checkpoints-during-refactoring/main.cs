// Lesson 11-4 starter (C#): a shipping tier function refactored in three checkpoints, each compared with the original.
// Run it, read each checkpoint, then compare with the expected output. Don't fix anything yet.
using System;
using System.Linq;

// The original. Every checkpoint is compared with this.
static int ShippingOriginal(int grams)
{
    if (grams > 10000) return 1200;
    if (grams > 5000) return 800;
    return 500;
}

// Checkpoint 1: rename the parameter only.
static int ShippingV1(int weightGrams)
{
    if (weightGrams > 10000) return 1200;
    if (weightGrams > 5000) return 800;
    return 500;
}

// Checkpoint 2: move the tiers into a helper.
static int TierCents(int weightGrams) => weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500;
static int ShippingV2(int weightGrams) => TierCents(weightGrams);

// Checkpoint 3: the assistant's combined condition. It looks like a tidy rewrite.
static int ShippingV3(int weightGrams) => weightGrams >= 10000 ? 1200 : weightGrams >= 5000 ? 800 : 500;

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
