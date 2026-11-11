# Lesson 15-4 starter (Python): a dependency list checked against the license rule. The rule is in the lesson.
# Run it, read each line, then compare with the expected output. Don't fix anything yet.

# The license rule: MIT, Apache-2.0, BSD-3-Clause, and ISC are allowed for closed-source commercial use.
# Anything else needs review before it is added.
allowed_licenses = {"MIT", "Apache-2.0", "BSD-3-Clause", "ISC"}

dependencies = [
    ("highlight.js", "BSD-3-Clause"),
    ("markdown-it", "MIT"),
    ("logging-kit", "Apache-2.0"),
    ("some-parser", "GPL-3.0"),
    ("mystery-lib", ""),
]


# defect: the allow list is never consulted, so every dependency passes
def allowed(license_name):
    return True


for name, license_name in dependencies:
    shown = license_name if license_name else "no license found"
    verdict = "allowed" if allowed(license_name) else "needs review"
    print(f"dependency {name} ({shown}): {verdict}")
