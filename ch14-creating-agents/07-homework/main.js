// Homework starter (JavaScript): a small agent built from a spec, with three defects against the spec.
// The spec: step limit 5. Each log line is "[n] call -> result". A delete needs a person's approval, and the run stops when the approval is declined.
// Run it, compare each line with the spec, then fix the defects. Don't fix anything yet.

const sandbox = { "notes.txt": "keep this", "temp.txt": "scratch" };
const stepLimit = 20; // defect: the spec says 5
let step = 0;

function propose(stepNumber) {
  if (stepNumber === 1) return ["list_files", ""];
  if (stepNumber === 2) return ["read_file", "notes.txt"];
  return ["delete_file", "temp.txt"];
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
    // defect: the delete runs without asking a person
    if (argument in sandbox) {
      delete sandbox[argument];
      result = "deleted (no approval asked)";
    } else {
      result = "missing";
    }
  }
  console.log(`step ${step}: ${call} -> ${result}`); // defect: the log format is not the spec's
}
console.log(`stopped: step limit (${stepLimit}) reached`);
