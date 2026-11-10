// Homework starter (C#): three generated functions and the harness that tests them against the spec.
// Run it, read each row, then review the functions. Don't fix anything yet.
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

static List<int> ParseRetryDelays(string text)
{
    try
    {
        var delays = new List<int>();
        foreach (var part in text.Split(','))
        {
            delays.Add(int.Parse(part));
        }
        return delays;
    }
    catch (Exception)
    {
        return new List<int>();
    }
}

static Task<int> AgeService(int userId) => Task.FromResult(42);

static async Task<int> GetUserAgeAsync(int userId, CancellationToken token)
{
    return await AgeService(userId);   // the token is accepted and never used
}

static double ApplyDiscount(double price, double percent)
{
    double discounted = price - price * percent;   // percent treated as a fraction
    return discounted * 1.0825;                    // tax hardcoded, floating point
}

static string Show(Func<List<int>> action)
{
    try
    {
        return string.Join(" ", action());
    }
    catch (Exception)
    {
        return "error";
    }
}

Console.WriteLine($"retry \"100, 200, 400\": {Show(() => ParseRetryDelays("100, 200, 400"))}");
Console.WriteLine($"retry \"100, abc\": {Show(() => ParseRetryDelays("100, abc"))}");
Console.WriteLine($"retry \"100, 200,\": {Show(() => ParseRetryDelays("100, 200,"))}");

Console.WriteLine($"user age normal: {await GetUserAgeAsync(1, CancellationToken.None)}");
var cancelled = new CancellationTokenSource();
cancelled.Cancel();
try
{
    Console.WriteLine($"user age cancelled: {await GetUserAgeAsync(1, cancelled.Token)}");
}
catch (OperationCanceledException)
{
    Console.WriteLine("user age cancelled: cancelled");
}

Console.WriteLine($"discount 1000 at 10: {ApplyDiscount(1000, 10)}");
Console.WriteLine($"discount 1000 at 0: {ApplyDiscount(1000, 0)}");
Console.WriteLine($"discount 1000 at 100: {ApplyDiscount(1000, 100)}");
