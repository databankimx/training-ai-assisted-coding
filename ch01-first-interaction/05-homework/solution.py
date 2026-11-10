# Homework solution (Python): three small functions, checked with examples.


def max3(a, b, c):
    return max(a, b, c)


def is_palindrome(text):
    cleaned = text.lower()
    return cleaned == cleaned[::-1]


def count_vowels(text):
    return sum(1 for letter in text.lower() if letter in "aeiou")


print(f"Max3(3, 9, 4) = {max3(3, 9, 4)}")
print(f"Max3(-1, -5, -2) = {max3(-1, -5, -2)}")
print(f"IsPalindrome(level): {'yes' if is_palindrome('level') else 'no'}")
print(f"IsPalindrome(Hello): {'yes' if is_palindrome('Hello') else 'no'}")
print(f"IsPalindrome(empty): {'yes' if is_palindrome('') else 'no'}")
print(f"CountVowels(AI coding) = {count_vowels('AI coding')}")
print(f"CountVowels(rhythm) = {count_vowels('rhythm')}")
