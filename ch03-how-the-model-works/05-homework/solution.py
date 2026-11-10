# Homework solution (Python): the same task with real methods.

line = " alpha, ,beta ,, gamma "
fields = [f.strip().upper() for f in line.split(",") if f.strip()]
print("Fields:", ", ".join(fields))
print("Count:", len(fields))
print("Sorted:", ", ".join(sorted(fields)))
