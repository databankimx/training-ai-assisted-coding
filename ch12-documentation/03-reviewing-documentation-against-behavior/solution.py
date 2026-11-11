# Lesson 12-3 solution (Python): the function fixed to the spec, and the documentation corrected to match it.

# Returns the fine in cents for an item returned after the due date.
# Raises ValueError for negative days.
# The first three days after the due date are free.
# After that, the fine is 25 cents per day, capped at 2000 cents.
def fine_cents(days_overdue):
    if days_overdue < 0:
        raise ValueError("days_overdue must not be negative")
    chargeable = max(0, days_overdue - 3)
    return min(chargeable * 25, 2000)


def claim(text, holds):
    try:
        supported = holds()
    except Exception:
        supported = False
    print(f'claim "{text}": {"supported" if supported else "unsupported"}')


def raises(action):
    try:
        action()
        return False
    except ValueError:
        return True


claim("throws for negative days", lambda: raises(lambda: fine_cents(-1)))
claim("caps the fine at 2000 cents", lambda: fine_cents(200) == 2000)
claim("charges 25 cents per day after the first three free days", lambda: fine_cents(4) == 25)
claim("returns zero during the first three free days", lambda: fine_cents(3) == 0)
