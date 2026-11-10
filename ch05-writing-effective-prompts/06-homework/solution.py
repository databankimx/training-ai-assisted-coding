# Homework solution (Python): the round-three word counter. Runs of letters and digits are words.


def count_words(text):
    count = 0
    in_word = False
    for char in text:
        if char.isalnum():
            if not in_word:
                count += 1
                in_word = True
        else:
            in_word = False
    return count


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
