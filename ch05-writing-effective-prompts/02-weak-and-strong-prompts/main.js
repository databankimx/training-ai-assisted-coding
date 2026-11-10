// Lesson 5-2 starter (JavaScript): the weak version of the largest-value function, from a one-line prompt.
// Run it, and compare each line with the expected output. Don't fix anything yet.

function largest(values) {
  return Math.max(...values);
}

const negatives = [-4, -9, -2];
console.log("Negatives:", largest(negatives));
console.log("Empty:", largest([]));
