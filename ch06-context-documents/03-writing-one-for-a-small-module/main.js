// Lesson 6-3 starter (JavaScript): the code the assistant produced without the context document.
// Run it, and compare each line with the expected output. Don't fix anything yet.

const ZONE_DOMESTIC = "Domestic";

// Kilograms and floating-point dollars: the two mistakes the document prevents.
function estimateDollars(weightKg, zone) {
  let cost = weightKg * 2.5;
  if (weightKg > 10) cost *= 1.15;
  return Math.round(cost * 100) / 100;
}

console.log(`0.5 kg: ${estimateDollars(0.5, ZONE_DOMESTIC)} dollars`);
console.log(`12 kg: ${estimateDollars(12, ZONE_DOMESTIC)} dollars`);
