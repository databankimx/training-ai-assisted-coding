// Lesson 10-4 starter (JavaScript): the page-count fix, checked against cases that include an invalid input.
// Run it, read each case, then compare with the expected output. Don't fix anything yet.

function pageCount(items, pageSize) {
  return Math.ceil(items / pageSize); // rounds up, correct for any valid page size
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
