# Lesson 8-1 starter (Python): the settings loader from the reading step, run against three cases.
# Run it, and compare each line with the expected output. Don't fix anything yet.

def load_settings(path):
    settings = {}
    try:
        with open(path) as handle:
            for line in handle:
                parts = line.split("=")
                settings[parts[0]] = parts[1]
    except Exception:
        return {}
    return settings


with open("malformed.txt", "w") as handle:
    handle.write("name=archive\nbroken line")
with open("equals.txt", "w") as handle:
    handle.write("url=a=b")

missing = load_settings("missing.txt")
print(f"missing: {len(missing)} settings")

malformed = load_settings("malformed.txt")
print(f"malformed: {len(malformed)} settings")

equals = load_settings("equals.txt")
print("equals: " + ", ".join(f"{key}={value}" for key, value in equals.items()))
