# Lesson 11-4 solution (Python): the third checkpoint keeps the original's boundaries, so all three pass.


def shipping_original(grams):
    if grams > 10000:
        return 1200
    if grams > 5000:
        return 800
    return 500


def shipping_v1(weight_grams):
    if weight_grams > 10000:
        return 1200
    if weight_grams > 5000:
        return 800
    return 500


def tier_cents(weight_grams):
    return 1200 if weight_grams > 10000 else 800 if weight_grams > 5000 else 500


def shipping_v2(weight_grams):
    return tier_cents(weight_grams)


# Checkpoint 3, corrected: the boundaries stay strictly greater than, as in the original.
def shipping_v3(weight_grams):
    cents = 1200 if weight_grams > 10000 else 800 if weight_grams > 5000 else 500
    return cents


def checkpoint(name, version):
    cases = [4999, 5000, 5001, 10000, 10001]
    differing = [g for g in cases if version(g) != shipping_original(g)]
    if not differing:
        print(f"checkpoint {name}: pass")
    else:
        g = differing[0]
        print(f"checkpoint {name}: fail (at {g} g: {version(g)}, expected {shipping_original(g)})")


checkpoint("1 rename", shipping_v1)
checkpoint("2 extract tiers", shipping_v2)
checkpoint("3 combine conditions", shipping_v3)
