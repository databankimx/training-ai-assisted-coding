// Homework solution (C#): the agent's change is reduced to the brief. The comment stays, and the value and the other files are reverted.
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
+    int cap = 2000;
""";

foreach (var section in diff.Split("diff --git ", StringSplitOptions.RemoveEmptyEntries))
{
    var lines = section.Split('\n');
    string file = Regex.Match(lines[0], @"b/(\S+)").Groups[1].Value;
    bool inScope = file.StartsWith(allowedPrefix);
    int removedChecks = lines.Count(line => line.StartsWith("-expect"));
    Console.WriteLine($"file {file}: {(inScope ? "in scope" : "OUT OF SCOPE")}, removed expect lines {removedChecks}");
}
