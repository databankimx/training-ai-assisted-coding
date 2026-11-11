// Lesson 12-4 solution (JavaScript): the documentation example updated to the cap the code now enforces.

/*
 * Examples from the documentation:
 *   Three days overdue costs nothing.
 *   Four days overdue costs 25 cents.
 *   200 days overdue costs 1800 cents, because the cap is 1800 cents.
 */
function fineCents(daysOverdue) {
  if (daysOverdue < 0) throw new RangeError("daysOverdue must not be negative");
  const chargeable = Math.max(0, daysOverdue - 3);
  return Math.min(chargeable * 25, 1800);
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

claim("three days overdue costs nothing", () => fineCents(3) === 0);
claim("four days overdue costs 25 cents", () => fineCents(4) === 25);
claim("200 days overdue costs 1800 cents", () => fineCents(200) === 1800);
