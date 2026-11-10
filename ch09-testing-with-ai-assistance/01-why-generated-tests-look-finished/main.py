# Lesson 9-1 starter (Python): a generated test suite, run against the fines function.
# Run it, read each result, then compare with the expected output. Don't fix anything yet.


def fine_cents(days_overdue):
    if days_overdue < 0:
        raise ValueError("days_overdue must not be negative")
    chargeable = days_overdue - 3 - 1  # the grace period is one day too long
    if chargeable <= 0:
        return 0
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


test("returns a non-negative fine", lambda: fine_cents(10) >= 0)
test("caps at 2000", lambda: fine_cents(200) == 2000)
test("is stable across calls", lambda: fine_cents(10) == fine_cents(10))
test("rejects negative days", lambda: throws(lambda: fine_cents(-1)))
