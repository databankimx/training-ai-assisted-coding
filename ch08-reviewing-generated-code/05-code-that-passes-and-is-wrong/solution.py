# Lesson 8-5 solution (Python): the fine and the call site, both fixed.

def fine_cents(days_overdue):
    chargeable = max(0, days_overdue - 3)
    return chargeable * 25


def estimate_cents(weight_grams):
    return round(weight_grams * 1.3)


circular_passes = fine_cents(10) == fine_cents(10)
print("circular test: " + ("passed" if circular_passes else "failed"))

fine = fine_cents(10)
print("spec test: " + ("passed" if fine == 175 else f"failed (expected 175, got {fine})"))

print(f"cost: {estimate_cents(2000)} cents")
