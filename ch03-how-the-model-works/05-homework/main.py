# Lesson 3-4 starter (Python): generated code for the hunt.
# Run it, and read each line of output. Then hunt. Don't fix anything yet.

line = " alpha, ,beta ,, gamma "
fields = [f.strip().upper() for f in line.split(",") if f.strip()]
print("Fields:", ", ".join(fields))

try:
    count = fields.count_non_empty()
    print("Count:", count)
except AttributeError as error:
    print("Count failed:", error)

try:
    clean_header = line.removeprefix("#")
    print("Header:", clean_header.strip())
except AttributeError as error:
    print("Header failed:", error)
