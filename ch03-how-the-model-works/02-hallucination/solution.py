# Lesson 3-2 solution (Python): the same two tasks with real methods.

names = ["Mira", "", "Adam", "Chen"]

first_three = sorted(names)[:3]
print("Sort and take:", ", ".join(name or "(empty)" for name in first_three))

cleaned = [name for name in names if name]
print("Remove empty:", ", ".join(cleaned))
