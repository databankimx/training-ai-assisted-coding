// Lesson 15-4 starter (JavaScript): a dependency list checked against the license rule. The rule is in the lesson.
// Run it, read each line, then compare with the expected output. Don't fix anything yet.

// The license rule: MIT, Apache-2.0, BSD-3-Clause, and ISC are allowed for closed-source commercial use.
// Anything else needs review before it is added.
const allowedLicenses = new Set(["MIT", "Apache-2.0", "BSD-3-Clause", "ISC"]);

const dependencies = [
  ["highlight.js", "BSD-3-Clause"],
  ["markdown-it", "MIT"],
  ["logging-kit", "Apache-2.0"],
  ["some-parser", "GPL-3.0"],
  ["mystery-lib", ""],
];

// defect: the allow list is never consulted, so every dependency passes
function allowed(licenseName) {
  return true;
}

for (const [name, licenseName] of dependencies) {
  const shown = licenseName === "" ? "no license found" : licenseName;
  const verdict = allowed(licenseName) ? "allowed" : "needs review";
  console.log(`dependency ${name} (${shown}): ${verdict}`);
}
