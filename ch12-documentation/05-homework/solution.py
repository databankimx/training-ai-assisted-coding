# Homework solution (Python): the same code, with the two unsupported claims corrected to what the code does.

# Documentation for shipping_cents, checked against the code:
#   Parcels up to 5000 grams cost 500 cents.
#   Parcels of exactly 5000 grams cost 500 cents, because the 800-cent tier starts above 5000 grams.
#   Parcels over 10000 grams cost 1200 cents.
#   Member prices are 10 percent off, rounded down to the cent.
#   Negative weights raise a ValueError.
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


def raises_value_error(action):
    try:
        action()
        return False
    except ValueError:
        return True


claim("parcels up to 5000 grams cost 500 cents", lambda: shipping_cents(5000, False) == 500)
claim("parcels of exactly 5000 grams cost 500 cents", lambda: shipping_cents(5000, False) == 500)
claim("parcels over 10000 grams cost 1200 cents", lambda: shipping_cents(10001, False) == 1200)
claim("member prices are 10 percent off, rounded down to the cent", lambda: shipping_cents(1000, True) == 720)
claim("negative weights throw an error", lambda: raises_value_error(lambda: shipping_cents(-1, False)))
