// Homework solution (JavaScript): the round-three word counter. Runs of letters and digits are words.
// The letter check compares upper and lower case, so it works for accented letters without a regular expression.

function isWordCharacter(c) {
  const isLetter = c.toLowerCase() !== c.toUpperCase();
  const isDigit = c >= "0" && c <= "9";
  return isLetter || isDigit;
}

function countWords(text) {
  let count = 0;
  let inWord = false;
  for (const c of text) {
    if (isWordCharacter(c)) {
      if (!inWord) {
        count++;
        inWord = true;
      }
    } else {
      inWord = false;
    }
  }
  return count;
}

function check(text, expected) {
  const actual = countWords(text);
  const status = actual === expected ? "pass" : `fail (expected ${expected})`;
  console.log(`"${text}" -> ${actual} ${status}`);
}

check("The cat sat.", 3);
check("  many   spaces  here ", 3);
check("Hello, world!", 2);
check("", 0);
check("   ", 0);
check("naïve", 1);
