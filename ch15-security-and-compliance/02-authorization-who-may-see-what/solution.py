# Lesson 15-2 solution (Python): the lookup also checks that the order belongs to the caller.

orders = {1: ("ana", 40), 2: ("ben", 75)}


def get_order(order_id, user):
    if user is None:
        return "refused"
    if order_id not in orders:
        return "not found"
    owner, total = orders[order_id]
    if owner != user:
        return "refused"  # the order must belong to the caller
    return f"returned, total {total}"


def show(user, order_id):
    who = "anonymous" if user is None else user
    print(f"{who} reads order {order_id}: {get_order(order_id, user)}")


show("ana", 1)
show("ben", 1)
show(None, 1)
show("ana", 9)
