# Lesson 3-3 solution (Python): the portable forms, which work on Python 3.9 and later.

raw_score = 150
print(f"Score (portable): {min(max(raw_score, 0), 100)}")

items = [1, 2, 3, 4, 5]
pairs = [items[i:i + 2] for i in range(0, len(items), 2)]
print("Pairs (portable):", ", ".join("+".join(str(x) for x in pair) for pair in pairs))

values = [3, 1, 2]
portable = list(values)
portable.sort()
print("Sorted (portable):", ", ".join(str(v) for v in portable))
print("Original:", ", ".join(str(v) for v in values))
