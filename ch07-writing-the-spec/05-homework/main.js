// Homework starter (JavaScript): a generated settings parser, checked against ten acceptance rows.
// Run it, read each row, then review the parser. Don't fix anything yet.

function parseSettings(line) {
  const settings = {};
  for (const segment of line.split(";")) {
    if (segment === "") continue;
    const parts = segment.split("=");
    settings[parts[0]] = parts[1]; // no trim, no duplicate check, splits on every equals sign
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
