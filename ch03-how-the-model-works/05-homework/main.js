// Homework starter (JavaScript): generated code for the hunt.
// Run it, and read each line of output. Then hunt. Don't fix anything yet.

const line = " alpha, ,beta ,, gamma ";
const fields = line.split(",").map((f) => f.trim().toUpperCase()).filter(Boolean);
console.log("Fields:", fields.join(", "));

try {
  const count = fields.countNonEmpty();
  console.log("Count:", count);
} catch (error) {
  console.log("Count failed:", error.message);
}

try {
  const sorted = fields.toSorted();
  console.log("Sorted:", sorted.join(", "));
} catch (error) {
  console.log("Sorted failed:", error.message);
}
