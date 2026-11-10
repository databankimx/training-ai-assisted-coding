# Lesson 9-3 solution (Python): a suite written from the spec catches all three mutants.


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


# The suite written from the spec. Each rule has a test, and the boundary sits on each side of the grace period.
suite = [
    ("zero within the grace period", lambda f: f(3) == 0),
    ("25 cents per day after the grace period", lambda f: f(4) == 25),
    ("caps at 2000", lambda f: f(200) == 2000),
    ("rejects negative days", lambda f: throws(lambda: f(-1))),
]

for mutant in ["grace one day long", "no cap", "no error"]:
    caught = any(not safe_run(test, mutant) for _, test in suite)
    print(f"mutant {mutant}: {'caught' if caught else 'missed'}")
