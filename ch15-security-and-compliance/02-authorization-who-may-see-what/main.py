# Lesson 15-2 starter (Python): an order lookup that checks the caller is signed in, but not that the order is theirs.
# Run it, read each line, then compare with the expected output. Don't fix anything yet.

orders = {1: ("ana", 40), 2: ("ben", 75)}


def get_order(order_id, user):
    if user is None:
        return "refused"  # the signed-in check
    if order_id not in orders:
        return "not found"
    total = orders[order_id][1]
    return f"returned, total {total}"  # defect: nothing checks that this order belongs to the user


def show(user, order_id):
    who = "anonymous" if user is None else user
    print(f"{who} reads order {order_id}: {get_order(order_id, user)}")


show("ana", 1)
show("ben", 1)
show(None, 1)
show("ana", 9)
