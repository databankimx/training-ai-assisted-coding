// Homework solution (JavaScript): the same code, with the two unsupported claims corrected to what the code does.

/*
 * Documentation for shippingCents, checked against the code:
 *   Parcels up to 5000 grams cost 500 cents.
 *   Parcels of exactly 5000 grams cost 500 cents, because the 800-cent tier starts above 5000 grams.
 *   Parcels over 10000 grams cost 1200 cents.
 *   Member prices are 10 percent off, rounded down to the cent.
 *   Negative weights throw a RangeError.
 */
function shippingCents(grams, member) {
  if (grams < 0) throw new RangeError("grams must not be negative");
  let cents = grams > 10000 ? 1200 : grams > 5000 ? 800 : 500;
  if (member) cents = cents - Math.floor(cents / 10);
  return cents;
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

claim("parcels up to 5000 grams cost 500 cents", () => shippingCents(5000, false) === 500);
claim("parcels of exactly 5000 grams cost 500 cents", () => shippingCents(5000, false) === 500);
claim("parcels over 10000 grams cost 1200 cents", () => shippingCents(10001, false) === 1200);
claim("member prices are 10 percent off, rounded down to the cent", () => shippingCents(1000, true) === 720);
claim("negative weights throw an error", () => throwsRangeError(() => shippingCents(-1, false)));
