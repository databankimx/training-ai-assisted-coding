# Lesson 10-4 solution (Python): the page-count fix with the invariant checked, so an invalid page size is reported.


def page_count(items, page_size):
    if page_size <= 0:
        raise ValueError("page size must be positive")
    return -(-items // page_size)


def check(items, page_size, expected):
    try:
        actual = str(page_count(items, page_size))
    except Exception as error:
        actual = f"error: {error}"
    status = "pass" if actual == expected else f"fail (expected {expected})"
    print(f"{items} items, size {page_size}: {actual} {status}")


check(7, 3, "3")
check(0, 3, "0")
check(5, 0, "error: page size must be positive")
