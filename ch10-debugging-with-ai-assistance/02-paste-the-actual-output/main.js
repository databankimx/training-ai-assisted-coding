// Lesson 10-2 starter (JavaScript): a paging helper that drops the last partial page.
// Run it, copy the output exactly, then compare it with the expected output. Don't fix anything yet.

const items = [1, 2, 3, 4, 5, 6, 7];
const pageSize = 3;
const pageCount = Math.floor(items.length / pageSize); // bug: integer division drops the partial last page
let shown = 0;
for (let page = 0; page < pageCount; page++) {
  const piece = items.slice(page * pageSize, (page + 1) * pageSize);
  shown += piece.length;
  console.log(`page ${page}: ${piece.join(" ")}`);
}
console.log(`total shown: ${shown} of ${items.length}`);
