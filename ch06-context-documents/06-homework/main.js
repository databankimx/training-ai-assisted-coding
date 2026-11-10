// Homework starter (JavaScript): a generated grace-period fines function, checked against the homework cases.
// Run it, read each line, then review the function. Don't fix anything yet.

function fineCents(daysOverdue) {
  if (daysOverdue < 0) throw new RangeError("daysOverdue must not be negative");
  return Math.min(daysOverdue * 25, 2000); // the three-day grace period is not applied
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
  console.log(`days ${days} -> ${actual} ${status}`);
}

check(0, 0);
check(1, 0);
check(4, 25);
check(200, 2000);
check(-1, null);
