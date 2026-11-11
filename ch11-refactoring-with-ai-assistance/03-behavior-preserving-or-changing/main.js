// Lesson 11-3 starter (JavaScript): an assistant's refactor of formatPrice, compared with the original on the same cases.
// Run it, read each line, then compare with the expected output. Don't fix anything yet.

function formatPriceOriginal(cents, member) {
  let amount = cents;
  if (member) amount = amount - Math.floor(amount / 10); // members get 10% off, rounded down to the cent
  const dollars = Math.floor(amount / 100);
  const rest = amount % 100;
  return "$" + dollars + "." + (rest < 10 ? "0" : "") + rest;
}

// The assistant's refactor: shorter, and it looks equivalent.
function formatPriceRefactored(cents, member) {
  const discounted = member ? Math.floor((cents * 9) / 10) : cents;
  return "$" + Math.floor(discounted / 100) + "." + String(discounted % 100).padStart(2, "0");
}

function compare(cents, member, label) {
  const original = formatPriceOriginal(cents, member);
  const refactored = formatPriceRefactored(cents, member);
  const verdict = original === refactored ? "same" : "different";
  console.log(`${label}: original ${original}, refactored ${refactored} ${verdict}`);
}

compare(105, true, "105 member");
compare(100, false, "100 regular");
compare(1999, true, "1999 member");
