// Homework starter (C#): a shipping cost module, with documentation generated from its code.
// Check every documented claim, mark the unsupported ones, and correct the documentation. Don't change the code.
using System;

// Generated documentation for ShippingCents:
//   Parcels up to 5000 grams cost 500 cents.
//   Parcels of exactly 5000 grams cost 800 cents.
//   Parcels over 10000 grams cost 1200 cents.
//   Member prices are 10 percent off, rounded down to the cent.
//   Negative weights are treated as zero.
static int ShippingCents(int grams, bool member)
{
    if (grams < 0) throw new ArgumentOutOfRangeException(nameof(grams));
    int cents = grams > 10000 ? 1200 : grams > 5000 ? 800 : 500;
    if (member) cents = cents - cents / 10;
    return cents;
}

static void Claim(string text, Func<bool> holds)
{
    bool supported;
    try
    {
        supported = holds();
    }
    catch (Exception)
    {
        supported = false;
    }
    Console.WriteLine($"claim \"{text}\": {(supported ? "supported" : "unsupported")}");
}

Claim("parcels up to 5000 grams cost 500 cents", () => ShippingCents(5000, false) == 500);
Claim("parcels of exactly 5000 grams cost 800 cents", () => ShippingCents(5000, false) == 800);
Claim("parcels over 10000 grams cost 1200 cents", () => ShippingCents(10001, false) == 1200);
Claim("member prices are 10 percent off, rounded down to the cent", () => ShippingCents(1000, true) == 720);
Claim("negative weights are treated as zero", () => ShippingCents(-1, false) == 0);
