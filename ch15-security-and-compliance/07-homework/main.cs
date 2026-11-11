// Homework starter (C#): a refund function generated from a short request. Review it, then fix what the review finds.
// Run it, read each line, then compare with the expected output. Don't fix anything yet.
using System;
using System.Collections.Generic;

var orders = new Dictionary<int, (string Owner, int Total)> { [1] = ("ana", 40) };

string Refund(int orderId, string user, int amount)
{
    Console.WriteLine($"log: card 4111111111111111 used by {user} for order {orderId}");   // defect: a card number in the log
    if (!orders.TryGetValue(orderId, out var order)) return "not found";
    // defect: the owner is never checked
    // defect: the amount is never checked against zero or against what is left on the order
    orders[orderId] = (order.Owner, order.Total - amount);
    return $"refunded {amount}";
}

void Show(string user, int orderId, int amount)
{
    Console.WriteLine($"{user} refunds order {orderId} for {amount}: {Refund(orderId, user, amount)}");
}

Show("ana", 1, 10);
Show("ben", 1, 10);
Show("ana", 1, -5);
Show("ana", 1, 50);
