# Lesson 12-4 solution (Python): the documentation example updated to the cap the code now enforces.

# Examples from the documentation:
#   Three days overdue costs nothing.
#   Four days overdue costs 25 cents.
#   200 days overdue costs 1800 cents, because the cap is 1800 cents.
def fine_cents(days_overdue):
    if days_overdue < 0:
        raise ValueError("days_overdue must not be negative")
    chargeable = max(0, days_overdue - 3)
    return min(chargeable * 25, 1800)


def claim(text, holds):
    try:
        supported = holds()
    except Exception:
        supported = False
    print(f'claim "{text}": {"supported" if supported else "unsupported"}')


claim("three days overdue costs nothing", lambda: fine_cents(3) == 0)
claim("four days overdue costs 25 cents", lambda: fine_cents(4) == 25)
claim("200 days overdue costs 1800 cents", lambda: fine_cents(200) == 1800)
