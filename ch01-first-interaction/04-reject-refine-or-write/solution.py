# Lesson 1-4 solution (Python): reject, refine, or write it yourself.


def is_prime(n):
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True


for n in [1, 2, 9, 11]:
    print(f"{n} -> {'prime' if is_prime(n) else 'not prime'}")
