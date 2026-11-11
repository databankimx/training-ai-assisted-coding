# A Decision Framework for Each Task

Over fifteen chapters the course has given you a question for each decision: which surface, what to paste, what the spec says, when to stop. Before a task starts, those questions can be put together into one short sequence. The sequence takes a minute, and it's the habit that makes the rest of the course stick.

The framework has six questions. Answer them in order, in writing, before you open a tool.

## The six questions

**1. Is the data allowed here?** Chapter 2. Classify what you're about to share. If the answer is not clear, stop and ask.

**2. Is the domain familiar enough to judge an answer?** This step. If not, learn enough to check, or bring in someone who knows.

**3. What is the smallest surface that does the job?** Chapter 4. Completion, inline edit, chat, planning, or agentic work, in that order of reach.

**4. What is the spec, and where does it live?** Chapters 5 to 7. Write the rule, the error behavior, and the acceptance examples before generating code.

**5. How will I check the result, and how fast?** Chapters 8, 9, and 13. Name the test, the diff review, or the checkpoint that will decide.

**6. What would make me stop?** This chapter's stop conditions. Name the count of failing cases, the number of rounds, and the point where the task becomes a person's decision.

## The framework in use

Here is the framework applied to one task, written the way you'd write it before starting.

> **Task:** Add a late fee to the library fines module, with the three-day grace period.
>
> **1. Data:** No personal data is needed. The module uses sample items. Allowed.
> **2. Domain:** The fines rules are in the spec, and the team knows them. Familiar enough.
> **3. Surface:** Inline edit for the function, with planning first for the spec change.
> **4. Spec:** The grace period, the cap, and the error for negative days, with the acceptance table from Chapter 7.
> **5. Check:** The acceptance table, run in full, and a diff review against the brief.
> **6. Stop:** Stop after two rounds with the same failing case, or if the diff touches a file outside the module.

Each answer is short, and each one changes what happens next. If question one had been "no", the task would have stopped there. If question two had been "no", the task would have gone to someone who knows the fines rules.

## Make the framework yours

The six questions are a starting point, and the course's own chapters suggest where to adjust them. A team with a stricter data rule adds a question about approvals. A team that works mostly in one language may replace question three with its own tool list. What must stay is the order: data first, domain second, and the stop last, because a task can be stopped before it starts, and the framework should make that easy.

> **Aside: why the framework is written down.**
> A decision made in your head is made under the pressure of the task, and the pressure favors the fastest answer. A written answer is made before the pressure starts, and it can be checked afterwards. The framework is worth the minute because it moves the decision to the time when the answer is cheapest to get right.

## Try it

Choose a task you have to do this week. Write the six answers in the format of the example, before you start the task. At the end, note whether any answer changed while you worked, and what you would write for question six if you had to decide it again. Save your framework in a file called `framework.md` in your practice folder.

---
