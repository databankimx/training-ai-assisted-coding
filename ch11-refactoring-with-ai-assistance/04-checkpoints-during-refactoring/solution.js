// Lesson 11-4 solution (JavaScript): the third checkpoint keeps the original's boundaries, so all three pass.

function shippingOriginal(grams) {
  if (grams > 10000) return 1200;
  if (grams > 5000) return 800;
  return 500;
}

function shippingV1(weightGrams) {
  if (weightGrams > 10000) return 1200;
  if (weightGrams > 5000) return 800;
  return 500;
}

function tierCents(weightGrams) {
  return weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500;
}

function shippingV2(weightGrams) {
  return tierCents(weightGrams);
}

// Checkpoint 3, corrected: the boundaries stay strictly greater than, as in the original.
function shippingV3(weightGrams) {
  const cents = weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500;
  return cents;
}

function checkpoint(name, version) {
  const cases = [4999, 5000, 5001, 10000, 10001];
  const differing = cases.filter((g) => version(g) !== shippingOriginal(g));
  if (differing.length === 0) {
    console.log(`checkpoint ${name}: pass`);
  } else {
    const g = differing[0];
    console.log(`checkpoint ${name}: fail (at ${g} g: ${version(g)}, expected ${shippingOriginal(g)})`);
  }
}

checkpoint("1 rename", shippingV1);
checkpoint("2 extract tiers", shippingV2);
checkpoint("3 combine conditions", shippingV3);
