// Lesson 3-2 starter (JavaScript): two calls an assistant produced.
// Run the file, and read each error. Don't fix anything yet.

const names = ["Mira", "", "Adam", "Chen"];

try {
  const firstThree = names.sortBy((n) => n).slice(0, 3);
  console.log("Sort and take:", firstThree.map((n) => n || "(empty)").join(", "));
} catch (error) {
  console.log("Sort and take failed:", error.message);
}

try {
  const cleaned = names.removeEmpty();
  console.log("Remove empty:", cleaned.join(", "));
} catch (error) {
  console.log("Remove empty failed:", error.message);
}
