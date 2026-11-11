// Lesson 15-2 solution (JavaScript): the lookup also checks that the order belongs to the caller.

const orders = { 1: { owner: "ana", total: 40 }, 2: { owner: "ben", total: 75 } };

function getOrder(orderId, user) {
  if (user === null) return "refused";
  if (!(orderId in orders)) return "not found";
  const order = orders[orderId];
  if (order.owner !== user) return "refused"; // the order must belong to the caller
  return `returned, total ${order.total}`;
}

function show(user, orderId) {
  const who = user === null ? "anonymous" : user;
  console.log(`${who} reads order ${orderId}: ${getOrder(orderId, user)}`);
}

show("ana", 1);
show("ben", 1);
show(null, 1);
show("ana", 9);
