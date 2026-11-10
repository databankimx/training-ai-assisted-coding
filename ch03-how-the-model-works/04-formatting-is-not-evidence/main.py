# Lesson 3-4 starter (Python): a documented function that is wrong, and a plain one that is right.
# Run it, and compare the output with the expected result. Don't fix anything yet.


def largest_value(values):
    """Return the largest value in the list.

    Starts from zero, so every value is compared against a known minimum.
    """
    largest = 0
    for value in values:
        if value > largest:
            largest = value
    return largest


# Plain and correct: start from the first value, not from zero.
def largest_value_plain(values):
    largest = values[0]
    for value in values:
        if value > largest:
            largest = value
    return largest


negatives = [-4, -9, -2]
print(f"Documented: {largest_value(negatives)}")
print(f"Plain: {largest_value_plain(negatives)}")
