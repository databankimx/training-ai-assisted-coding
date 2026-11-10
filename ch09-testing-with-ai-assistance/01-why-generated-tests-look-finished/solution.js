// Lesson 9-1 solution (JavaScript): the fines function fixed, and tests written from the spec.

function fineCents(daysOverdue) {
  if (daysOverdue < 0) throw new RangeError("daysOverdue must not be negative");
  const chargeable = Math.max(0, daysOverdue - 3);
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

test("zero within the grace period", () => fineCents(3) === 0);
test("25 cents per day after the grace period", () => fineCents(4) === 25);
test("caps at 2000", () => fineCents(200) === 2000);
test("rejects negative days", () => throwsError(() => fineCents(-1)));
