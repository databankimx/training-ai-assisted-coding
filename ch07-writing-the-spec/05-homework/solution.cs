// Homework solution (C#): the parser fixed to the spec. Every acceptance row passes.
using System;
using System.Collections.Generic;
using System.Linq;

static Dictionary<string, string> ParseSettings(string line)
{
    var settings = new Dictionary<string, string>();
    foreach (var raw in line.Split(';'))
    {
        var segment = raw.Trim();
        if (segment == "") continue;
        int equals = segment.IndexOf('=');
        if (equals < 0) throw new FormatException("no equals sign");
        var name = segment.Substring(0, equals).Trim();
        if (name == "") throw new FormatException("empty name");
        if (settings.ContainsKey(name)) throw new FormatException("duplicate name");
        settings[name] = segment.Substring(equals + 1).Trim();
    }
    return settings;
}

static string FormatSettings(Dictionary<string, string> settings)
{
    if (settings.Count == 0) return "(none)";
    return string.Join(", ", settings.OrderBy(kv => kv.Key, StringComparer.Ordinal).Select(kv => kv.Key + "=" + kv.Value));
}

static void Check(string input, string expected)
{
    string actual;
    try
    {
        actual = FormatSettings(ParseSettings(input));
    }
    catch (Exception)
    {
        actual = "error";
    }
    string status = actual == expected ? "pass" : $"fail (expected {expected})";
    Console.WriteLine($"\"{input}\" -> {actual} {status}");
}

Check("name=archive", "name=archive");
Check("name=archive;", "name=archive");
Check("name = archive ; enabled = true", "enabled=true, name=archive");
Check("url=a=b", "url=a=b");
Check("name=", "name=");
Check("", "(none)");
Check("name", "error");
Check("=archive", "error");
Check("name=a; name=b", "error");
Check(";;name=x;;", "name=x");
