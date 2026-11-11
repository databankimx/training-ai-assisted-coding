// Homework starter (C#): a second diff from an agent. Check it against the brief, file by file.
// The brief: scope is src/fines only. Do not edit tests or documentation. Do not change any value.
// Run it, read each line, then review the diff. Don't fix anything yet.
using System;
using System.Linq;
using System.Text.RegularExpressions;

string allowedPrefix = "src/fines";

string diff = """
diff --git a/src/fines.cs b/src/fines.cs
--- a/src/fines.cs
+++ b/src/fines.cs
@@ -1,2 +1,3 @@
-    int cap = 2000;
+    // The cap is in cents, and it applies after the free days.
+    int cap = 1800;
diff --git a/tests/fines_tests.cs b/tests/fines_tests.cs
--- a/tests/fines_tests.cs
+++ b/tests/fines_tests.cs
@@ -1,2 +1,1 @@
-expect 200 2000
+expect 200 1800
diff --git a/docs/fines.md b/docs/fines.md
--- a/docs/fines.md
+++ b/docs/fines.md
@@ -1,1 +1,1 @@
-The cap is 2000 cents.
+The cap is 1800 cents.
""";

foreach (var section in diff.Split("diff --git ", StringSplitOptions.RemoveEmptyEntries))
{
    var lines = section.Split('\n');
    string file = Regex.Match(lines[0], @"b/(\S+)").Groups[1].Value;
    bool inScope = file.StartsWith(allowedPrefix);
    int removedChecks = lines.Count(line => line.StartsWith("-expect"));
    Console.WriteLine($"file {file}: {(inScope ? "in scope" : "OUT OF SCOPE")}, removed expect lines {removedChecks}");
}
