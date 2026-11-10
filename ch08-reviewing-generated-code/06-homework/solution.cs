// Homework solution (C#): the three functions with the defects fixed, run by the same harness.
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

static List<int> ParseRetryDelays(string text)
{
    var delays = new List<int>();
    foreach (var part in text.Split(','))
    {
        var trimmed = part.Trim();
        if (!int.TryParse(trimmed, out int delay)) throw new FormatException($"not a number: {trimmed}");
        delays.Add(delay);
    }
    return delays;
}

static Task<int> AgeService(int userId) => Task.FromResult(42);

static async Task<int> GetUserAgeAsync(int userId, CancellationToken token)
{
    token.ThrowIfCancellationRequested();
    return await AgeService(userId);
}

static int ApplyDiscount(int price, int percent)
{
    if (percent < 0 || percent > 100) throw new ArgumentOutOfRangeException(nameof(percent));
    return price - price * percent / 100;
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
