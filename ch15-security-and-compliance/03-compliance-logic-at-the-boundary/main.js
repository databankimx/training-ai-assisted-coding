// Lesson 15-3 starter (JavaScript): a retention rule. Records older than 90 days are deleted; a record exactly 90 days old is kept.
// Run it, read each line, then compare with the expected output. Don't fix anything yet.

function decide(ageDays) {
  return ageDays >= 90 ? "deleted" : "kept"; // defect: a record exactly 90 days old is deleted
}

const records = [[1, 30], [2, 90], [3, 91], [4, 400]];
for (const [id, ageDays] of records) {
  console.log(`record ${id} (${ageDays} days): ${decide(ageDays)}`);
}

const deleted = records.filter(([, ageDays]) => decide(ageDays) === "deleted").length;
console.log(`retention job: deleted ${deleted} of ${records.length}`);
