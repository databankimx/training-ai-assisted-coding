// Lesson 9-3 starter (JavaScript): a weak test suite, run against three deliberately broken versions of the fines function.
// Run it, read each mutant, then compare with the expected output. Don't fix anything yet.

function fine(daysOverdue, mutant) {
  if (daysOverdue < 0 && mutant !== "no error") throw new RangeError("daysOverdue must not be negative");
  const chargeable = Math.max(0, mutant === "grace one day long" ? daysOverdue - 4 : daysOverdue - 3);
  const cap = mutant === "no cap" ? Infinity : 2000;
  return Math.min(chargeable * 25, cap);
}

function throwsError(action) {
  try {
    action();
    return false;
  } catch (error) {
    return true;
  }
}

function safeRun(test, mutant) {
  try {
    return test((days) => fine(days, mutant));
  } catch (error) {
    return false;
  }
}

// The weak suite, written from the code's own shape rather than from the rules.
const suite = [
  ["returns a non-negative fine", (f) => f(10) >= 0],
  ["caps at 2000", (f) => f(200) === 2000],
  ["is stable across calls", (f) => f(10) === f(10)],
  ["rejects negative days", (f) => throwsError(() => f(-1))],
];

for (const mutant of ["grace one day long", "no cap", "no error"]) {
  const caught = suite.some(([name, test]) => !safeRun(test, mutant));
  console.log(`mutant ${mutant}: ${caught ? "caught" : "missed"}`);
}
