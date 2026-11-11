# Lesson 15-4 solution (Python): the allow list is applied, and each dependency that needs review gives its reason.

allowed_licenses = {"MIT", "Apache-2.0", "BSD-3-Clause", "ISC"}

dependencies = [
    ("highlight.js", "BSD-3-Clause"),
    ("markdown-it", "MIT"),
    ("logging-kit", "Apache-2.0"),
    ("some-parser", "GPL-3.0"),
    ("mystery-lib", ""),
]


def verdict(license_name):
    if not license_name:
        return "needs review, no license found"
    if license_name in allowed_licenses:
        return "allowed"
    return "needs review, not on the allow list"


for name, license_name in dependencies:
    shown = license_name if license_name else "no license found"
    print(f"dependency {name} ({shown}): {verdict(license_name)}")
