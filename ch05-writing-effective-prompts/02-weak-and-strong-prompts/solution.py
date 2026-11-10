# Lesson 5-2 solution (Python): the strong version, written from the six-part prompt.


def largest(values):
    if not values:
        raise ValueError("The list is empty.")
    largest_so_far = values[0]
    for value in values:
        if value > largest_so_far:
            largest_so_far = value
    return largest_so_far


negatives = [-4, -9, -2]
print("Negatives:", largest(negatives))

try:
    largest([])
    print("Empty: no error")
except ValueError:
    print("Empty: rejected")
