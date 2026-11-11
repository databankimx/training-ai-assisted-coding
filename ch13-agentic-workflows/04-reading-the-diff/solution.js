// Lesson 13-4 solution (JavaScript): the agent's change kept to the scope, with no checks removed.

const allowedPrefix = "src/fines";

const diff = `diff --git a/src/fines.cs b/src/fines.cs
--- a/src/fines.cs
+++ b/src/fines.cs
@@ -1,2 +1,3 @@
-    int cap = 2000;
+    // The cap is in cents, and it applies after the free days.
+    int cap = 2000;
`;

for (const section of diff.split("diff --git ")) {
  if (section.trim() === "") continue;
  const lines = section.split("\n");
  const file = lines[0].match(/b\/(\S+)/)[1];
  const inScope = file.startsWith(allowedPrefix);
  const removedChecks = lines.filter((line) => line.startsWith("-expect")).length;
  console.log(`file ${file}: ${inScope ? "in scope" : "OUT OF SCOPE"}, removed expect lines ${removedChecks}`);
}
