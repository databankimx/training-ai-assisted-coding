// Lesson 12-4 starter (JavaScript): documentation examples that have drifted from the code.
// A recent commit changed the cap from 2000 to 1800 cents, and the documentation was not updated.
// Run it, read each claim, then compare with the expected output. Don't fix anything yet.

/*
 * Examples from the documentation:
 *   Three days overdue costs nothing.
 *   Four days overdue costs 25 cents.
 *   200 days overdue costs 2000 cents.
 */
function fineCents(daysOverdue) {
  if (daysOverdue < 0) throw new RangeError("daysOverdue must not be negative");
  const chargeable = Math.max(0, daysOverdue - 3);
  return Math.min(chargeable * 25, 1800); // the cap changed from 2000 to 1800 in a recent commit
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
claim("200 days overdue costs 2000 cents", () => fineCents(200) === 2000);
