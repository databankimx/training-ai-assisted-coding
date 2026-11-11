// Lesson 11-3 solution (JavaScript): a refactor that keeps the original's arithmetic, and the same cases agree.

function formatPriceOriginal(cents, member) {
  let amount = cents;
  if (member) amount = amount - Math.floor(amount / 10);
  const dollars = Math.floor(amount / 100);
  const rest = amount % 100;
  return "$" + dollars + "." + (rest < 10 ? "0" : "") + rest;
}

// Behavior-preserving refactor: the same subtraction, written once, and the same two-digit cents.
function formatPriceRefactored(cents, member) {
  const discounted = member ? cents - Math.floor(cents / 10) : cents;
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
