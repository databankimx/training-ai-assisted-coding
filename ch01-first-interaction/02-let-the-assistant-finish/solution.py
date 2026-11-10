# Lesson 1-2 solution (Python): let the assistant finish a small function.


def add(a, b):
    return a + b


def is_even(n):
    # The number is even when dividing it by two leaves no remainder.
    return n % 2 == 0


print(f"2 + 3 = {add(2, 3)}")
print(f"4 is {'even' if is_even(4) else 'odd'}")
print(f"7 is {'even' if is_even(7) else 'odd'}")
