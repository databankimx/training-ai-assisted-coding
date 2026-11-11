// Homework solution (JavaScript): the owner, the amount, and the log are all checked. Each refusal is logged without the card number.

const orders = { 1: { owner: "ana", total: 40 } };

function refund(orderId, user, amount) {
  console.log(`log: refund requested by ${user} for order ${orderId}`);
  if (!(orderId in orders)) return "not found";
  const order = orders[orderId];
  if (order.owner !== user) return "refused";
  if (amount <= 0 || amount > order.total) return "refused";
  order.total = order.total - amount;
  return `refunded ${amount}`;
}

function show(user, orderId, amount) {
  console.log(`${user} refunds order ${orderId} for ${amount}: ${refund(orderId, user, amount)}`);
}

show("ana", 1, 10);
show("ben", 1, 10);
show("ana", 1, -5);
show("ana", 1, 50);
