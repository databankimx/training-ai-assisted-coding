// Lesson 14-4 starter (C#): the same agent loop, with a write that goes through without any approval.
// Run it, read the log, then compare with the expected output. Don't fix anything yet.
using System;
using System.Collections.Generic;

var sandbox = new Dictionary<string, string> { ["fines.txt"] = "cap 2000" };
int stepLimit = 10;
int step = 0;

(string tool, string argument) Propose(int stepNumber) => stepNumber switch
{
    1 => ("list_files", ""),
    2 => ("read_file", "fines.txt"),
    3 => ("write_file", "fines.txt"),
    _ => ("done", ""),
};

while (step < stepLimit)
{
    step++;
    var (tool, argument) = Propose(step);
    if (tool == "done")
    {
        Console.WriteLine($"step {step}: done");
        Console.WriteLine("stopped: model reported done");
        break;
    }
    string call = argument == "" ? tool : $"{tool} {argument}";
    string result;
    if (tool == "list_files")
    {
        result = string.Join(", ", sandbox.Keys);
    }
    else if (tool == "read_file")
    {
        result = sandbox.TryGetValue(argument, out var text) ? text : "missing";
    }
    else
    {
        // No check here: the write happens whatever the model proposed.
        sandbox[argument] = "cap 1800";
        result = "ok (no approval asked)";
    }
    Console.WriteLine($"step {step}: {call} -> {result}");
}
