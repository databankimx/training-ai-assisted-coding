// Lesson 5-2 solution (JavaScript): the strong version, written from the six-part prompt.

function largest(values) {
  if (values.length === 0) {
    throw new Error("The list is empty.");
  }
  let max = values[0];
  for (const value of values) {
    if (value > max) max = value;
  }
  return max;
}

const negatives = [-4, -9, -2];
console.log("Negatives:", largest(negatives));

try {
  largest([]);
  console.log("Empty: no error");
} catch (error) {
  console.log("Empty: rejected");
}
