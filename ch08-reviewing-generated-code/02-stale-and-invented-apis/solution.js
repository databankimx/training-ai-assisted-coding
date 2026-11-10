// Lesson 8-2 solution (JavaScript): the same three tasks, written with calls that exist in Node 20 and later.

const names = ["Mira", "Adam", "Chen"];
const sorted = [...names].sort();
console.log("sorted names: " + sorted.join(", "));

const score = Math.min(Math.max(150, 0), 100);
console.log(`clamped score: ${score}`);

const stamp = new Date().toISOString();
console.log("timestamp is utc: " + String(stamp.endsWith("Z")));
