// Lesson 10-4 solution (JavaScript): the page-count fix with the invariant checked, so an invalid page size is reported.

function pageCount(items, pageSize) {
  if (!(pageSize > 0)) throw new RangeError("page size must be positive");
  return Math.ceil(items / pageSize);
}

function check(items, pageSize, expected) {
  let actual;
  try {
    actual = String(pageCount(items, pageSize));
  } catch (error) {
    actual = `error: ${error.message}`;
  }
  const status = actual === expected ? "pass" : `fail (expected ${expected})`;
  console.log(`${items} items, size ${pageSize}: ${actual} ${status}`);
}

check(7, 3, "3");
check(0, 3, "0");
check(5, 0, "error: page size must be positive");
