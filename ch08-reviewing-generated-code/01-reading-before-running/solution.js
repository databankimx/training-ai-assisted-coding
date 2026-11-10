// Lesson 8-1 solution (JavaScript): the loader with the three claims fixed.
const fs = require("fs");

function loadSettings(path) {
  if (!fs.existsSync(path)) throw new Error("file not found");
  const settings = {};
  fs.readFileSync(path, "utf8").split("\n").forEach((line, index) => {
    const at = line.indexOf("=");
    if (at < 0) throw new Error(`line ${index + 1} has no equals sign`);
    settings[line.slice(0, at)] = line.slice(at + 1);
  });
  return settings;
}

fs.writeFileSync("malformed.txt", "name=archive\nbroken line");
fs.writeFileSync("equals.txt", "url=a=b");

try {
  loadSettings("missing.txt");
  console.log("missing: no error");
} catch (error) {
  console.log(`missing: error (${error.message})`);
}

try {
  loadSettings("malformed.txt");
  console.log("malformed: no error");
} catch (error) {
  console.log(`malformed: error (${error.message})`);
}

const equals = loadSettings("equals.txt");
console.log("equals: " + Object.entries(equals).map(([key, value]) => `${key}=${value}`).join(", "));
