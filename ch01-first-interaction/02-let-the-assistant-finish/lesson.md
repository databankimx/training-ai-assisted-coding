# Let the Assistant Finish a Small Function

The most common way to use an assistant is also the least dramatic. You start writing a function, pause, and the assistant offers the rest of it as grey text. You press Tab to keep it, or keep typing to ignore it. This is called **inline completion**, and it's the lightest surface in the toolbox.

It works because the assistant predicts what comes next. A function name and its parameters tell it a lot. `add(a, b)` almost certainly returns a sum. The prediction is a guess, though, and a good guess. You'll need to decide whether it's right every time.

## What the assistant sees

When you type, the assistant reads the text around your cursor, usually the code above it and the current function. It doesn't know what you meant, only what you've written. That's why a clear name and a clear signature help so much. They are the closest thing to a specification the assistant gets from you in this step.

## Example 1: a function that adds two numbers

Start by typing the signature. Here is the signature in all three languages:

~~~examples
```csharp
static int Add(int a, int b)
{
```
```python
def add(a, b):
```
```javascript
function add(a, b) {
```
~~~

Pause. The assistant should suggest the body, which is one line. Here is what a suggestion looks like in each language:

~~~examples
```csharp
    return a + b;
}
```
```python
    return a + b
```
```javascript
  return a + b;
}
```
~~~

Read the suggestion before you accept it. It's a sum of the two inputs, which is what the name says. Press Tab to keep it.

Now add a line that calls the function, so you can see the result:

~~~examples
```csharp
Console.WriteLine($"2 + 3 = {Add(2, 3)}");
```
```python
print(f"2 + 3 = {add(2, 3)}")
```
```javascript
console.log(`2 + 3 = ${add(2, 3)}`);
```
~~~

Run the program. It prints `2 + 3 = 5`. That's the first check, and it's a good one, because the result is easy to predict before you run it.

## Example 2: finishing a function with a decision in it

The next function returns true when a number is even. This time, type the signature and the first line of the body yourself, so you choose the approach:

~~~examples
```csharp
static bool IsEven(int n)
{
    // The number is even when dividing it by two leaves no remainder.
```
```python
def is_even(n):
    # The number is even when dividing it by two leaves no remainder.
```
```javascript
function isEven(n) {
  // The number is even when dividing it by two leaves no remainder.
```
~~~

Now pause. The assistant should suggest a return statement that checks the remainder. Here is a typical suggestion:

~~~examples
```csharp
    return n % 2 == 0;
}
```
```python
    return n % 2 == 0
```
```javascript
  return n % 2 === 0;
}
```
~~~

Notice what you did here. You wrote the comment, which states the rule in words, and the assistant turned the rule into code. If the comment had been wrong, the suggestion would have followed the comment. The more precisely you describe the behavior, the more likely the suggestion is to match it.

## What Tab means

Tab means "I've read this and I accept it." It doesn't mean "the assistant is probably right." Your editor will accept a suggestion without any further check, so the check has to happen before you press Tab. You can see the suggestion before you accept it, and you can ignore it with Escape, or keep typing. Use that pause.

## Try it

Open the starter file for this step in the runner's Source tab. It has `Add` written for you, and `IsEven` with a placeholder that always returns false. Work through these, in the language you chose:

1. Put your cursor inside `IsEven`, on the line with the placeholder, and let the assistant suggest the body. Read the suggestion, and press Tab only if it does what the comment says.
2. Run the step. The output should read `4 is even` and `7 is odd`.
3. Save your version in your practice folder, as `is-even-ch01.txt` or in your language's file type. Keep it as a record of what you accepted.
4. Ask yourself: what does `IsEven(-4)` return? Predict the answer before you run anything, then check it.
5. Write the suggestion's first line yourself, without the assistant, and compare it with the suggestion. Which one reads more clearly to you?

When you've finished, press **Show solutions (spoiler)** in the Source tab to compare your code with the worked answers. The solutions open in all three languages, and they stay open the next time you visit this step.

---
