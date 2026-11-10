// Lesson 8-1 solution (C#): the loader with the three claims fixed.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

static Dictionary<string, string> LoadSettings(string path)
{
    if (!File.Exists(path)) throw new FileNotFoundException("file not found", path);
    var settings = new Dictionary<string, string>();
    int lineNumber = 0;
    foreach (var line in File.ReadAllLines(path))
    {
        lineNumber++;
        int equals = line.IndexOf('=');
        if (equals < 0) throw new FormatException($"line {lineNumber} has no equals sign");
        settings[line.Substring(0, equals)] = line.Substring(equals + 1);
    }
    return settings;
}

File.WriteAllText("malformed.txt", "name=archive\nbroken line");
File.WriteAllText("equals.txt", "url=a=b");

try
{
    LoadSettings("missing.txt");
    Console.WriteLine("missing: no error");
}
catch (FileNotFoundException error)
{
    Console.WriteLine($"missing: error ({error.Message})");
}

try
{
    LoadSettings("malformed.txt");
    Console.WriteLine("malformed: no error");
}
catch (FormatException error)
{
    Console.WriteLine($"malformed: error ({error.Message})");
}

var equals = LoadSettings("equals.txt");
Console.WriteLine("equals: " + string.Join(", ", equals.Select(kv => kv.Key + "=" + kv.Value)));
