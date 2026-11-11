// Homework solution (JavaScript): the third checkpoint uses the original's rounding through the helper, so all three pass.

function quoteOriginal(grams, member) {
  let baseCents = (grams > 10000 ? 1200 : grams > 5000 ? 800 : 500) + 25;
  if (member) baseCents = baseCents - Math.floor(baseCents / 10);
  return baseCents;
}

function quoteV1(weightGrams, isMember) {
  let baseCents = (weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500) + 25;
  if (isMember) baseCents = baseCents - Math.floor(baseCents / 10);
  return baseCents;
}

function memberPrice(cents) {
  return cents - Math.floor(cents / 10);
}

function quoteV2(weightGrams, isMember) {
  const baseCents = (weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500) + 25;
  return isMember ? memberPrice(baseCents) : baseCents;
}

// Checkpoint 3, fixed: the discount goes through the helper, which keeps the original's rounding.
function quoteV3(weightGrams, isMember) {
  const baseCents = (weightGrams > 10000 ? 1200 : weightGrams > 5000 ? 800 : 500) + 25;
  return isMember ? memberPrice(baseCents) : baseCents;
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
