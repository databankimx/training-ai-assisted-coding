// Homework starter (JavaScript): a shipping cost module, with documentation generated from its code.
// Check every documented claim, mark the unsupported ones, and correct the documentation. Don't change the code.

/*
 * Generated documentation for shippingCents:
 *   Parcels up to 5000 grams cost 500 cents.
 *   Parcels of exactly 5000 grams cost 800 cents.
 *   Parcels over 10000 grams cost 1200 cents.
 *   Member prices are 10 percent off, rounded down to the cent.
 *   Negative weights are treated as zero.
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

claim("parcels up to 5000 grams cost 500 cents", () => shippingCents(5000, false) === 500);
claim("parcels of exactly 5000 grams cost 800 cents", () => shippingCents(5000, false) === 800);
claim("parcels over 10000 grams cost 1200 cents", () => shippingCents(10001, false) === 1200);
claim("member prices are 10 percent off, rounded down to the cent", () => shippingCents(1000, true) === 720);
claim("negative weights are treated as zero", () => shippingCents(-1, false) === 0);
