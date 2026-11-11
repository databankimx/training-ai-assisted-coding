// Lesson 15-2 solution (C#): the lookup also checks that the order belongs to the caller.
using System;
using System.Collections.Generic;

var orders = new Dictionary<int, (string Owner, int Total)>
{
    [1] = ("ana", 40),
    [2] = ("ben", 75),
};

string GetOrder(int orderId, string? user)
{
    if (user == null) return "refused";
    if (!orders.TryGetValue(orderId, out var order)) return "not found";
    if (order.Owner != user) return "refused";   // the order must belong to the caller
    return $"returned, total {order.Total}";
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
