// Lesson 15-2 starter (JavaScript): an order lookup that checks the caller is signed in, but not that the order is theirs.
// Run it, read each line, then compare with the expected output. Don't fix anything yet.

const orders = { 1: { owner: "ana", total: 40 }, 2: { owner: "ben", total: 75 } };

function getOrder(orderId, user) {
  if (user === null) return "refused"; // the signed-in check
  if (!(orderId in orders)) return "not found";
  return `returned, total ${orders[orderId].total}`; // defect: nothing checks that this order belongs to the user
}

function show(user, orderId) {
  const who = user === null ? "anonymous" : user;
  console.log(`${who} reads order ${orderId}: ${getOrder(orderId, user)}`);
}

show("ana", 1);
show("ben", 1);
show(null, 1);
show("ana", 9);
