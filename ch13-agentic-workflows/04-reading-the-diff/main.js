// Lesson 13-4 starter (JavaScript): a diff produced by an agent, checked for scope and for removed checks.
// Run it, read each line, then compare with the expected output. Don't fix anything yet.

const allowedPrefix = "src/fines";

const diff = `diff --git a/src/fines.cs b/src/fines.cs
--- a/src/fines.cs
+++ b/src/fines.cs
@@ -1,2 +1,2 @@
-    int cap = 2000;
+    int cap = 2000;
diff --git a/tests/fines_tests.cs b/tests/fines_tests.cs
--- a/tests/fines_tests.cs
+++ b/tests/fines_tests.cs
@@ -1,3 +1,1 @@
-expect 4 25
-expect 200 2000
+expect 200 2000
`;

// Each section of the diff starts with "diff --git". The file path is on its first line, after "b/".
for (const section of diff.split("diff --git ")) {
  if (section.trim() === "") continue;
  const lines = section.split("\n");
  const file = lines[0].match(/b\/(\S+)/)[1];
  const inScope = file.startsWith(allowedPrefix);
  const removedChecks = lines.filter((line) => line.startsWith("-expect")).length;
  console.log(`file ${file}: ${inScope ? "in scope" : "OUT OF SCOPE"}, removed expect lines ${removedChecks}`);
}
