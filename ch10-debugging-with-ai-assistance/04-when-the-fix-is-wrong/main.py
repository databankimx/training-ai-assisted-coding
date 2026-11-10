# Lesson 10-4 starter (Python): the page-count fix, checked against cases that include an invalid input.
# Run it, read each case, then compare with the expected output. Don't fix anything yet.


def page_count(items, page_size):
    return -(-items // page_size)  # rounds up, correct for any valid page size


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
