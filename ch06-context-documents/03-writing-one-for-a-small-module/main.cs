// Lesson 6-3 starter (C#): the code the assistant produced without the context document.
// Run it, and compare each line with the expected output. Don't fix anything yet.
using System;

Console.WriteLine($"0.5 kg: {ShippingEstimatorWithoutContext.EstimateDollars(0.5, Zone.Domestic)} dollars");
Console.WriteLine($"12 kg: {ShippingEstimatorWithoutContext.EstimateDollars(12, Zone.Domestic)} dollars");

public enum Zone { Domestic }

public static class ShippingEstimatorWithoutContext
{
    // Kilograms and floating-point dollars: the two mistakes the document prevents.
    public static double EstimateDollars(double weightKg, Zone zone)
    {
        double cost = weightKg * 2.5;
        if (weightKg > 10) cost *= 1.15;
        return Math.Round(cost, 2);
    }
}
