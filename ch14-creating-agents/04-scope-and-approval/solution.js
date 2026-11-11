// Lesson 14-4 solution (JavaScript): the write goes through an approval gate. The person declines it here, so the file is unchanged and the run stops.

const sandbox = { "fines.txt": "cap 2000" };
const stepLimit = 10;
let step = 0;
let stoppedAtGate = false;

function propose(stepNumber) {
  if (stepNumber === 1) return ["list_files", ""];
  if (stepNumber === 2) return ["read_file", "fines.txt"];
  if (stepNumber === 3) return ["write_file", "fines.txt"];
  return ["done", ""];
}

// The approval gate. In a real agent this asks a person. Here the answer is fixed, so the example is repeatable.
function personApproves(call) {
  return false;
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
  } else if (!personApproves(call)) {
    result = "needs approval, not written";
    stoppedAtGate = true;
  } else {
    sandbox[argument] = "cap 1800";
    result = "ok";
  }
  console.log(`step ${step}: ${call} -> ${result}`);
  if (stoppedAtGate) {
    console.log("stopped: write needs approval");
    break;
  }
}
