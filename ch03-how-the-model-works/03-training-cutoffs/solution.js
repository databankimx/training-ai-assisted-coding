// Lesson 3-3 solution (JavaScript): the portable forms, which work on Node 18 and later.

const rawScore = 150;
console.log(`Score (portable): ${Math.min(Math.max(rawScore, 0), 100)}`);

const items = [1, 2, 3, 4, 5];
const pairs = [];
for (let i = 0; i < items.length; i += 2) {
  pairs.push(items.slice(i, i + 2).join("+"));
}
console.log(`Pairs (portable): ${pairs.join(", ")}`);

const values = [3, 1, 2];
const sortedPortable = [...values].sort((a, b) => a - b);
console.log(`Sorted (portable): ${sortedPortable.join(", ")}`);
console.log(`Original: ${values.join(", ")}`);
