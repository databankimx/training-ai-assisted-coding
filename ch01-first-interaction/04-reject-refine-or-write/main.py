# Lesson 1-4 starter (Python): reject, refine, or write it yourself.
# The is_prime below came from an earlier suggestion. It's wrong for 1. Find the fault, and fix it.


def is_prime(n):
    for i in range(2, n):
        if n % i == 0:
            return False
    return True


for n in [1, 2, 9, 11]:
    print(f"{n} -> {'prime' if is_prime(n) else 'not prime'}")
