# Homework: Matching Tasks to Surfaces

This homework uses five tasks you haven't seen. For each one, answer the five questions from the choosing step, choose a surface or decide that the task isn't a surface question, and write one sentence that names the answer that decided it.

Write your answers in a file called `homework-surfaces.txt` in your practice folder. Give each task its own short section, with the surface, the deciding answer, and one sentence of reasoning.

## The tasks

1. **Convert one method in your practice project from a loop that builds a list into a single query expression.** The method is on screen, and a test already covers it.

2. **Compare two approaches for reading a configuration file, and list the trade-offs of each.** You want to understand the options before choosing one. No company code is involved.

3. **Design a small command-line tool that reports disk usage, before any code is written.** You want the design written down, and reviewed, before work starts.

4. **Update a logging package from one version to the next across five practice projects in one solution, then run each project's tests.** Some of the projects depend on the package, and you want the tests to judge the change.

5. **A product team asks whether a feature can send the text of internal support tickets to an AI service every time an agent opens a ticket.** They want to know which tool to use to build it.

Before you answer task 5, think about what the question actually asks. The answer is not a tool choice.

---

~~~spoiler
Answer key. Your reasons count for more than the surface you chose. Check each one against the question that decided it.

1. **Inline edit.** It's one method, visible on screen, and a test already checks the result. The deciding answers are the size of the change and the speed of the check. Completion is acceptable if you'd rather type the query yourself.

2. **Chat question.** It's a question about options, not a change, and it involves no company information. Check the trade-offs against the documentation before you rely on them.

3. **Planning.** The design is the thing to review, and nothing exists yet to check against. The plan is the output, and it should be approved before any code is written.

4. **Agentic work, with checkpoints.** The change reaches five projects, the tests give an objective check, and the task is well defined. Stop after the plan and again after each project's test run, and review the diff at each stop. Also check the new version's license. A version bump can change a license, and Chapter 2, step 4 applies to any dependency you update.

5. **Not a surface decision.** The feature sends internal ticket text to an AI service at run time. That makes it an AI platform inside a product, not a coding assistant, as step 2 described. It's custom development, so it needs a development quote, an approved architecture, review, and the required scans before anyone builds it. The data question comes first. Ticket text is internal, and it may contain customer details, so it must be classified before any design decision is made. Choosing a tool is the last step, not the first.

**What the homework shows.** Tasks 1 to 4 are about the surface: how much the assistant changes, how much it sees, and how the change is checked. Task 5 shows why the surface isn't always the question. When the real answer is about data flow and approval, a list of tools doesn't help, and the right first step is to stop and ask.
~~~

---
