// Lesson 9-5 starter (JavaScript): test-first. The suite comes first, the implementation is a placeholder, and the suite is checked against the spec.
// Run it, read each test, then compare with the expected output. Don't fix anything yet.

// The spec, as data: days overdue, and the expected fine in cents.
const spec = [[3, 0], [4, 25], [200, 2000]];

// The suite. Its expectation for day four was changed to match an earlier defect.
const suite = [[3, 0], [4, 100], [200, 2000]];

// The implementation has not been written yet. The placeholder is the red state.
function fineCents(daysOverdue) {
  return -1;
}

for (const [days, cents] of suite) {
  const actual = fineCents(days);
  console.log(`test day ${days}: ${actual === cents ? "pass" : "fail"}`);
}

let disagreement = "";
for (const [days, cents] of suite) {
  const specRow = spec.find(([d]) => d === days);
  if (specRow[1] !== cents) {
    disagreement = `day ${days} expects ${cents}, spec says ${specRow[1]}`;
    break;
  }
}
console.log(disagreement === "" ? "suite agrees with spec: yes" : `suite agrees with spec: no (${disagreement})`);
