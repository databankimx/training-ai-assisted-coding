# Homework starter (Python): a rating average with a seeded bug. Run it, debug it, and record each hypothesis.
# Don't change the code until you have a hypothesis you can test.


def average(ratings):
    total = 0
    for i in range(len(ratings) - 1):
        total += ratings[i]  # seeded bug: the last rating is never added
    return total / (len(ratings) - 1)


def check(ratings, expected):
    actual = average(ratings)
    status = "pass" if actual == expected else f"fail (expected {expected:g})"
    print(f"ratings {','.join(str(r) for r in ratings)}: {actual:g} {status}")


check([4, 5, 3, 2], 3.5)
check([5, 5], 5)
check([2, 4, 6], 4)
