# Lesson 8-2 starter (Python): checks whether each kind of call exists in this version of Python.
# Run it, and read each line. Then compare it with the expected output. Don't fix anything yet.
import datetime
import itertools

print("invented call exists: " + str(hasattr(list, "sort_by")).lower())
print("newer call exists: " + str(hasattr(itertools, "batched")).lower())
print("deprecated call exists: " + str(hasattr(datetime.datetime, "utcnow")).lower())
