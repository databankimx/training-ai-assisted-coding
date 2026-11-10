// Homework starter (C#): a generated settings parser, checked against ten acceptance rows.
// Run it, read each row, then review the parser. Don't fix anything yet.
using System;
using System.Collections.Generic;
using System.Linq;

static Dictionary<string, string> ParseSettings(string line)
{
    var settings = new Dictionary<string, string>();
    foreach (var segment in line.Split(';'))
    {
        if (segment == "") continue;
        var parts = segment.Split('=');
        settings[parts[0]] = parts[1];   // no trim, no duplicate check, splits on every equals sign
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
