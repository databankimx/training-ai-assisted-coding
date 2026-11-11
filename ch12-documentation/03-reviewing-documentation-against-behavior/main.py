# Lesson 12-3 starter (Python): a generated documentation comment, checked claim by claim against the function.
# Run it, read each claim, then compare with the expected output. Don't fix anything yet.

# Generated documentation:
#   Returns zero for negative days.
#   Charges 25 cents per day after the first three free days.
#   Caps the fine at 2000 cents.
#   Returns zero during the first three free days.
def fine_cents(days_overdue):
    if days_overdue < 0:
        raise ValueError("days_overdue must not be negative")
    chargeable = days_overdue - 3 - 1  # the grace period is one day too long
    if chargeable <= 0:
        return 0
    return min(chargeable * 25, 2000)


def claim(text, holds):
    try:
        supported = holds()
    except Exception:
        supported = False
    print(f'claim "{text}": {"supported" if supported else "unsupported"}')


claim("returns zero for negative days", lambda: fine_cents(-1) == 0)
claim("caps the fine at 2000 cents", lambda: fine_cents(200) == 2000)
claim("charges 25 cents per day after the first three free days", lambda: fine_cents(4) == 25)
claim("returns zero during the first three free days", lambda: fine_cents(3) == 0)
