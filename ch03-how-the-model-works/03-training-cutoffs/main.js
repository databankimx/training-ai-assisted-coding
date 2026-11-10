// Lesson 3-3 starter (JavaScript): the newer and portable forms of two tasks.
// The newer forms run silently. If one fails on your version, it prints the reason.

const rawScore = 150;
console.log(`Score (portable): ${Math.min(Math.max(rawScore, 0), 100)}`);

const items = [1, 2, 3, 4, 5];
const pairs = [];
for (let i = 0; i < items.length; i += 2) {
  pairs.push(items.slice(i, i + 2).join("+"));
}
console.log(`Pairs (portable): ${pairs.join(", ")}`);

const values = [3, 1, 2];
try {
  values.toSorted();
} catch (error) {
  console.log(`Newer toSorted failed: ${error.message}`);
}
const sortedPortable = [...values].sort((a, b) => a - b);
console.log(`Sorted (portable): ${sortedPortable.join(", ")}`);
console.log(`Original: ${values.join(", ")}`);
