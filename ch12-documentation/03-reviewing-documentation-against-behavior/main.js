// Lesson 12-3 starter (JavaScript): a generated documentation comment, checked claim by claim against the function.
// Run it, read each claim, then compare with the expected output. Don't fix anything yet.

/*
 * Generated documentation:
 *   Returns zero for negative days.
 *   Charges 25 cents per day after the first three free days.
 *   Caps the fine at 2000 cents.
 *   Returns zero during the first three free days.
 */
function fineCents(daysOverdue) {
  if (daysOverdue < 0) throw new RangeError("daysOverdue must not be negative");
  const chargeable = daysOverdue - 3 - 1; // the grace period is one day too long
  if (chargeable <= 0) return 0;
  return Math.min(chargeable * 25, 2000);
}

function claim(text, holds) {
  let supported;
  try {
    supported = holds();
  } catch (error) {
    supported = false;
  }
  console.log(`claim "${text}": ${supported ? "supported" : "unsupported"}`);
}

claim("returns zero for negative days", () => fineCents(-1) === 0);
claim("caps the fine at 2000 cents", () => fineCents(200) === 2000);
claim("charges 25 cents per day after the first three free days", () => fineCents(4) === 25);
claim("returns zero during the first three free days", () => fineCents(3) === 0);
