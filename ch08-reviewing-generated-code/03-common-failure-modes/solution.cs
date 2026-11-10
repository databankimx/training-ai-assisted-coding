// Lesson 8-3 solution (C#): the same three cases, with the failures fixed.
using System;
using System.Threading;
using System.Threading.Tasks;

static int ParseCount(string text)
{
    if (!int.TryParse(text, out int count)) throw new FormatException($"not a number: {text}");
    return count;
}

static Task<int> GetValueAsync() => Task.FromResult(42);

static async Task<int> RunStepsAsync(CancellationToken token)
{
    int steps = 0;
    for (int i = 0; i < 3; i++)
    {
        if (token.IsCancellationRequested) break;
        await Task.Delay(1, token);
        steps++;
    }
    return steps;
}

try
{
    Console.WriteLine($"parse abc: {ParseCount("abc")}");
}
catch (FormatException error)
{
    Console.WriteLine($"parse abc: error ({error.Message})");
}

Console.WriteLine($"value: {await GetValueAsync()}");

var cancellation = new CancellationTokenSource();
cancellation.Cancel();
int stepsRun = await RunStepsAsync(cancellation.Token);
Console.WriteLine($"steps after cancel: {stepsRun}");
