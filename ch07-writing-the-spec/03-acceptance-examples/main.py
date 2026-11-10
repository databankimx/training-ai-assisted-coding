# Lesson 7-3 starter (Python): a fines function, checked against the weak acceptance table.
# Run it, and compare each line with the expected output. Don't fix anything yet.


def fine_cents(days_overdue):
    if days_overdue < 0:
        raise ValueError("days_overdue must not be negative")
    chargeable = days_overdue - 3 - 1  # the grace period is applied one day too long
    if chargeable <= 0:
        return 0
    return min(chargeable * 25, 2000)


def check(days, expected):
    try:
        actual = str(fine_cents(days))
    except ValueError:
        actual = "error"
    expected_text = "error" if expected is None else str(expected)
    status = "pass" if actual == expected_text else f"fail (expected {expected_text})"
    print(f"days {days}: {actual} {status}")


# The weak table: only the middle of the range, the cap, and the error.
check(0, 0)
check(200, 2000)
check(-1, None)
