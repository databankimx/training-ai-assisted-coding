// Homework solution (C#): the third checkpoint uses the original's rounding through the helper, so all three pass.
using System;
using System.Linq;

static int QuoteOriginal(int grams, bool member)
{
    int baseCents = (grams > 10000 ? 1200 : grams > 5000 ? 800 : 500) + 25;
    if (member) baseCents = baseCents - baseCents / 10;
    return baseCents;
}

static int QuoteV1(int weightGrams, bool isMember)
{
    int baseCents = (weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500) + 25;
    if (isMember) baseCents = baseCents - baseCents / 10;
    return baseCents;
}

static int MemberPrice(int cents) => cents - cents / 10;

static int QuoteV2(int weightGrams, bool isMember)
{
    int baseCents = (weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500) + 25;
    return isMember ? MemberPrice(baseCents) : baseCents;
}

// Checkpoint 3, fixed: the discount goes through the helper, which keeps the original's rounding.
static int QuoteV3(int weightGrams, bool isMember)
{
    int baseCents = (weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500) + 25;
    return isMember ? MemberPrice(baseCents) : baseCents;
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
