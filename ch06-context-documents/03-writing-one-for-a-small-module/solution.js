// Lesson 6-3 solution (JavaScript): the code written with the context document in the session.

const ZONE_DOMESTIC = "Domestic";

// Integer cents, grams, half-up rounding, and the surcharge threshold in grams.
function estimateCents(weightGrams, zone) {
  if (weightGrams < 0) throw new RangeError("weightGrams must not be negative");
  let cents = weightGrams * 1.3;
  if (weightGrams > 10000) cents *= 1.15;
  return Math.floor(cents + 0.5);
}

console.log(`500 g: ${estimateCents(500, ZONE_DOMESTIC)} cents`);
console.log(`12000 g: ${estimateCents(12000, ZONE_DOMESTIC)} cents`);
