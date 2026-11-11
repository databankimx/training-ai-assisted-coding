// Lesson 12-3 solution (JavaScript): the function fixed to the spec, and the documentation corrected to match it.

/*
 * Returns the fine in cents for an item returned after the due date.
 * Throws a RangeError for negative days.
 * The first three days after the due date are free.
 * After that, the fine is 25 cents per day, capped at 2000 cents.
 */
function fineCents(daysOverdue) {
  if (daysOverdue < 0) throw new RangeError("daysOverdue must not be negative");
  const chargeable = Math.max(0, daysOverdue - 3);
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

function throwsRangeError(action) {
  try {
    action();
    return false;
  } catch (error) {
    return error instanceof RangeError;
  }
}

claim("throws for negative days", () => throwsRangeError(() => fineCents(-1)));
claim("caps the fine at 2000 cents", () => fineCents(200) === 2000);
claim("charges 25 cents per day after the first three free days", () => fineCents(4) === 25);
claim("returns zero during the first three free days", () => fineCents(3) === 0);
