// Homework solution (C#): the agent with the spec's step limit, log format, and approval gate.
using System;
using System.Collections.Generic;

var sandbox = new Dictionary<string, string>
{
    ["notes.txt"] = "keep this",
    ["temp.txt"] = "scratch",
};
int stepLimit = 5;
int step = 0;
bool stoppedAtGate = false;

(string tool, string argument) Propose(int stepNumber) => stepNumber switch
{
    1 => ("list_files", ""),
    2 => ("read_file", "notes.txt"),
    _ => ("delete_file", "temp.txt"),
};

// The approval gate for deletes. A person answers it. Here the answer is fixed, so the example is repeatable.
bool PersonApproves(string call) => false;

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
    else if (!PersonApproves(call))
    {
        result = "needs approval, not deleted";
        stoppedAtGate = true;
    }
    else
    {
        result = sandbox.Remove(argument) ? "deleted" : "missing";
    }
    Console.WriteLine($"[{step}] {call} -> {result}");
    if (stoppedAtGate)
    {
        Console.WriteLine("stopped: delete needs approval");
        break;
    }
}
