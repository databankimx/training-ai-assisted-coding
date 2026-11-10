// Lesson 3-4 starter (JavaScript): a documented function that is wrong, and a plain one that is right.
// Run it, and compare the output with the expected result. Don't fix anything yet.

/**
 * Returns the largest value in the array.
 * Starts from zero, so every value is compared against a known minimum.
 */
function largestValue(values) {
  let largest = 0;
  for (const value of values) {
    if (value > largest) {
      largest = value;
    }
  }
  return largest;
}

// Plain and correct: start from the first value, not from zero.
function largestValuePlain(values) {
  let largest = values[0];
  for (const value of values) {
    if (value > largest) largest = value;
  }
  return largest;
}

const negatives = [-4, -9, -2];
console.log(`Documented: ${largestValue(negatives)}`);
console.log(`Plain: ${largestValuePlain(negatives)}`);
