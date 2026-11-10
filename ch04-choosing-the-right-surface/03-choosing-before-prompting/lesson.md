# Choosing Before Prompting

Most people choose a surface by habit. They open the tool they use most and start typing. Habit is fast, and it's right often enough to feel safe, which is the problem. The cases where habit fails are the expensive ones: a large change made in a chat window, where nobody sees the diff, or a question answered by an agent that could have been answered in ten seconds.

This step gives you a short set of questions to answer before you write anything. The answers point to a surface. You don't have to be precise. You have to be honest about what you know.

## Five questions

Answer these in order, in a few words each.

1. **How big is the change?** One line, one function, one file, several files, or a whole feature?
2. **Can you see the code it affects?** If you can see all of it, a surface that works on what you show it is enough. If the change reaches code you can't see, you need a surface that can read more of the project.
3. **How will you check the result?** If a test or a quick run can check it, the surface can be fast. If the check is a careful review, the surface should produce something reviewable, such as a plan or a diff, not a finished change.
4. **How sensitive is the data and the code?** Customer data, credentials, client code, and product code change the answer. Chapter 2 covers the classification. Sensitive material may rule out a surface entirely, or require an approved tool with the right account.
5. **How easy is it to undo?** A change you can revert in a second is safer to delegate than one that touches a database, a deployment, or a client's environment.

## Reading the answers

The pattern is simple, and it's a guide, not a formula.

If the change is small, you can see the code, you can check it quickly, the data isn't sensitive, and it's easy to undo, completion or inline edit is the right surface. If the change is a question rather than a change, chat is right. If the change is large, or you can't yet see the design, planning comes first, and the plan becomes the input to whatever surface comes next.

Agentic work is right when the task is well specified, the checkpoints are clear, the data is not sensitive, and the result can be reviewed in full afterwards. When any of those isn't true, agentic work is the wrong choice, however impressive the demonstration.

## The order matters

Answer the questions before you open the tool. Once you've started typing into a surface, you've already made the choice, and the answers become a justification after the fact. That's the habit this step is trying to break.

It also helps to write the answers down. A short note, kept beside the work, shows what you expected, and it makes the review later easier. It also lets you notice when a task turned out bigger than you thought, which is a sign to change surface partway through.

## Try it

Take a task you're likely to do in the next week. Write the five answers in a file called `choose-first.txt` in your practice folder, without any company data in the task description. Then write the surface you'd choose, and whether the answer to any question would change it. If you'd have chosen a different surface after answering, note which question changed your mind.

---
