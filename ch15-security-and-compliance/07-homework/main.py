# Homework starter (Python): a refund function generated from a short request. Review it, then fix what the review finds.
# Run it, read each line, then compare with the expected output. Don't fix anything yet.

orders = {1: ("ana", 40)}


def refund(order_id, user, amount):
    print(f"log: card 4111111111111111 used by {user} for order {order_id}")  # defect: a card number in the log
    if order_id not in orders:
        return "not found"
    owner, total = orders[order_id]
    # defect: the owner is never checked
    # defect: the amount is never checked against zero or against what is left on the order
    orders[order_id] = (owner, total - amount)
    return f"refunded {amount}"


def show(user, order_id, amount):
    print(f"{user} refunds order {order_id} for {amount}: {refund(order_id, user, amount)}")


show("ana", 1, 10)
show("ben", 1, 10)
show("ana", 1, -5)
show("ana", 1, 50)
