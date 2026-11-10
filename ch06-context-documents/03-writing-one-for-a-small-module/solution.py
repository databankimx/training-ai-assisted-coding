# Lesson 6-3 solution (Python): the code written with the context document in the session.

from decimal import Decimal, ROUND_HALF_UP

ZONE_DOMESTIC = "Domestic"


# Integer cents, grams, half-up rounding, and the surcharge threshold in grams.
def estimate_cents(weight_grams, zone):
    if weight_grams < 0:
        raise ValueError("weight_grams must not be negative")
    base = Decimal(weight_grams) * Decimal("1.3")
    if weight_grams > 10_000:
        base *= Decimal("1.15")
    return int(base.quantize(Decimal("1"), rounding=ROUND_HALF_UP))


print(f"500 g: {estimate_cents(500, ZONE_DOMESTIC)} cents")
print(f"12000 g: {estimate_cents(12000, ZONE_DOMESTIC)} cents")
