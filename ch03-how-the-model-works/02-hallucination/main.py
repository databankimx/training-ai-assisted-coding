# Lesson 3-2 starter (Python): two calls an assistant produced.
# Run the file, and read each error. Don't fix anything yet.

names = ["Mira", "", "Adam", "Chen"]

try:
    first_three = names.sorted_by(str).sort()[:3]
    print("Sort and take:", ", ".join(name or "(empty)" for name in first_three))
except AttributeError as error:
    print("Sort and take failed:", error)

try:
    cleaned = names.remove_empty()
    print("Remove empty:", ", ".join(cleaned))
except AttributeError as error:
    print("Remove empty failed:", error)
