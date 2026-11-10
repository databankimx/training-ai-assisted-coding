// Lesson 9-5 solution (JavaScript): the implementation written to pass the spec, and the suite restored to the spec's value.

const spec = [[3, 0], [4, 25], [200, 2000]];

// The suite, restored so that its expectation for day four matches the spec.
const suite = [[3, 0], [4, 25], [200, 2000]];

function fineCents(daysOverdue) {
  const chargeable = Math.max(0, daysOverdue - 3);
  return Math.min(chargeable * 25, 2000);
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
