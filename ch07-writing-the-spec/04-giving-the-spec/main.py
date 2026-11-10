# Lesson 7-4 starter (Python): the generated fines function, checked against the full acceptance table.
# Run it, read the check record, then compare it with the expected output. Don't fix anything yet.


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


check(0, 0)
check(3, 0)
check(4, 25)
check(83, 2000)
check(200, 2000)
check(-1, None)
