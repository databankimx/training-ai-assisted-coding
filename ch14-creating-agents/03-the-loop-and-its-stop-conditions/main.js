// Lesson 14-3 starter (JavaScript): a small agent loop over an in-memory sandbox, driven by a scripted stand-in for the model.
// Run it, read the log, then compare with the expected output. Don't fix anything yet.

const sandbox = { "fines.txt": "cap 2000" };
const stepLimit = 10;
let step = 0;

// The stand-in for the model. It proposes one action per step.
// After the write, it keeps asking to read the file again, and it never says "done".
function propose(stepNumber) {
  if (stepNumber === 1) return ["list_files", ""];
  if (stepNumber === 2) return ["read_file", "fines.txt"];
  if (stepNumber === 3) return ["write_file", "fines.txt"];
  return ["read_file", "fines.txt"];
}

while (step < stepLimit) {
  step += 1;
  const [tool, argument] = propose(step);
  const call = argument === "" ? tool : `${tool} ${argument}`;
  let result;
  if (tool === "list_files") {
    result = Object.keys(sandbox).join(", ");
  } else if (tool === "read_file") {
    result = argument in sandbox ? sandbox[argument] : "missing";
  } else {
    sandbox[argument] = "cap 1800";
    result = "ok";
  }
  console.log(`step ${step}: ${call} -> ${result}`);
}
console.log(`stopped: step limit (${stepLimit}) reached`);
