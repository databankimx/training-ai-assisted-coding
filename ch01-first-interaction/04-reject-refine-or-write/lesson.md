# Reject, Refine, or Write It Yourself

Sometimes the suggestion is wrong. It might miss an edge case, use the wrong loop bound, or solve a slightly different problem. When that happens you have three choices, and the skill is picking the right one quickly.

- **Keep it.** The suggestion is right, or right enough after a small edit you can make yourself.
- **Refine it.** The suggestion has a specific fault. You tell the assistant exactly what to change, and check the new version the same way you checked the first.
- **Reject it and write it yourself.** The suggestion is wrong in a way that's hard to describe, or refining has already failed a few times. You stop asking and type the code.

The mistake to avoid is the fourth choice, the one nobody lists: accepting the suggestion anyway because it's close, and hoping the examples won't catch the difference.

## The suggestion that's wrong

Here is an earlier suggestion for `IsPrime`. It's a simpler loop than the one in the last step, and it has a different fault. It doesn't handle numbers below 2:

~~~examples
```csharp
static bool IsPrime(int n)
{
    for (int i = 2; i < n; i++)
    {
        if (n % i == 0)
        {
            return false;
        }
    }
    return true;
}
```
```python
def is_prime(n):
    for i in range(2, n):
        if n % i == 0:
            return False
    return True
```
```javascript
function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
```
~~~

Run this with the four numbers from the last step, and you get `1 -> prime`. The loop never runs for 1, so the function returns true. Your notes said 1 is not prime, so the function is wrong. The rest of the results are right, which makes the bug easy to miss if you only read the output for 9 and 11.

## Refine with a specific request

The fault is narrow, so a narrow request is the right tool. A good refinement names the problem, states the rule, and limits the change:

```text
IsPrime returns true for 1, but 1 is not prime. Add a check at the start of the function
so that any number below 2 returns false. Keep the loop and everything else unchanged.
Show only the changed function.
```

Notice what the request does. It names the wrong result, the expected result, the place to change, and the parts to leave alone. It's specific enough that you can check the answer quickly. The reply should add an early return and nothing else. If it rewrites the loop or changes the bound, that's a second problem, and you should say so.

Here is the function after the refinement:

~~~examples
```csharp
static bool IsPrime(int n)
{
    if (n < 2)
    {
        return false;
    }

    for (int i = 2; i < n; i++)
    {
        if (n % i == 0)
        {
            return false;
        }
    }
    return true;
}
```
```python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True
```
```javascript
function isPrime(n) {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
```
~~~

This version is correct for the four numbers. It's also slower than it needs to be, because the loop runs up to n instead of the square root of n. That's a separate concern. A refinement that makes one thing right doesn't have to make everything perfect, and a second request can fix speed if speed matters here.

## When to write it yourself

Refining works well when the fault is small. It works poorly when you've asked twice and the answer keeps moving. If two rounds haven't produced a version you can explain, stop asking. The assistant isn't going to have a breakthrough on the next try, and each round costs you the attention you'd spend on the code.

Here is the same fix written by hand, for comparison. It's one extra check, and writing it takes less time than another request would:

~~~examples
```csharp
if (n < 2)
{
    return false;
}
```
```python
if n < 2:
    return False
```
```javascript
if (n < 2) {
  return false;
}
```
~~~

Writing it yourself doesn't make you a worse user of the assistant. It means you've chosen the cheapest route to correct code, and you've kept your understanding of the function, which is what the ownership rule asks for.

## Try it

Open the starter file for this step. It contains the loop above, without the check for numbers below 2. Work through these, in the language you chose:

1. Run the starter, and compare its output with the expected output in the step's details. Which line is wrong, and why?
2. Refine the function with a request like the one above. Write your request in your practice folder, in a file called `refine-request.txt`, before you send it. Then check the reply line by line.
3. Run the step again. The output should read `1 -> not prime`, with the other three lines unchanged.
4. Remove the check you added, and write it yourself instead. Compare your version with the refined one. Are they the same? Which one would you rather explain to a colleague?
5. Write one sentence in your practice folder, in a file called `decision.txt`, explaining which of the three choices you made and why.

When you've finished, press **Show solutions (spoiler)** in the Source tab to compare your code with the worked answers. The solutions open in all three languages, and they stay open the next time you visit this step.

---
