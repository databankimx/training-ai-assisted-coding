// Lesson 8-5 solution (JavaScript): the fine and the call site, both fixed.

function fineCents(daysOverdue) {
  const chargeable = Math.max(0, daysOverdue - 3);
  return chargeable * 25;
}

function estimateCents(weightGrams) {
  return Math.round(weightGrams * 1.3);
}

const circularPasses = fineCents(10) === fineCents(10);
console.log("circular test: " + (circularPasses ? "passed" : "failed"));

const fine = fineCents(10);
console.log("spec test: " + (fine === 175 ? "passed" : `failed (expected 175, got ${fine})`));

console.log(`cost: ${estimateCents(2000)} cents`);
