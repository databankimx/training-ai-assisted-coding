// Lesson 6-3 solution (C#): the code written with the context document in the session.
using System;

Console.WriteLine($"500 g: {ShippingEstimator.EstimateCents(500, Zone.Domestic)} cents");
Console.WriteLine($"12000 g: {ShippingEstimator.EstimateCents(12000, Zone.Domestic)} cents");

public enum Zone { Domestic }

public static class ShippingEstimator
{
    // Integer cents, grams, half-up rounding, and the surcharge threshold in grams.
    public static int EstimateCents(int weightGrams, Zone zone)
    {
        if (weightGrams < 0) throw new ArgumentOutOfRangeException(nameof(weightGrams));
        int baseCents = (int)Math.Round(weightGrams * 1.3m, MidpointRounding.AwayFromZero);
        if (weightGrams > 10000) baseCents = (int)Math.Round(baseCents * 1.15m, MidpointRounding.AwayFromZero);
        return baseCents;
    }
}
