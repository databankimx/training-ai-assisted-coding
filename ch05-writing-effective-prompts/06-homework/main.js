// Homework starter (JavaScript): the round-one word counter, checked against the homework cases.
// Run it, read each line, then tighten the prompt. Don't fix anything yet.

function countWords(text) {
  return text.split(" ").length; // round one: splits on spaces only, keeps empty pieces
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
