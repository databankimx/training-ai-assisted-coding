// Lesson 8-1 starter (C#): the settings loader from the reading step, run against three cases.
// Run it, and compare each line with the expected output. Don't fix anything yet.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

static Dictionary<string, string> LoadSettings(string path)
{
    try
    {
        var settings = new Dictionary<string, string>();
        foreach (var line in File.ReadAllLines(path))
        {
            var parts = line.Split('=');
            settings[parts[0]] = parts[1];
        }
        return settings;
    }
    catch (Exception)
    {
        return new Dictionary<string, string>();
    }
}

File.WriteAllText("malformed.txt", "name=archive\nbroken line");
File.WriteAllText("equals.txt", "url=a=b");

var missing = LoadSettings("missing.txt");
Console.WriteLine($"missing: {missing.Count} settings");

var malformed = LoadSettings("malformed.txt");
Console.WriteLine($"malformed: {malformed.Count} settings");

var equals = LoadSettings("equals.txt");
Console.WriteLine("equals: " + string.Join(", ", equals.Select(kv => kv.Key + "=" + kv.Value)));
