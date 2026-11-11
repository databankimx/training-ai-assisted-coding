// Lesson 14-4 solution (C#): the write goes through an approval gate. The person declines it here, so the file is unchanged and the run stops.
using System;
using System.Collections.Generic;

var sandbox = new Dictionary<string, string> { ["fines.txt"] = "cap 2000" };
int stepLimit = 10;
int step = 0;
bool stoppedAtGate = false;

(string tool, string argument) Propose(int stepNumber) => stepNumber switch
{
    1 => ("list_files", ""),
    2 => ("read_file", "fines.txt"),
    3 => ("write_file", "fines.txt"),
    _ => ("done", ""),
};

// The approval gate. In a real agent this asks a person. Here the answer is fixed, so the example is repeatable.
bool PersonApproves(string call) => false;

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
    else if (!PersonApproves(call))
    {
        result = "needs approval, not written";
        stoppedAtGate = true;
    }
    else
    {
        sandbox[argument] = "cap 1800";
        result = "ok";
    }
    Console.WriteLine($"step {step}: {call} -> {result}");
    if (stoppedAtGate)
    {
        Console.WriteLine("stopped: write needs approval");
        break;
    }
}
