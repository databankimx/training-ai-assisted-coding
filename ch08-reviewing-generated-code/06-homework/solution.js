// Homework solution (JavaScript): the three functions with the defects fixed, run by the same harness.

function parseRetryDelays(text) {
  return text.split(",").map((part) => {
    const trimmed = part.trim();
    const value = Number(trimmed);
    if (trimmed === "" || !Number.isInteger(value)) throw new Error(`not a number: ${trimmed}`);
    return value;
  });
}

async function ageService(userId) {
  return 42;
}

async function getUserAge(userId, signal) {
  if (signal && signal.aborted) throw new Error("cancelled");
  return await ageService(userId);
}

function applyDiscount(price, percent) {
  if (!Number.isInteger(percent) || percent < 0 || percent > 100) {
    throw new RangeError("percent must be a whole number from 0 to 100");
  }
  return price - Math.floor((price * percent) / 100);
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
