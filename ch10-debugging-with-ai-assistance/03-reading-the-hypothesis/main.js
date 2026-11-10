// Lesson 10-3 starter (JavaScript): a fix someone proposed for the page-count bug. Check it against the cases before accepting it.
// Run it, read each case, then compare with the expected output. Don't fix anything yet.

function pageCount(items, pageSize) {
  return Math.floor(items / pageSize) + 1; // proposed fix
}

function check(items, pageSize, expected) {
  const actual = pageCount(items, pageSize);
  const status = actual === expected ? "pass" : `fail (expected ${expected})`;
  console.log(`${items} items, size ${pageSize}: ${actual} pages ${status}`);
}

check(7, 3, 3);
check(6, 3, 2);
check(0, 3, 0);
