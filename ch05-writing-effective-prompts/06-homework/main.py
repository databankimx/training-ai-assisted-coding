# Homework starter (Python): the round-one word counter, checked against the homework cases.
# Run it, read each line, then tighten the prompt. Don't fix anything yet.


def count_words(text):
    return len(text.split(" "))  # round one: splits on spaces only, keeps empty pieces


def check(text, expected):
    actual = count_words(text)
    status = "pass" if actual == expected else f"fail (expected {expected})"
    print(f'"{text}" -> {actual} {status}')


check("The cat sat.", 3)
check("  many   spaces  here ", 3)
check("Hello, world!", 2)
check("", 0)
check("   ", 0)
check("naïve", 1)
