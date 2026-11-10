# Common Failure Modes

Generated code fails in a small number of recurring ways. They're not random. Each one comes from a habit that appears in a large amount of public code, and each one is the sort of thing that passes a quick read. Learning the list makes the review faster, because you know where to look.

This step covers five of the most common failure modes, with an example of each in the three course languages. For each one, the example shows the failure, and the claim a reviewer would write.

## Broad exception handling

The code catches every error and carries on as if nothing happened. The failure is silent, and the caller receives a value that looks valid.

~~~examples
```csharp
public static int ParseCount(string text)
{
    try
    {
        return int.Parse(text);
    }
    catch (Exception)
    {
        return 0;
    }
}
```
```python
def parse_count(text):
    try:
        return int(text)
    except Exception:
        return 0
```
```javascript
function parseCount(text) {
  try {
    return parseInt(text, 10);
  } catch (error) {
    return 0;
  }
}
```
~~~

The claim: an unparseable count returns zero, so bad input looks like a count of nothing. In JavaScript the `try` is also misleading, because `parseInt` doesn't throw for bad input. It returns `NaN`, and the catch never runs. Read each language's behavior, not only the shape of the code.

## Blocking on asynchronous work

The code waits for an asynchronous operation in a way that blocks a thread, or it forgets to wait at all. The result can deadlock, slow an application, or return a promise where a value was expected.

~~~examples
```csharp
// Blocks the calling thread. In a UI or an ASP.NET request, this can deadlock.
public static string GetName(int id)
{
    return FetchNameAsync(id).Result;
}
```
```python
async def get_name(user_id):
    # asyncio.run() can't be called from inside a running event loop.
    return asyncio.run(fetch_name(user_id))
```
```javascript
async function getName(id) {
  // Missing await: name is a Promise, not a string.
  const name = fetchName(id);
  return name.toUpperCase();
}
```
~~~

The claim for each: the method blocks or misuses the asynchronous call, and a caller that runs it in the wrong context will fail. The JavaScript version is the quietest. `toUpperCase` doesn't exist on a promise, so it fails at runtime, but only on the path that runs it.

## Ignored cancellation

The method accepts a way to be cancelled, and then doesn't use it. A caller that cancels the work gets no response, and the work keeps running.

~~~examples
```csharp
public static async Task DownloadAsync(string url, CancellationToken token)
{
    var client = new HttpClient();
    var text = await client.GetStringAsync(url);   // token is never passed on.
    await Task.Delay(1000);                          // and neither is this.
}
```
```python
async def download(url, cancel_event):
    # cancel_event is accepted and never checked.
    while True:
        await asyncio.sleep(1)
        print("still working")
```
```javascript
async function download(url, signal) {
  // signal is accepted, and never passed to fetch or checked.
  const response = await fetch(url);
  return response.text();
}
```
~~~

The claim: the cancellation parameter is accepted but not honored, so a cancelled caller can't stop the work. Each version looks complete, because it has the parameter in its signature. The reviewer's question is whether the parameter reaches the calls that wait.

## Hardcoded values

The code contains a value that belongs in configuration: a connection string, an address, a timeout, a key. Generated code does this often, because the most common examples in public code are written with literal values.

~~~examples
```csharp
const string ConnectionString = "Server=db01;Database=orders;User Id=app;Password=secret123;";
const int TimeoutSeconds = 30;
```
```python
DATABASE_URL = "postgresql://app:secret123@db01:5432/orders"
TIMEOUT_SECONDS = 30
```
```javascript
const DATABASE_URL = "postgresql://app:secret123@db01:5432/orders";
const TIMEOUT_SECONDS = 30;
```
~~~

The claim: a credential and a server address are in source code, where they will be committed and shared, and the timeout can't be changed without a code change. The reviewer's check is whether any value that's specific to an environment or a secret has been written into the file. Chapter 2 covers why the credential is the more serious finding.

## Unnecessary complexity

The code is correct, and much longer or more layered than the task needs. The extra structure hides the one line that matters, and it adds places for defects to hide.

~~~examples
```csharp
// Correct, but a class hierarchy for a single check.
public interface INumberChecker { bool Check(int n); }
public class EvenChecker : INumberChecker { public bool Check(int n) => n % 2 == 0; }
public class NumberCheckerFactory
{
    public INumberChecker Create() => new EvenChecker();
}
```
```python
# Correct, but a class for a single check.
class EvenChecker:
    def check(self, n):
        return n % 2 == 0

class EvenCheckerFactory:
    def create(self):
        return EvenChecker()
```
```javascript
// Correct, but a factory for a single check.
class EvenChecker {
  check(n) {
    return n % 2 === 0;
  }
}

class EvenCheckerFactory {
  create() {
    return new EvenChecker();
  }
}
```
~~~

The claim: the task is a single even-number check, and the code adds a factory and an interface around it. Nothing in the output is wrong, which is why the review has to ask whether the structure earns its place. A reviewer who accepts the structure because it looks professional has skipped the question.

> **Aside: why these five come up so often.**
> Each failure mode is common in public code, and each one is easy to copy without a reason. Broad catches appear in tutorials that want a short example. Blocking calls appear in older code written before the asynchronous version existed. Hardcoded values appear in every quick demonstration. Complexity appears in code written to look like a framework. An assistant that learned from that code reproduces the patterns, and a reviewer who knows the patterns can see them.

## Write each one as a claim

Each failure mode becomes a claim when you apply it to the code in front of you. The claim names the condition, the behavior, and the rule. Here are the five, written as claims.

> Broad handling: when the input can't be parsed, the method returns zero, so bad input looks valid.
>
> Blocking: the method waits on an asynchronous call in a way that can deadlock in a UI or request context.
>
> Cancellation: the method accepts a cancellation signal and doesn't pass it to the calls that wait.
>
> Hardcoded values: a credential and an address are in source code, and the timeout can't be configured.
>
> Complexity: a factory and an interface wrap a single check, and the structure adds nothing the task needs.

## Run it

The starter runs three cases, one for each failure mode that a program can show: a broad catch that hides a bad input, a missing `await` (or a blocked call in C#), and a cancellation signal that the work ignores. Press **Run** (or F5) and read each line.

The first line shows the broad catch returning a value for `abc`, instead of reporting the error. In JavaScript, `parseInt` doesn't throw at all, so the catch never runs and the result is `NaN`. The second line shows the missing `await` in JavaScript, and the nested run in Python that fails inside a running event loop. In C#, the blocking call prints the right value in a console program, which is why the blocking risk is described in the text and not in this case: it shows up in a UI or request context, not in a console program. The third line shows the cancelled work running all three steps anyway.

The expected output is what the solution produces. Press **Check** on the starter to see the mismatches, then press **Run** on the solution.

Two of the five failure modes don't make a runnable case, and that's a finding, not an omission. Hardcoded values and needless complexity are about where a value lives and how much structure a task needs. A test can't tell you whether a timeout belongs in configuration. A reviewer answers that, using the checklist.

> **A note on the code.** The starter and solution were written by hand to show the cases. They aren't a record of what any assistant produced. Use this step to see what each failure looks like when it runs, not as a guide to what a particular tool does.

## Try it

For each of the five failure modes, find a piece of code you've written or read recently, and check whether it shows the pattern. If it does, write the claim in the form above. If it doesn't, write one sentence on why. Save your notes in a file called `failure-modes.txt` in your practice folder.

---
