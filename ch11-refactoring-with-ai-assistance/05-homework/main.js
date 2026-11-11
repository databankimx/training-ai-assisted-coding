// Homework starter (JavaScript): a parcel quote refactored by an assistant in three checkpoints.
// Find the checkpoint that changed behavior, fix it, and run again. Don't change the original.

// The original quote. Every checkpoint is compared with this.
function quoteOriginal(grams, member) {
  let baseCents = (grams > 10000 ? 1200 : grams > 5000 ? 800 : 500) + 25; // includes a 25-cent handling fee
  if (member) baseCents = baseCents - Math.floor(baseCents / 10);         // members get 10% off, rounded down
  return baseCents;
}

// Checkpoint 1: rename the parameters only.
function quoteV1(weightGrams, isMember) {
  let baseCents = (weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500) + 25;
  if (isMember) baseCents = baseCents - Math.floor(baseCents / 10);
  return baseCents;
}

// Checkpoint 2: move the member discount into a helper.
function memberPrice(cents) {
  return cents - Math.floor(cents / 10);
}

function quoteV2(weightGrams, isMember) {
  const baseCents = (weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500) + 25;
  return isMember ? memberPrice(baseCents) : baseCents;
}

// Checkpoint 3: the assistant combined the discount into the return. This is the change to check.
function quoteV3(weightGrams, isMember) {
  const baseCents = (weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500) + 25;
  return isMember ? Math.floor((baseCents * 9) / 10) : baseCents;
}

function checkpoint(name, version) {
  const cases = [[4999, false], [5000, true], [5001, false], [10000, true], [10001, true]];
  const differing = cases.filter(([g, m]) => version(g, m) !== quoteOriginal(g, m));
  if (differing.length === 0) {
    console.log(`checkpoint ${name}: pass`);
  } else {
    const [g, m] = differing[0];
    const who = m ? "member" : "regular";
    console.log(`checkpoint ${name}: fail (at ${g} g ${who}: ${version(g, m)}, expected ${quoteOriginal(g, m)})`);
  }
}

checkpoint("1 rename", quoteV1);
checkpoint("2 extract discount", quoteV2);
checkpoint("3 combine discount", quoteV3);
