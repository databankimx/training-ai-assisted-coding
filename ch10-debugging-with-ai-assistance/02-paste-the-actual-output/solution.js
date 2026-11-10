// Lesson 10-2 solution (JavaScript): the page count rounds up, so the partial last page is shown.

const items = [1, 2, 3, 4, 5, 6, 7];
const pageSize = 3;
const pageCount = Math.ceil(items.length / pageSize); // rounds up
let shown = 0;
for (let page = 0; page < pageCount; page++) {
  const piece = items.slice(page * pageSize, (page + 1) * pageSize);
  shown += piece.length;
  console.log(`page ${page}: ${piece.join(" ")}`);
}
console.log(`total shown: ${shown} of ${items.length}`);
