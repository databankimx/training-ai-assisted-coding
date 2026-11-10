// Lesson 8-3 solution (JavaScript): the same three cases, with the failures fixed.

function parseCount(text) {
  const count = Number(text);
  if (!Number.isInteger(count)) throw new Error(`not a number: ${text}`);
  return count;
}

async function getValue() {
  return 42;
}

async function runSteps(signal) {
  let steps = 0;
  for (let i = 0; i < 3; i++) {
    if (signal.aborted) break;
    await new Promise((resolve) => setTimeout(resolve, 1));
    steps++;
  }
  return steps;
}

async function main() {
  try {
    console.log(`parse abc: ${parseCount("abc")}`);
  } catch (error) {
    console.log(`parse abc: error (${error.message})`);
  }
  const value = await getValue();
  console.log(`value: ${value}`);
  const controller = new AbortController();
  controller.abort();
  const steps = await runSteps(controller.signal);
  console.log(`steps after cancel: ${steps}`);
}

main();
