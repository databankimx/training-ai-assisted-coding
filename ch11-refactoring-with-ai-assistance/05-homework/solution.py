# Homework solution (Python): the third checkpoint uses the original's rounding through the helper, so all three pass.


def quote_original(grams, member):
    base_cents = (1200 if grams > 10000 else 800 if grams > 5000 else 500) + 25
    if member:
        base_cents = base_cents - base_cents // 10
    return base_cents


def quote_v1(weight_grams, is_member):
    base_cents = (1200 if weight_grams > 10000 else 800 if weight_grams > 5000 else 500) + 25
    if is_member:
        base_cents = base_cents - base_cents // 10
    return base_cents


def member_price(cents):
    return cents - cents // 10


def quote_v2(weight_grams, is_member):
    base_cents = (1200 if weight_grams > 10000 else 800 if weight_grams > 5000 else 500) + 25
    return member_price(base_cents) if is_member else base_cents


# Checkpoint 3, fixed: the discount goes through the helper, which keeps the original's rounding.
def quote_v3(weight_grams, is_member):
    base_cents = (1200 if weight_grams > 10000 else 800 if weight_grams > 5000 else 500) + 25
    return member_price(base_cents) if is_member else base_cents


def checkpoint(name, version):
    cases = [(4999, False), (5000, True), (5001, False), (10000, True), (10001, True)]
    differing = [(g, m) for g, m in cases if version(g, m) != quote_original(g, m)]
    if not differing:
        print(f"checkpoint {name}: pass")
    else:
        g, m = differing[0]
        who = "member" if m else "regular"
        print(f"checkpoint {name}: fail (at {g} g {who}: {version(g, m)}, expected {quote_original(g, m)})")


checkpoint("1 rename", quote_v1)
checkpoint("2 extract discount", quote_v2)
checkpoint("3 combine discount", quote_v3)
