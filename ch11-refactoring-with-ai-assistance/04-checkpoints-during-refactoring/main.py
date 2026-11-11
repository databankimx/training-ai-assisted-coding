# Lesson 11-4 starter (Python): a shipping tier function refactored in three checkpoints, each compared with the original.
# Run it, read each checkpoint, then compare with the expected output. Don't fix anything yet.


# The original. Every checkpoint is compared with this.
def shipping_original(grams):
    if grams > 10000:
        return 1200
    if grams > 5000:
        return 800
    return 500


# Checkpoint 1: rename the parameter only.
def shipping_v1(weight_grams):
    if weight_grams > 10000:
        return 1200
    if weight_grams > 5000:
        return 800
    return 500


# Checkpoint 2: move the tiers into a helper.
def tier_cents(weight_grams):
    return 1200 if weight_grams > 10000 else 800 if weight_grams > 5000 else 500


def shipping_v2(weight_grams):
    return tier_cents(weight_grams)


# Checkpoint 3: the assistant's combined condition. It looks like a tidy rewrite.
def shipping_v3(weight_grams):
    return 1200 if weight_grams >= 10000 else 800 if weight_grams >= 5000 else 500


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
