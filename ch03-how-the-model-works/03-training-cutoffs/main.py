# Lesson 3-3 starter (Python): the newer and portable forms of two tasks.
# The newer forms run silently. If one fails on your version, it prints the reason.

raw_score = 150
print(f"Score (portable): {min(max(raw_score, 0), 100)}")

items = [1, 2, 3, 4, 5]
try:
    from itertools import batched
    list(batched(items, 2))
except ImportError as error:
    print(f"Newer batched failed: {error}")
pairs = [items[i:i + 2] for i in range(0, len(items), 2)]
print("Pairs (portable):", ", ".join("+".join(str(x) for x in pair) for pair in pairs))

values = [3, 1, 2]
try:
    sorted(values)
except TypeError as error:
    print(f"Newer sort failed: {error}")
portable = list(values)
portable.sort()
print("Sorted (portable):", ", ".join(str(v) for v in portable))
print("Original:", ", ".join(str(v) for v in values))
