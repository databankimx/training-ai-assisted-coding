// Homework starter (C#): a parcel quote refactored by an assistant in three checkpoints.
// Find the checkpoint that changed behavior, fix it, and run again. Don't change the original.
using System;
using System.Linq;

// The original quote. Every checkpoint is compared with this.
static int QuoteOriginal(int grams, bool member)
{
    int baseCents = (grams > 10000 ? 1200 : grams > 5000 ? 800 : 500) + 25;   // includes a 25-cent handling fee
    if (member) baseCents = baseCents - baseCents / 10;                         // members get 10% off, rounded down
    return baseCents;
}

// Checkpoint 1: rename the parameters only.
static int QuoteV1(int weightGrams, bool isMember)
{
    int baseCents = (weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500) + 25;
    if (isMember) baseCents = baseCents - baseCents / 10;
    return baseCents;
}

// Checkpoint 2: move the member discount into a helper.
static int MemberPrice(int cents) => cents - cents / 10;

static int QuoteV2(int weightGrams, bool isMember)
{
    int baseCents = (weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500) + 25;
    return isMember ? MemberPrice(baseCents) : baseCents;
}

// Checkpoint 3: the assistant combined the discount into the return. This is the change to check.
static int QuoteV3(int weightGrams, bool isMember)
{
    int baseCents = (weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500) + 25;
    return isMember ? baseCents * 9 / 10 : baseCents;
}

static void Checkpoint(string name, Func<int, bool, int> version)
{
    (int Grams, bool Member)[] cases =
    {
        (4999, false), (5000, true), (5001, false), (10000, true), (10001, true),
    };
    var differing = cases.Where(c => version(c.Grams, c.Member) != QuoteOriginal(c.Grams, c.Member)).ToList();
    if (differing.Count == 0)
    {
        Console.WriteLine($"checkpoint {name}: pass");
    }
    else
    {
        var c = differing[0];
        string who = c.Member ? "member" : "regular";
        Console.WriteLine($"checkpoint {name}: fail (at {c.Grams} g {who}: {version(c.Grams, c.Member)}, expected {QuoteOriginal(c.Grams, c.Member)})");
    }
}

Checkpoint("1 rename", QuoteV1);
Checkpoint("2 extract discount", QuoteV2);
Checkpoint("3 combine discount", QuoteV3);
