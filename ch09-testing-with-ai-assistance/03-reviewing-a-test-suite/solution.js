// Lesson 9-3 solution (JavaScript): a suite written from the spec catches all three mutants.

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

// The suite written from the spec. Each rule has a test, and the boundary sits on each side of the grace period.
const suite = [
  ["zero within the grace period", (f) => f(3) === 0],
  ["25 cents per day after the grace period", (f) => f(4) === 25],
  ["caps at 2000", (f) => f(200) === 2000],
  ["rejects negative days", (f) => throwsError(() => f(-1))],
];

for (const mutant of ["grace one day long", "no cap", "no error"]) {
  const caught = suite.some(([name, test]) => !safeRun(test, mutant));
  console.log(`mutant ${mutant}: ${caught ? "caught" : "missed"}`);
}
