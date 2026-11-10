# Homework starter (Python): a generated settings parser, checked against ten acceptance rows.
# Run it, read each row, then review the parser. Don't fix anything yet.


def parse_settings(line):
    settings = {}
    for segment in line.split(";"):
        if segment == "":
            continue
        parts = segment.split("=")
        settings[parts[0]] = parts[1]  # no trim, no duplicate check, splits on every equals sign
    return settings


def format_settings(settings):
    if not settings:
        return "(none)"
    return ", ".join(f"{key}={value}" for key, value in sorted(settings.items()))


def check(text, expected):
    try:
        actual = format_settings(parse_settings(text))
    except Exception:
        actual = "error"
    status = "pass" if actual == expected else f"fail (expected {expected})"
    print(f'"{text}" -> {actual} {status}')


check("name=archive", "name=archive")
check("name=archive;", "name=archive")
check("name = archive ; enabled = true", "enabled=true, name=archive")
check("url=a=b", "url=a=b")
check("name=", "name=")
check("", "(none)")
check("name", "error")
check("=archive", "error")
check("name=a; name=b", "error")
check(";;name=x;;", "name=x")
