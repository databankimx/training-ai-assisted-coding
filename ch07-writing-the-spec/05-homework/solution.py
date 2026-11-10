# Homework solution (Python): the parser fixed to the spec. Every acceptance row passes.


def parse_settings(line):
    settings = {}
    for raw in line.split(";"):
        segment = raw.strip()
        if segment == "":
            continue
        equals = segment.find("=")
        if equals < 0:
            raise ValueError("no equals sign")
        name = segment[:equals].strip()
        if name == "":
            raise ValueError("empty name")
        if name in settings:
            raise ValueError("duplicate name")
        settings[name] = segment[equals + 1:].strip()
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
