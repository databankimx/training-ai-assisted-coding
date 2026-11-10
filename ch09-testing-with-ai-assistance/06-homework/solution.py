# Homework solution (Python): the suite completed with tests on either side of the grace period.


def fine(days_overdue, mutant):
    if days_overdue < 0 and mutant != "no error":
        raise ValueError("days_overdue must not be negative")
    grace = 4 if mutant == "grace one day long" else 2 if mutant == "grace two days short" else 3
    chargeable = max(0, days_overdue - grace)
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


# The completed suite. The two added tests sit on each side of the grace period.
suite = [
    ("returns a non-negative fine", lambda f: f(10) >= 0),
    ("caps at 2000", lambda f: f(200) == 2000),
    ("zero for a book returned on time", lambda f: f(0) == 0),
    ("rejects negative days", lambda f: throws(lambda: f(-1))),
    ("zero within the grace period, on the last free day", lambda f: f(3) == 0),
    ("25 cents on the first chargeable day", lambda f: f(4) == 25),
]

for mutant in ["grace one day long", "grace two days short", "no cap", "no error"]:
    caught = any(not safe_run(test, mutant) for _, test in suite)
    print(f"mutant {mutant}: {'caught' if caught else 'missed'}")
