// Lesson 8-2 starter (JavaScript): checks whether each kind of call exists in this version of Node.
// Run it, and read each line. Then compare it with the expected output. Don't fix anything yet.

console.log("invented call exists: " + String(typeof [].sortBy === "function"));
console.log("newer call exists: " + String(typeof [].toSorted === "function"));
console.log("deprecated call exists: " + String(typeof require("fs").exists === "function"));
