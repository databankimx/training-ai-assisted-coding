# Homework solution (Python): the agent's change is reduced to the brief. The comment stays, and the value and the other files are reverted.
import re

allowed_prefix = "src/fines"

diff = """diff --git a/src/fines.cs b/src/fines.cs
--- a/src/fines.cs
+++ b/src/fines.cs
@@ -1,2 +1,3 @@
-    int cap = 2000;
+    // The cap is in cents, and it applies after the free days.
+    int cap = 2000;
"""

for section in diff.split("diff --git "):
    if not section.strip():
        continue
    lines = section.split("\n")
    file = re.search(r"b/(\S+)", lines[0]).group(1)
    in_scope = file.startswith(allowed_prefix)
    removed_checks = sum(1 for line in lines if line.startswith("-expect"))
    print(f"file {file}: {'in scope' if in_scope else 'OUT OF SCOPE'}, removed expect lines {removed_checks}")
