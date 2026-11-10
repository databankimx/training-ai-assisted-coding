// Lesson 9-1 starter (JavaScript): a generated test suite, run against the fines function.
// Run it, read each result, then compare with the expected output. Don't fix anything yet.

function fineCents(daysOverdue) {
  if (daysOverdue < 0) throw new RangeError("daysOverdue must not be negative");
  const chargeable = daysOverdue - 3 - 1; // the grace period is one day too long
  if (chargeable <= 0) return 0;
  return Math.min(chargeable * 25, 2000);
}

function throwsError(action) {
  try {
    action();
    return false;
  } catch (error) {
    return true;
  }
}

function test(name, check) {
  let passed;
  try {
    passed = check();
  } catch (error) {
    passed = false;
  }
  console.log(`test ${name}: ${passed ? "pass" : "fail"}`);
}

test("returns a non-negative fine", () => fineCents(10) >= 0);
test("caps at 2000", () => fineCents(200) === 2000);
test("is stable across calls", () => fineCents(10) === fineCents(10));
test("rejects negative days", () => throwsError(() => fineCents(-1)));
