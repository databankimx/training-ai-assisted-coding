// Homework solution (JavaScript): the same task with real methods.

const line = " alpha, ,beta ,, gamma ";
const fields = line.split(",").map((f) => f.trim().toUpperCase()).filter(Boolean);
console.log("Fields:", fields.join(", "));
console.log("Count:", fields.length);
console.log("Sorted:", [...fields].sort().join(", "));
