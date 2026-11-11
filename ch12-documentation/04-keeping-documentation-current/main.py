# Lesson 12-4 starter (Python): documentation examples that have drifted from the code.
# A recent commit changed the cap from 2000 to 1800 cents, and the documentation was not updated.
# Run it, read each claim, then compare with the expected output. Don't fix anything yet.

# Examples from the documentation:
#   Three days overdue costs nothing.
#   Four days overdue costs 25 cents.
#   200 days overdue costs 2000 cents.
def fine_cents(days_overdue):
    if days_overdue < 0:
        raise ValueError("days_overdue must not be negative")
    chargeable = max(0, days_overdue - 3)
    return min(chargeable * 25, 1800)  # the cap changed from 2000 to 1800 in a recent commit


def claim(text, holds):
    try:
        supported = holds()
    except Exception:
        supported = False
    print(f'claim "{text}": {"supported" if supported else "unsupported"}')


claim("three days overdue costs nothing", lambda: fine_cents(3) == 0)
claim("four days overdue costs 25 cents", lambda: fine_cents(4) == 25)
claim("200 days overdue costs 2000 cents", lambda: fine_cents(200) == 2000)
