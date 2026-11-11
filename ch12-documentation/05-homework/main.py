# Homework starter (Python): a shipping cost module, with documentation generated from its code.
# Check every documented claim, mark the unsupported ones, and correct the documentation. Don't change the code.

# Generated documentation for shipping_cents:
#   Parcels up to 5000 grams cost 500 cents.
#   Parcels of exactly 5000 grams cost 800 cents.
#   Parcels over 10000 grams cost 1200 cents.
#   Member prices are 10 percent off, rounded down to the cent.
#   Negative weights are treated as zero.
def shipping_cents(grams, member):
    if grams < 0:
        raise ValueError("grams must not be negative")
    cents = 1200 if grams > 10000 else 800 if grams > 5000 else 500
    if member:
        cents = cents - cents // 10
    return cents


def claim(text, holds):
    try:
        supported = holds()
    except Exception:
        supported = False
    print(f'claim "{text}": {"supported" if supported else "unsupported"}')


claim("parcels up to 5000 grams cost 500 cents", lambda: shipping_cents(5000, False) == 500)
claim("parcels of exactly 5000 grams cost 800 cents", lambda: shipping_cents(5000, False) == 800)
claim("parcels over 10000 grams cost 1200 cents", lambda: shipping_cents(10001, False) == 1200)
claim("member prices are 10 percent off, rounded down to the cent", lambda: shipping_cents(1000, True) == 720)
claim("negative weights are treated as zero", lambda: shipping_cents(-1, False) == 0)
