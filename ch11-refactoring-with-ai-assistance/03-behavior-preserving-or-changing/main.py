# Lesson 11-3 starter (Python): an assistant's refactor of format_price, compared with the original on the same cases.
# Run it, read each line, then compare with the expected output. Don't fix anything yet.


def format_price_original(cents, member):
    amount = cents
    if member:
        amount = amount - amount // 10  # members get 10% off, rounded down to the cent
    dollars = amount // 100
    rest = amount % 100
    return f"${dollars}.{rest:02d}"


# The assistant's refactor: shorter, and it looks equivalent.
def format_price_refactored(cents, member):
    discounted = cents * 9 // 10 if member else cents
    return f"${discounted // 100}.{discounted % 100:02d}"


def compare(cents, member, label):
    original = format_price_original(cents, member)
    refactored = format_price_refactored(cents, member)
    verdict = "same" if original == refactored else "different"
    print(f"{label}: original {original}, refactored {refactored} {verdict}")


compare(105, True, "105 member")
compare(100, False, "100 regular")
compare(1999, True, "1999 member")
