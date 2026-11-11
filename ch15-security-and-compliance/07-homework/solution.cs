// Homework solution (C#): the owner, the amount, and the log are all checked. Each refusal is logged without the card number.
using System;
using System.Collections.Generic;

var orders = new Dictionary<int, (string Owner, int Total)> { [1] = ("ana", 40) };

string Refund(int orderId, string user, int amount)
{
    Console.WriteLine($"log: refund requested by {user} for order {orderId}");
    if (!orders.TryGetValue(orderId, out var order)) return "not found";
    if (order.Owner != user) return "refused";
    if (amount <= 0 || amount > order.Total) return "refused";
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
