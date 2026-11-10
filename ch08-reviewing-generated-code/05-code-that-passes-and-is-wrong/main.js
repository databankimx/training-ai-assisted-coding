// Lesson 8-5 starter (JavaScript): code that passes its checks and is still wrong.
// Run it, and compare each line with the expected output. Don't fix anything yet.

function fineCents(daysOverdue) {
  return daysOverdue * 25; // wrong: ignores the three-day grace period
}

function estimateCents(weightGrams) {
  return Math.round(weightGrams * 1.3);
}

// Circular test: compares the function with itself, so it passes whatever the function returns.
const circularPasses = fineCents(10) === fineCents(10);
console.log("circular test: " + (circularPasses ? "passed" : "failed"));

// Spec test: 10 days overdue, with a three-day grace period, owes 175 cents.
const fine = fineCents(10);
console.log("spec test: " + (fine === 175 ? "passed" : `failed (expected 175, got ${fine})`));

// Call site: the estimator takes grams, but this caller passes kilograms.
console.log(`cost: ${estimateCents(2)} cents`);
