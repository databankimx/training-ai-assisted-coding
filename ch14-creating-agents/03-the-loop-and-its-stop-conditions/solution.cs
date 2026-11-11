// Lesson 14-3 solution (C#): the stand-in reports done once the write has succeeded, and the loop stops on it.
using System;
using System.Collections.Generic;

var sandbox = new Dictionary<string, string> { ["fines.txt"] = "cap 2000" };
int stepLimit = 10;
int step = 0;
bool finished = false;

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
        finished = true;
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
        sandbox[argument] = "cap 1800";
        result = "ok";
    }
    Console.WriteLine($"step {step}: {call} -> {result}");
}
Console.WriteLine(finished ? "stopped: model reported done" : $"stopped: step limit ({stepLimit}) reached");
