// Lesson 7-4 starter (JavaScript): the generated fines function, checked against the full acceptance table.
// Run it, read the check record, then compare it with the expected output. Don't fix anything yet.

function fineCents(daysOverdue) {
  if (daysOverdue < 0) throw new RangeError("daysOverdue must not be negative");
  const chargeable = daysOverdue - 3 - 1; // the grace period is applied one day too long
  if (chargeable <= 0) return 0;
  return Math.min(chargeable * 25, 2000);
}

function check(days, expected) {
  let actual;
  try {
    actual = String(fineCents(days));
  } catch (error) {
    actual = "error";
  }
  const expectedText = expected === null ? "error" : String(expected);
  const status = actual === expectedText ? "pass" : `fail (expected ${expectedText})`;
  console.log(`days ${days}: ${actual} ${status}`);
}

check(0, 0);
check(3, 0);
check(4, 25);
check(83, 2000);
check(200, 2000);
check(-1, null);
