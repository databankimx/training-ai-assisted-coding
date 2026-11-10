# Lesson 9-5 starter (Python): test-first. The suite comes first, the implementation is a placeholder, and the suite is checked against the spec.
# Run it, read each test, then compare with the expected output. Don't fix anything yet.

# The spec, as data: days overdue, and the expected fine in cents.
spec = [(3, 0), (4, 25), (200, 2000)]

# The suite. Its expectation for day four was changed to match an earlier defect.
suite = [(3, 0), (4, 100), (200, 2000)]


# The implementation has not been written yet. The placeholder is the red state.
def fine_cents(days_overdue):
    return -1


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
