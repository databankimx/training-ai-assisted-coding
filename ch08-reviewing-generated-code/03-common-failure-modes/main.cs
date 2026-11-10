// Lesson 8-3 starter (C#): three common failure modes, each run as a case.
// Run it, and compare each line with the expected output. Don't fix anything yet.
using System;
using System.Threading;
using System.Threading.Tasks;

static int ParseCount(string text)
{
    try
    {
        return int.Parse(text);
    }
    catch (Exception)
    {
        return 0;
    }
}

static Task<int> GetValueAsync() => Task.FromResult(42);

static async Task<int> RunStepsAsync(CancellationToken token)
{
    int steps = 0;
    for (int i = 0; i < 3; i++)
    {
        await Task.Delay(1);   // the token is never checked
        steps++;
    }
    return steps;
}

Console.WriteLine($"parse abc: {ParseCount("abc")}");
Console.WriteLine($"value: {GetValueAsync().Result}");

var cancellation = new CancellationTokenSource();
cancellation.Cancel();
int stepsRun = await RunStepsAsync(cancellation.Token);
Console.WriteLine($"steps after cancel: {stepsRun}");
