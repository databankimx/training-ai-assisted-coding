// Lesson 10-3 solution (JavaScript): the fix that rounds up, checked against the same three cases.

function pageCount(items, pageSize) {
  return Math.ceil(items / pageSize);
}

function check(items, pageSize, expected) {
  const actual = pageCount(items, pageSize);
  const status = actual === expected ? "pass" : `fail (expected ${expected})`;
  console.log(`${items} items, size ${pageSize}: ${actual} pages ${status}`);
}

check(7, 3, 3);
check(6, 3, 2);
check(0, 3, 0);
