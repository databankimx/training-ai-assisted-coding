# Lesson 8-5 starter (Python): code that passes its checks and is still wrong.
# Run it, and compare each line with the expected output. Don't fix anything yet.

def fine_cents(days_overdue):
    return days_overdue * 25  # wrong: ignores the three-day grace period


def estimate_cents(weight_grams):
    return round(weight_grams * 1.3)


# Circular test: compares the function with itself, so it passes whatever the function returns.
circular_passes = fine_cents(10) == fine_cents(10)
print("circular test: " + ("passed" if circular_passes else "failed"))

# Spec test: 10 days overdue, with a three-day grace period, owes 175 cents.
fine = fine_cents(10)
print("spec test: " + ("passed" if fine == 175 else f"failed (expected 175, got {fine})"))

# Call site: the estimator takes grams, but this caller passes kilograms.
print(f"cost: {estimate_cents(2)} cents")
