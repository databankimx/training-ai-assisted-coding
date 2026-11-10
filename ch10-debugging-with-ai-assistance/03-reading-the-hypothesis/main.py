# Lesson 10-3 starter (Python): a fix someone proposed for the page-count bug. Check it against the cases before accepting it.
# Run it, read each case, then compare with the expected output. Don't fix anything yet.


def page_count(items, page_size):
    return items // page_size + 1  # proposed fix


def check(items, page_size, expected):
    actual = page_count(items, page_size)
    status = "pass" if actual == expected else f"fail (expected {expected})"
    print(f"{items} items, size {page_size}: {actual} pages {status}")


check(7, 3, 3)
check(6, 3, 2)
check(0, 3, 0)
