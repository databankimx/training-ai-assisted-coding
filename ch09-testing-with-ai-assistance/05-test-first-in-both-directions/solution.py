# Lesson 9-5 solution (Python): the implementation written to pass the spec, and the suite restored to the spec's value.

spec = [(3, 0), (4, 25), (200, 2000)]

# The suite, restored so that its expectation for day four matches the spec.
suite = [(3, 0), (4, 25), (200, 2000)]


def fine_cents(days_overdue):
    chargeable = max(0, days_overdue - 3)
    return min(chargeable * 25, 2000)


for days, cents in suite:
    actual = fine_cents(days)
    print(f"test day {days}: {'pass' if actual == cents else 'fail'}")

disagreement = ""
for days, cents in suite:
    spec_cents = next(c for d, c in spec if d == days)
    if spec_cents != cents:
        disagreement = f"day {days} expects {cents}, spec says {spec_cents}"
        break
print("suite agrees with spec: yes" if not disagreement else f"suite agrees with spec: no ({disagreement})")
