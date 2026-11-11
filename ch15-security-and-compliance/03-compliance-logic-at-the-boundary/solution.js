// Lesson 15-3 solution (JavaScript): the boundary follows the rule. Only records older than 90 days are deleted.

function decide(ageDays) {
  return ageDays > 90 ? "deleted" : "kept";
}

const records = [[1, 30], [2, 90], [3, 91], [4, 400]];
for (const [id, ageDays] of records) {
  console.log(`record ${id} (${ageDays} days): ${decide(ageDays)}`);
}

const deleted = records.filter(([, ageDays]) => decide(ageDays) === "deleted").length;
console.log(`retention job: deleted ${deleted} of ${records.length}`);
