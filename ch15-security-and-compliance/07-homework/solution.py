# Homework solution (Python): the owner, the amount, and the log are all checked. Each refusal is logged without the card number.

orders = {1: ("ana", 40)}


def refund(order_id, user, amount):
    print(f"log: refund requested by {user} for order {order_id}")
    if order_id not in orders:
        return "not found"
    owner, total = orders[order_id]
    if owner != user:
        return "refused"
    if amount <= 0 or amount > total:
        return "refused"
    orders[order_id] = (owner, total - amount)
    return f"refunded {amount}"


def show(user, order_id, amount):
    print(f"{user} refunds order {order_id} for {amount}: {refund(order_id, user, amount)}")


show("ana", 1, 10)
show("ben", 1, 10)
show("ana", 1, -5)
show("ana", 1, 50)
