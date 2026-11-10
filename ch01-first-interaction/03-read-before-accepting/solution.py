# Lesson 1-3 solution (Python): read before you accept.


def is_prime(n):
    # Check whether any number from 2 up to the square root divides n.
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True


for n in [1, 2, 9, 11]:
    print(f"{n} -> {'prime' if is_prime(n) else 'not prime'}")
