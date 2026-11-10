# Lesson 6-3 starter (Python): the code the assistant produced without the context document.
# Run it, and compare each line with the expected output. Don't fix anything yet.

ZONE_DOMESTIC = "Domestic"


# Kilograms and floating-point dollars: the two mistakes the document prevents.
def estimate_dollars(weight_kg, zone):
    cost = weight_kg * 2.5
    if weight_kg > 10:
        cost *= 1.15
    return round(cost, 2)


print(f"0.5 kg: {estimate_dollars(0.5, ZONE_DOMESTIC)} dollars")
print(f"12 kg: {estimate_dollars(12, ZONE_DOMESTIC)} dollars")
