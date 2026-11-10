# Lesson 9-3 starter (Python): a weak test suite, run against three deliberately broken versions of the fines function.
# Run it, read each mutant, then compare with the expected output. Don't fix anything yet.


def fine(days_overdue, mutant):
    if days_overdue < 0 and mutant != "no error":
        raise ValueError("days_overdue must not be negative")
    chargeable = days_overdue - 4 if mutant == "grace one day long" else days_overdue - 3
    chargeable = max(0, chargeable)
    cap = float("inf") if mutant == "no cap" else 2000
    return min(chargeable * 25, cap)


def throws(action):
    try:
        action()
        return False
    except Exception:
        return True


def safe_run(test, mutant):
    try:
        return test(lambda days: fine(days, mutant))
    except Exception:
        return False


# The weak suite, written from the code's own shape rather than from the rules.
suite = [
    ("returns a non-negative fine", lambda f: f(10) >= 0),
    ("caps at 2000", lambda f: f(200) == 2000),
    ("is stable across calls", lambda f: f(10) == f(10)),
    ("rejects negative days", lambda f: throws(lambda: f(-1))),
]

for mutant in ["grace one day long", "no cap", "no error"]:
    caught = any(not safe_run(test, mutant) for _, test in suite)
    print(f"mutant {mutant}: {'caught' if caught else 'missed'}")
