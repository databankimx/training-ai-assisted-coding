// Lesson 8-2 starter (C#): checks whether each kind of call exists in this version of the platform.
// Run it, and read each line. Then compare it with the expected output. Don't fix anything yet.
using System;
using System.Collections.Generic;
using System.Net;

var names = new List<string> { "Mira", "Adam", "Chen" };

Console.WriteLine("invented call exists: " + (typeof(List<string>).GetMethod("SortBy") != null).ToString().ToLower());
Console.WriteLine("newer call exists: " + (typeof(Math).GetMethod("Clamp") != null).ToString().ToLower());
Console.WriteLine("deprecated call exists: " + (typeof(WebClient).GetMethod("DownloadString") != null).ToString().ToLower());
