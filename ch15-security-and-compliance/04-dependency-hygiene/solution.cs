// Lesson 15-4 solution (C#): the allow list is applied, and each dependency that needs review gives its reason.
using System;
using System.Collections.Generic;

var allowedLicenses = new HashSet<string> { "MIT", "Apache-2.0", "BSD-3-Clause", "ISC" };

var dependencies = new (string Name, string License)[]
{
    ("highlight.js", "BSD-3-Clause"),
    ("markdown-it", "MIT"),
    ("logging-kit", "Apache-2.0"),
    ("some-parser", "GPL-3.0"),
    ("mystery-lib", ""),
};

string Verdict(string license)
{
    if (license == "") return "needs review, no license found";
    if (allowedLicenses.Contains(license)) return "allowed";
    return "needs review, not on the allow list";
}

foreach (var dep in dependencies)
{
    string license = dep.License == "" ? "no license found" : dep.License;
    Console.WriteLine($"dependency {dep.Name} ({license}): {Verdict(dep.License)}");
}
