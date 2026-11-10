// Homework starter (JavaScript): three generated functions and the harness that tests them against the spec.
// Run it, read each row, then review the functions. Don't fix anything yet.

function parseRetryDelays(text) {
  try {
    return text.split(",").map((part) => parseInt(part, 10));
  } catch (error) {
    return [];
  }
}

async function ageService(userId) {
  return 42;
}

async function getUserAge(userId, signal) {
  return ageService(userId); // the signal is accepted and never checked
}

function applyDiscount(price, percent) {
  const discounted = price - price * percent; // percent treated as a fraction
  return discounted * 1.0825;                 // tax hardcoded, floating point
}

function show(action) {
  try {
    return action().join(" ");
  } catch (error) {
    return "error";
  }
}

async function main() {
  console.log(`retry "100, 200, 400": ${show(() => parseRetryDelays("100, 200, 400"))}`);
  console.log(`retry "100, abc": ${show(() => parseRetryDelays("100, abc"))}`);
  console.log(`retry "100, 200,": ${show(() => parseRetryDelays("100, 200,"))}`);

  console.log(`user age normal: ${await getUserAge(1, undefined)}`);
  const controller = new AbortController();
  controller.abort();
  try {
    console.log(`user age cancelled: ${await getUserAge(1, controller.signal)}`);
  } catch (error) {
    console.log("user age cancelled: cancelled");
  }

  console.log(`discount 1000 at 10: ${applyDiscount(1000, 10)}`);
  console.log(`discount 1000 at 0: ${applyDiscount(1000, 0)}`);
  console.log(`discount 1000 at 100: ${applyDiscount(1000, 100)}`);
}

main();
