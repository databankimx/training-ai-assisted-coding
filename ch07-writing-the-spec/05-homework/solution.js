// Homework solution (JavaScript): the parser fixed to the spec. Every acceptance row passes.

function parseSettings(line) {
  const settings = {};
  for (const raw of line.split(";")) {
    const segment = raw.trim();
    if (segment === "") continue;
    const at = segment.indexOf("=");
    if (at < 0) throw new Error("no equals sign");
    const name = segment.slice(0, at).trim();
    if (name === "") throw new Error("empty name");
    if (Object.prototype.hasOwnProperty.call(settings, name)) throw new Error("duplicate name");
    settings[name] = segment.slice(at + 1).trim();
  }
  return settings;
}

function formatSettings(settings) {
  const keys = Object.keys(settings).sort();
  if (keys.length === 0) return "(none)";
  return keys.map((key) => `${key}=${settings[key]}`).join(", ");
}

function check(text, expected) {
  let actual;
  try {
    actual = formatSettings(parseSettings(text));
  } catch (error) {
    actual = "error";
  }
  const status = actual === expected ? "pass" : `fail (expected ${expected})`;
  console.log(`"${text}" -> ${actual} ${status}`);
}

check("name=archive", "name=archive");
check("name=archive;", "name=archive");
check("name = archive ; enabled = true", "enabled=true, name=archive");
check("url=a=b", "url=a=b");
check("name=", "name=");
check("", "(none)");
check("name", "error");
check("=archive", "error");
check("name=a; name=b", "error");
check(";;name=x;;", "name=x");
