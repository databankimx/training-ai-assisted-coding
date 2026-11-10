# Lesson 9-1 solution (Python): the fines function fixed, and tests written from the spec.


def fine_cents(days_overdue):
    if days_overdue < 0:
        raise ValueError("days_overdue must not be negative")
    chargeable = max(0, days_overdue - 3)
    return min(chargeable * 25, 2000)


def throws(action):
    try:
        action()
        return False
    except Exception:
        return True


def test(name, check):
    try:
        passed = check()
    except Exception:
        passed = False
    print(f"test {name}: {'pass' if passed else 'fail'}")


test("zero within the grace period", lambda: fine_cents(3) == 0)
test("25 cents per day after the grace period", lambda: fine_cents(4) == 25)
test("caps at 2000", lambda: fine_cents(200) == 2000)
test("rejects negative days", lambda: throws(lambda: fine_cents(-1)))
