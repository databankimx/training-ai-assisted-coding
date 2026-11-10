# Lesson 8-2 solution (Python): the same three tasks, written with calls that exist in Python 3.12.
from datetime import datetime, timezone

names = ["Mira", "Adam", "Chen"]
print("sorted names: " + ", ".join(sorted(names)))

score = min(max(150, 0), 100)
print(f"clamped score: {score}")

stamp = datetime.now(timezone.utc)
print("timestamp is utc: " + str(stamp.tzinfo is not None).lower())
