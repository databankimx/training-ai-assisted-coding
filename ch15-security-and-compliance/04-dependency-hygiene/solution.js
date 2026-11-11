// Lesson 15-4 solution (JavaScript): the allow list is applied, and each dependency that needs review gives its reason.

const allowedLicenses = new Set(["MIT", "Apache-2.0", "BSD-3-Clause", "ISC"]);

const dependencies = [
  ["highlight.js", "BSD-3-Clause"],
  ["markdown-it", "MIT"],
  ["logging-kit", "Apache-2.0"],
  ["some-parser", "GPL-3.0"],
  ["mystery-lib", ""],
];

function verdict(licenseName) {
  if (licenseName === "") return "needs review, no license found";
  if (allowedLicenses.has(licenseName)) return "allowed";
  return "needs review, not on the allow list";
}

for (const [name, licenseName] of dependencies) {
  const shown = licenseName === "" ? "no license found" : licenseName;
  console.log(`dependency ${name} (${shown}): ${verdict(licenseName)}`);
}
