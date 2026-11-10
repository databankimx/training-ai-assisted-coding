# Lesson 7-4 solution (Python): the follow-up applied. The grace-period arithmetic is corrected, and every row passes.


def fine_cents(days_overdue):
    if days_overdue < 0:
        raise ValueError("days_overdue must not be negative")
    chargeable = max(0, days_overdue - 3)
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
