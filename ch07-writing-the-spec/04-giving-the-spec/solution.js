// Lesson 7-4 solution (JavaScript): the follow-up applied. The grace-period arithmetic is corrected, and every row passes.

function fineCents(daysOverdue) {
  if (daysOverdue < 0) throw new RangeError("daysOverdue must not be negative");
  const chargeable = Math.max(0, daysOverdue - 3);
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
