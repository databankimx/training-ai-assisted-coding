# Homework starter (Python): a generated grace-period fines function, checked against the homework cases.
# Run it, read each line, then review the function. Don't fix anything yet.


def fine_cents(days_overdue):
    if days_overdue < 0:
        raise ValueError("days_overdue must not be negative")
    return min(days_overdue * 25, 2000)  # the three-day grace period is not applied


def check(days, expected):
    try:
        actual = str(fine_cents(days))
    except ValueError:
        actual = "error"
    expected_text = "error" if expected is None else str(expected)
    status = "pass" if actual == expected_text else f"fail (expected {expected_text})"
    print(f"days {days} -> {actual} {status}")


check(0, 0)
check(1, 0)
check(4, 25)
check(200, 2000)
check(-1, None)
