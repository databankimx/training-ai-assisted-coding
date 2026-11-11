// Homework starter (C#): a small agent built from a spec, with three defects against the spec.
// The spec: step limit 5. Each log line is "[n] call -> result". A delete needs a person's approval, and the run stops when the approval is declined.
// Run it, compare each line with the spec, then fix the defects. Don't fix anything yet.
using System;
using System.Collections.Generic;

var sandbox = new Dictionary<string, string>
{
    ["notes.txt"] = "keep this",
    ["temp.txt"] = "scratch",
};
int stepLimit = 20;   // defect: the spec says 5
int step = 0;

(string tool, string argument) Propose(int stepNumber) => stepNumber switch
{
    1 => ("list_files", ""),
    2 => ("read_file", "notes.txt"),
    _ => ("delete_file", "temp.txt"),
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
        // defect: the delete runs without asking a person
        result = sandbox.Remove(argument) ? "deleted (no approval asked)" : "missing";
    }
    Console.WriteLine($"step {step}: {call} -> {result}");   // defect: the log format is not the spec's
}
Console.WriteLine($"stopped: step limit ({stepLimit}) reached");
