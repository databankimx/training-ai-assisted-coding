# Homework solution (Python): every rating is added, and the count is the number of ratings.


def average(ratings):
    total = 0
    for rating in ratings:
        total += rating
    return total / len(ratings)


def check(ratings, expected):
    actual = average(ratings)
    status = "pass" if actual == expected else f"fail (expected {expected:g})"
    print(f"ratings {','.join(str(r) for r in ratings)}: {actual:g} {status}")


check([4, 5, 3, 2], 3.5)
check([5, 5], 5)
check([2, 4, 6], 4)
