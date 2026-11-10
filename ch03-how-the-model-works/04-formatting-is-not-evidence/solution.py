# Lesson 3-4 solution (Python): the documented function, corrected to start from the first value.


def largest_value(values):
    """Return the largest value in the list.

    Starts from the first value, so it works for any list with at least one value.
    """
    largest = values[0]
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
