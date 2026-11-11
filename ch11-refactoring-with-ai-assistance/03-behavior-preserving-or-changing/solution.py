# Lesson 11-3 solution (Python): a refactor that keeps the original's arithmetic, and the same cases agree.


def format_price_original(cents, member):
    amount = cents
    if member:
        amount = amount - amount // 10
    dollars = amount // 100
    rest = amount % 100
    return f"${dollars}.{rest:02d}"


# Behavior-preserving refactor: the same subtraction, written once, and the same two-digit cents.
def format_price_refactored(cents, member):
    discounted = cents - cents // 10 if member else cents
    return f"${discounted // 100}.{discounted % 100:02d}"


def compare(cents, member, label):
    original = format_price_original(cents, member)
    refactored = format_price_refactored(cents, member)
    verdict = "same" if original == refactored else "different"
    print(f"{label}: original {original}, refactored {refactored} {verdict}")


compare(105, True, "105 member")
compare(100, False, "100 regular")
compare(1999, True, "1999 member")
