# Lesson 8-1 solution (Python): the loader with the three claims fixed.
import os


def load_settings(path):
    if not os.path.exists(path):
        raise FileNotFoundError("file not found")
    settings = {}
    with open(path) as handle:
        for number, line in enumerate(handle, start=1):
            line = line.rstrip("\n")
            key, separator, value = line.partition("=")
            if not separator:
                raise ValueError(f"line {number} has no equals sign")
            settings[key] = value
    return settings


with open("malformed.txt", "w") as handle:
    handle.write("name=archive\nbroken line")
with open("equals.txt", "w") as handle:
    handle.write("url=a=b")

try:
    load_settings("missing.txt")
    print("missing: no error")
except FileNotFoundError as error:
    print(f"missing: error ({error})")

try:
    load_settings("malformed.txt")
    print("malformed: no error")
except ValueError as error:
    print(f"malformed: error ({error})")

equals = load_settings("equals.txt")
print("equals: " + ", ".join(f"{key}={value}" for key, value in equals.items()))
