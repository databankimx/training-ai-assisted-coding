// Lesson 15-2 starter (C#): an order lookup that checks the caller is signed in, but not that the order is theirs.
// Run it, read each line, then compare with the expected output. Don't fix anything yet.
using System;
using System.Collections.Generic;

var orders = new Dictionary<int, (string Owner, int Total)>
{
    [1] = ("ana", 40),
    [2] = ("ben", 75),
};

string GetOrder(int orderId, string? user)
{
    if (user == null) return "refused";          // the signed-in check
    if (!orders.TryGetValue(orderId, out var order)) return "not found";
    return $"returned, total {order.Total}";     // defect: nothing checks that this order belongs to the user
}

void Show(string? user, int orderId)
{
    string who = user ?? "anonymous";
    Console.WriteLine($"{who} reads order {orderId}: {GetOrder(orderId, user)}");
}

Show("ana", 1);
Show("ben", 1);
Show(null, 1);
Show("ana", 9);
