# The Surfaces

A surface is the way you work with the assistant. The same model can power all of them, and the difference lies in what the assistant sees, what it's allowed to change, and how much of the work it does without you. There are five surfaces in common use. Tools will name them differently, and some tools combine several, but the underlying ideas stay the same.

## Completion

Completion is the assistant suggesting the next few lines as you type. It sees the code around your cursor and the file you're in. You accept a suggestion with a key press, or ignore it and keep typing.

Completion is best for small, predictable work: the rest of a loop you've started, a repetitive block that follows a pattern, a call to a method you already know exists. Its risk is speed. Because suggestions arrive while you type, it's easy to accept one without reading it, which is exactly the habit Chapter 1 warned against.

Here is what a completion looks like. The code you've typed is normal, and the suggestion is faded. This faded suggestion is called **ghost text**, because it appears in your file but isn't part of it yet. Each example below is a function that averages a list of numbers, in all three course languages.

~~~examples
```csharp
static double Average(List<double> values)
{
    double total = {{ghost}}values.Sum();
    return total / values.Count;{{/ghost}}
}
```
```python
def average(values):
    total = {{ghost}}sum(values)
    return total / len(values){{/ghost}}
```
```javascript
function average(values) {
  const total = {{ghost}}values.reduce((sum, value) => sum + value, 0);
  return total / values.length;{{/ghost}}
}
```
~~~

The faded text is ghost text, and it's a suggestion. Nothing has changed in your file until you accept it. Accepting is usually one key press. Ignoring the suggestion, or pressing Escape, removes it. Read the ghost text before you press anything.

## Inline edit

Inline edit is selecting a piece of code and asking for a change to it: rename this, convert this loop to a query, add a null check here. The assistant sees the selection and some of the surrounding code, and it returns a proposed replacement you can accept or reject.

This suits a single, well-defined change to code you can already see. Its risk is that the change looks local, but its effects may not be. A rename can break a caller in another file that the assistant never saw.

Here is an inline edit. The code is a calculation over a list of items, and the request is to include the quantity in each line. The faded part is the proposed change, shown as ghost text, and it replaces nothing until you accept it.

~~~examples
```csharp
decimal total = 0;
foreach (var item in items)
{
    total += item.Price{{ghost}} * item.Quantity{{/ghost}};
}
```
```python
total = 0
for item in items:
    total += item.price{{ghost}} * item.quantity{{/ghost}}
```
```javascript
let total = 0;
for (const item of items) {
  total += item.price{{ghost}} * item.quantity{{/ghost}};
}
```
~~~

An inline edit is easier to review than a chat reply, because the change sits in your file where you can read it in context.

### A common use: documentation comments

One of the most useful inline edits is adding documentation comments to a method you've already written. Select the method, and ask for a documentation comment in the style your language uses. The assistant reads the body, so the comment describes what the code does, and you're spared typing the summary, the parameters, and the return value by hand. For many teams, this is one of the largest time savings the assistant offers.

The faded comment below is ghost text: the comment the assistant proposes. The method itself is unchanged.

~~~examples
```csharp
{{ghost}}/// <summary>
/// Returns the mean of the values, or zero when the list is empty.
/// </summary>
/// <param name="values">The numbers to average.</param>
/// <returns>The mean of the values.</returns>{{/ghost}}
static double Average(List<double> values)
{
    if (values.Count == 0) return 0;
    return values.Sum() / values.Count;
}
```
```python
def average(values):
{{ghost}}    """Return the mean of the values, or 0 when the list is empty.

    Args:
        values: The numbers to average.

    Returns:
        The mean of the values, as a float.
    """{{/ghost}}
    if not values:
        return 0
    return sum(values) / len(values)
```
```javascript
{{ghost}}/**
 * Returns the mean of the values, or 0 when the list is empty.
 * @param {number[]} values The numbers to average.
 * @returns {number} The mean of the values.
 */{{/ghost}}
function average(values) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
```
~~~

The comment is a draft, and it needs the same check as any other generated code. The assistant describes the code it sees, and a fluent comment can describe a method that is wrong. Chapter 3, step 4 showed a documented function that returned the wrong answer for negative numbers. An assistant could have written a perfectly tidy comment for that function. Read the comment against the behavior, and check the examples the comment implies, before you accept it.

## Chat question

A chat question is a conversation. You ask about a concept, a library, an error message, or an approach, and the assistant answers in text. You may paste code into the conversation, but the assistant doesn't change your files.

Chat is the best surface for learning, for comparing approaches, and for asking questions you'd otherwise search for. Its risk is that the answer reads as authoritative, and nothing in the surface checks it against your project. Chapter 3 covered that risk in detail.

## Planning

Planning is asking the assistant to propose a plan before it writes anything. You describe a goal and constraints, and it returns steps, a design, a list of files to change, or a draft specification. You review the plan and decide what happens next.

Planning is useful when the task is larger than a single change, and when you want to see the design before the code exists. It also produces something you can keep, such as a spec file, which Chapter 7 relies on. Its risk is that a plan sounds finished. A plan that hasn't been tested against the code is a hypothesis, and it should be treated as one.

## Agentic work

Agentic work is the assistant doing a sequence of steps on its own: reading files, running commands, making changes, running tests, and deciding what to do next based on what it finds. You describe the goal, and the assistant works toward it with a degree of independence.

Agentic work is the most powerful surface, and the one that can do the most damage in the least time. It's right for well-specified tasks with clear checkpoints, and it's wrong for ambiguous tasks, tasks with security or compliance impact, and tasks where you can't review the result afterwards. Chapters 13 and 14 cover it in detail.

## A quick way to tell them apart

Ask two questions. How much of the work does the assistant change without your review? And how much of the project can it see? Completion changes the least and sees the least. Agentic work changes the most and can see the most. The other three sit between them.

> **Aside: why the surfaces differ at all.**
> The model behind each surface is the same kind of model. What differs is the context the tool supplies to it, and the actions the tool lets it take. A completion tool gives the model the lines around your cursor. An agent gives the model a file system, a shell, and a loop. The model is no smarter in one case than the other. It just has more to act on, and more ways to be wrong at scale.

## Try it

Pick three tasks from your own recent work, one small, one medium, and one large. For each, write down the surface you would have used, and one sentence explaining why. Keep the notes in a file called `surfaces.txt` in your practice folder. Don't include any company data in the task descriptions.

---
