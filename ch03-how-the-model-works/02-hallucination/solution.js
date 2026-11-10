// Lesson 3-2 solution (JavaScript): the same two tasks with real methods.

const names = ["Mira", "", "Adam", "Chen"];

const firstThree = [...names].sort().slice(0, 3);
console.log("Sort and take:", firstThree.map((n) => n || "(empty)").join(", "));

const cleaned = names.filter(Boolean);
console.log("Remove empty:", cleaned.join(", "));
