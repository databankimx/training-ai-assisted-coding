// Lesson 8-1 starter (JavaScript): the settings loader from the reading step, run against three cases.
// Run it, and compare each line with the expected output. Don't fix anything yet.
const fs = require("fs");

function loadSettings(path) {
  const settings = {};
  try {
    for (const line of fs.readFileSync(path, "utf8").split("\n")) {
      const parts = line.split("=");
      settings[parts[0]] = parts[1];
    }
  } catch (error) {
    return {};
  }
  return settings;
}

fs.writeFileSync("malformed.txt", "name=archive\nbroken line");
fs.writeFileSync("equals.txt", "url=a=b");

const missing = loadSettings("missing.txt");
console.log(`missing: ${Object.keys(missing).length} settings`);

const malformed = loadSettings("malformed.txt");
console.log(`malformed: ${Object.keys(malformed).length} settings`);

const equals = loadSettings("equals.txt");
console.log("equals: " + Object.entries(equals).map(([key, value]) => `${key}=${value}`).join(", "));
