// Lesson 8-3 starter (JavaScript): three common failure modes, each run as a case.
// Run it, and compare each line with the expected output. Don't fix anything yet.

function parseCount(text) {
  try {
    return parseInt(text, 10);
  } catch (error) {
    return 0;
  }
}

async function getValue() {
  return 42;
}

async function runSteps(signal) {
  let steps = 0;
  for (let i = 0; i < 3; i++) {
    // the signal is never checked
    await new Promise((resolve) => setTimeout(resolve, 1));
    steps++;
  }
  return steps;
}

async function main() {
  console.log(`parse abc: ${parseCount("abc")}`);
  const value = getValue(); // missing await
  console.log(`value: ${typeof value === "number" ? value : "not a number, " + typeof value}`);
  const controller = new AbortController();
  controller.abort();
  const steps = await runSteps(controller.signal);
  console.log(`steps after cancel: ${steps}`);
}

main();
