// Homework solution (JavaScript): the agent with the spec's step limit, log format, and approval gate.

const sandbox = { "notes.txt": "keep this", "temp.txt": "scratch" };
const stepLimit = 5;
let step = 0;
let stoppedAtGate = false;

function propose(stepNumber) {
  if (stepNumber === 1) return ["list_files", ""];
  if (stepNumber === 2) return ["read_file", "notes.txt"];
  return ["delete_file", "temp.txt"];
}

// The approval gate for deletes. A person answers it. Here the answer is fixed, so the example is repeatable.
function personApproves(call) {
  return false;
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
  } else if (!personApproves(call)) {
    result = "needs approval, not deleted";
    stoppedAtGate = true;
  } else {
    if (argument in sandbox) {
      delete sandbox[argument];
      result = "deleted";
    } else {
      result = "missing";
    }
  }
  console.log(`[${step}] ${call} -> ${result}`);
  if (stoppedAtGate) {
    console.log("stopped: delete needs approval");
    break;
  }
}
