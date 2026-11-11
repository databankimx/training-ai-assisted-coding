# Homework starter (Python): a second diff from an agent. Check it against the brief, file by file.
# The brief: scope is src/fines only. Do not edit tests or documentation. Do not change any value.
# Run it, read each line, then review the diff. Don't fix anything yet.
import re

allowed_prefix = "src/fines"

diff = """diff --git a/src/fines.cs b/src/fines.cs
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
"""

for section in diff.split("diff --git "):
    if not section.strip():
        continue
    lines = section.split("\n")
    file = re.search(r"b/(\S+)", lines[0]).group(1)
    in_scope = file.startswith(allowed_prefix)
    removed_checks = sum(1 for line in lines if line.startswith("-expect"))
    print(f"file {file}: {'in scope' if in_scope else 'OUT OF SCOPE'}, removed expect lines {removed_checks}")
