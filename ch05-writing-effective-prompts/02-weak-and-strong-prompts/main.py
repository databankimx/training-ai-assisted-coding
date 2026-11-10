# Lesson 5-2 starter (Python): the weak version of the largest-value function, from a one-line prompt.
# Run it, and compare each line with the expected output. Don't fix anything yet.

def largest(values):
    return max(values)


negatives = [-4, -9, -2]
print("Negatives:", largest(negatives))

try:
    print("Empty:", largest([]))
except ValueError as error:
    print("Empty: error:", error)
