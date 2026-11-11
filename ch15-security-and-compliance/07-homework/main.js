// Homework starter (JavaScript): a refund function generated from a short request. Review it, then fix what the review finds.
// Run it, read each line, then compare with the expected output. Don't fix anything yet.

const orders = { 1: { owner: "ana", total: 40 } };

function refund(orderId, user, amount) {
  console.log(`log: card 4111111111111111 used by ${user} for order ${orderId}`); // defect: a card number in the log
  if (!(orderId in orders)) return "not found";
  const order = orders[orderId];
  // defect: the owner is never checked
  // defect: the amount is never checked against zero or against what is left on the order
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
