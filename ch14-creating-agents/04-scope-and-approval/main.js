// Lesson 14-4 starter (JavaScript): the same agent loop, with a write that goes through without any approval.
// Run it, read the log, then compare with the expected output. Don't fix anything yet.

const sandbox = { "fines.txt": "cap 2000" };
const stepLimit = 10;
let step = 0;

function propose(stepNumber) {
  if (stepNumber === 1) return ["list_files", ""];
  if (stepNumber === 2) return ["read_file", "fines.txt"];
  if (stepNumber === 3) return ["write_file", "fines.txt"];
  return ["done", ""];
}

while (step < stepLimit) {
  step += 1;
  const [tool, argument] = propose(step);
  if (tool === "done") {
    console.log(`step ${step}: done`);
    console.log("stopped: model reported done");
    break;
  }
  const call = argument === "" ? tool : `${tool} ${argument}`;
  let result;
  if (tool === "list_files") {
    result = Object.keys(sandbox).join(", ");
  } else if (tool === "read_file") {
    result = argument in sandbox ? sandbox[argument] : "missing";
  } else {
    // No check here: the write happens whatever the model proposed.
    sandbox[argument] = "cap 1800";
    result = "ok (no approval asked)";
  }
  console.log(`step ${step}: ${call} -> ${result}`);
}
