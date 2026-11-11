// Lesson 15-4 starter (C#): a dependency list checked against the license rule. The rule is in the lesson.
// Run it, read each line, then compare with the expected output. Don't fix anything yet.
using System;
using System.Collections.Generic;

// The license rule: MIT, Apache-2.0, BSD-3-Clause, and ISC are allowed for closed-source commercial use.
// Anything else needs review before it is added.
var allowedLicenses = new HashSet<string> { "MIT", "Apache-2.0", "BSD-3-Clause", "ISC" };

var dependencies = new (string Name, string License)[]
{
    ("highlight.js", "BSD-3-Clause"),
    ("markdown-it", "MIT"),
    ("logging-kit", "Apache-2.0"),
    ("some-parser", "GPL-3.0"),
    ("mystery-lib", ""),
};

// defect: the allow list is never consulted, so every dependency passes
bool Allowed(string license) => true;

foreach (var dep in dependencies)
{
    string license = dep.License == "" ? "no license found" : dep.License;
    string verdict = Allowed(dep.License) ? "allowed" : "needs review";
    Console.WriteLine($"dependency {dep.Name} ({license}): {verdict}");
}
