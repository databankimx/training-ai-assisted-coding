// Lesson 3-4 solution (JavaScript): the documented function, corrected to start from the first value.

/**
 * Returns the largest value in the array.
 * Starts from the first value, so it works for any array with at least one value.
 */
function largestValue(values) {
  let largest = values[0];
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
