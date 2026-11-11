// Lesson 11-4 starter (JavaScript): a shipping tier function refactored in three checkpoints, each compared with the original.
// Run it, read each checkpoint, then compare with the expected output. Don't fix anything yet.

// The original. Every checkpoint is compared with this.
function shippingOriginal(grams) {
  if (grams > 10000) return 1200;
  if (grams > 5000) return 800;
  return 500;
}

// Checkpoint 1: rename the parameter only.
function shippingV1(weightGrams) {
  if (weightGrams > 10000) return 1200;
  if (weightGrams > 5000) return 800;
  return 500;
}

// Checkpoint 2: move the tiers into a helper.
function tierCents(weightGrams) {
  return weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500;
}

function shippingV2(weightGrams) {
  return tierCents(weightGrams);
}

// Checkpoint 3: the assistant's combined condition. It looks like a tidy rewrite.
function shippingV3(weightGrams) {
  return weightGrams >= 10000 ? 1200 : weightGrams >= 5000 ? 800 : 500;
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
