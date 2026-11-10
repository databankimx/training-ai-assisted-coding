# Lesson 10-3 solution (Python): the fix that rounds up, checked against the same three cases.


def page_count(items, page_size):
    return -(-items // page_size)


def check(items, page_size, expected):
    actual = page_count(items, page_size)
    status = "pass" if actual == expected else f"fail (expected {expected})"
    print(f"{items} items, size {page_size}: {actual} pages {status}")


check(7, 3, 3)
check(6, 3, 2)
check(0, 3, 0)
