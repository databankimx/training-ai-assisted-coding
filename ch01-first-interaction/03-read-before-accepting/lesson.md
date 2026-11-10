# Read Before You Accept

In the last step, the suggestions were small enough to check by eye. This step asks for a little more: a function with a loop, a few edge cases, and a suggestion that looks right at a glance. The habit you're building is simple to state and harder to keep. Before you press Tab, you write down what the function should return for a few inputs, and you check the suggestion against those answers.

Write the examples first. An example is an input with the output you expect. If you write them after you've seen the suggestion, you'll tend to expect whatever the suggestion gives you, and the check becomes a formality.

## Start with examples

The function you'll check is `IsPrime`, which returns true when a number has no divisors other than 1 and itself. Before you look at any suggestion, write these expectations in a notes file:

```text
1  -> not prime   (1 is not prime, by definition)
2  -> prime       (the smallest prime)
9  -> not prime   (3 times 3)
11 -> prime
```

Those four lines cover the edge cases that catch careless code: the number 1, the first prime, a square of an odd prime, and an ordinary prime. Notice that you decided the answer for 1 before you saw any code. That decision is what makes the check meaningful.

## The suggestion

Here is a typical suggestion for `IsPrime`, after you've typed the signature and a short comment:

~~~examples
```csharp
static bool IsPrime(int n)
{
    // Check whether any number from 2 up to the square root divides n.
    if (n < 2)
    {
        return false;
    }

    for (int i = 2; i * i <= n; i++)
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
    # Check whether any number from 2 up to the square root divides n.
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True
```
```javascript
function isPrime(n) {
  // Check whether any number from 2 up to the square root divides n.
  if (n < 2) {
    return false;
  }
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
```
~~~

Before you accept it, do three things. First, read the condition at the top: `n < 2` returns false, which matches your expectation for 1. Second, read the loop bound: `i * i <= n` stops at the square root, which is enough, because a larger divisor would have a smaller partner. Third, trace one example by hand. For 9, the loop tries 2 (no remainder) and then 3 (remainder zero), so it returns false.

Now the check. Here is the output you should see when the function is called with 1, 2, 9, and 11:

```text
1 -> not prime
2 -> prime
9 -> not prime
11 -> prime
```

If the output matches your notes, the suggestion passes the examples you wrote. That's evidence, not proof, and you'd add more examples before relying on it in real work. For this step, four is enough to show the habit.

## What a careless accept looks like

Suppose the assistant had suggested something shorter:

~~~examples
```csharp
static bool IsPrime(int n)
{
    return true;
}
```
```python
def is_prime(n):
    return True
```
```javascript
function isPrime(n) {
  return true;
}
```
~~~

This is not a real suggestion you'd see from a capable assistant, but it's exactly what a placeholder looks like, and the starter file for this step has one. If you accepted it and ran the four examples, you'd see `1 -> prime` and `9 -> prime`. Both lines disagree with your notes. The disagreement is the point of the check. Without the notes, you'd have no way to tell that anything was wrong.

## Try it

Open the starter file for this step. The function `IsPrime` returns true for every number, and the test loop prints four results. Work through these, in the language you chose:

1. Run the starter, and compare its output with your notes. Which lines disagree?
2. Replace the placeholder with the suggestion above, or with your own version. Run it again. The output should match the expected result for all four numbers.
3. Add two examples to your notes that the suggestion might get wrong. Try 0 and 25, or your own choices. Write what you expect before you run anything.
4. Run the test loop with your two new numbers. Did the function agree with your expectations? If it didn't, who is right, you or the function? Work it out on paper before you change anything.
5. Save your notes in your practice folder, next to your code.

When you've finished, press **Show solutions (spoiler)** in the Source tab to compare your code with the worked answers. The solutions open in all three languages, and they stay open the next time you visit this step.

---
