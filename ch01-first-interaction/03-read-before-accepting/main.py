# Lesson 1-3 starter (Python): read before you accept.
# The placeholder in is_prime accepts every number. Compare the output with your notes, then replace it.


def is_prime(n):
    # TODO: replace this placeholder with a real check.
    return True


for n in [1, 2, 9, 11]:
    print(f"{n} -> {'prime' if is_prime(n) else 'not prime'}")
