// Lesson 14-3 solution (JavaScript): the stand-in reports done once the write has succeeded, and the loop stops on it.

const sandbox = { "fines.txt": "cap 2000" };
const stepLimit = 10;
let step = 0;
let finished = false;

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
    finished = true;
    break;
  }
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
console.log(finished ? "stopped: model reported done" : `stopped: step limit (${stepLimit}) reached`);
