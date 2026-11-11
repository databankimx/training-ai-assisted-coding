// Lesson 14-3 starter (C#): a small agent loop over an in-memory sandbox, driven by a scripted stand-in for the model.
// Run it, read the log, then compare with the expected output. Don't fix anything yet.
using System;
using System.Collections.Generic;

var sandbox = new Dictionary<string, string> { ["fines.txt"] = "cap 2000" };
int stepLimit = 10;
int step = 0;

// The stand-in for the model. It proposes one action per step.
// After the write, it keeps asking to read the file again, and it never says "done".
(string tool, string argument) Propose(int stepNumber) => stepNumber switch
{
    1 => ("list_files", ""),
    2 => ("read_file", "fines.txt"),
    3 => ("write_file", "fines.txt"),
    _ => ("read_file", "fines.txt"),
};

while (step < stepLimit)
{
    step++;
    var (tool, argument) = Propose(step);
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
Console.WriteLine($"stopped: step limit ({stepLimit}) reached");
