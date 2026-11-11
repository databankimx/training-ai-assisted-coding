# Lesson 13-4 starter (Python): a diff produced by an agent, checked for scope and for removed checks.
# Run it, read each line, then compare with the expected output. Don't fix anything yet.
import re

allowed_prefix = "src/fines"

diff = """diff --git a/src/fines.cs b/src/fines.cs
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
"""

# Each section of the diff starts with "diff --git". The file path is on its first line, after "b/".
for section in diff.split("diff --git "):
    if not section.strip():
        continue
    lines = section.split("\n")
    file = re.search(r"b/(\S+)", lines[0]).group(1)
    in_scope = file.startswith(allowed_prefix)
    removed_checks = sum(1 for line in lines if line.startswith("-expect"))
    print(f"file {file}: {'in scope' if in_scope else 'OUT OF SCOPE'}, removed expect lines {removed_checks}")
