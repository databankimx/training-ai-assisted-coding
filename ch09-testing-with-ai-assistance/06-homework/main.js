// Homework starter (JavaScript): a generated test suite with gaps, run against four mutants of the fines function.
// Run it, read each mutant, then find the gap. Don't fix anything yet.

function fine(daysOverdue, mutant) {
  if (daysOverdue < 0 && mutant !== "no error") throw new RangeError("daysOverdue must not be negative");
  const grace = mutant === "grace one day long" ? 4 : mutant === "grace two days short" ? 2 : 3;
  const chargeable = Math.max(0, daysOverdue - grace);
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

// The generated suite. It has gaps: no test sits on either side of the grace period.
const suite = [
  ["returns a non-negative fine", (f) => f(10) >= 0],
  ["caps at 2000", (f) => f(200) === 2000],
  ["zero for a book returned on time", (f) => f(0) === 0],
  ["rejects negative days", (f) => throwsError(() => f(-1))],
];

for (const mutant of ["grace one day long", "grace two days short", "no cap", "no error"]) {
  const caught = suite.some(([name, test]) => !safeRun(test, mutant));
  console.log(`mutant ${mutant}: ${caught ? "caught" : "missed"}`);
}
