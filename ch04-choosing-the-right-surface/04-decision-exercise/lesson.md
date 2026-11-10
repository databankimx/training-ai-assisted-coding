# Decision Exercise

Here are five tasks. For each one, answer the five questions from the previous step, choose a surface, and write one sentence that names the answer that decided it. Don't open the answer key until you've made all five choices.

Write your answers in a file called `decisions.txt` in your practice folder.

1. **Add a null check to one method in the file you have open.** It's a single method, the code is on screen, and a quick test will show whether the check works.

2. **Explain to a colleague, in plain terms, what a hashing function is, before a meeting tomorrow.** Nothing in the explanation involves company code or data.

3. **Plan a new feature that imports invoices from a CSV file, including how bad rows are reported.** Nobody has written any code yet, and the team wants to review the design first.

4. **Rename a property that twenty files use, update every caller, run the test suite, and report which tests fail.** The change is well defined, and the tests can judge the result.

5. **Work out why a client's integration fails intermittently in production.** The only logs available contain customer account numbers and a server name, and the client's agreement restricts what may be shared.

~~~spoiler
Answer key. Your reasons matter more than your surfaces. A different surface can be right if your reason holds.

1. **Inline edit, or completion.** It's a small, visible change that a test can check. Inline edit suits it best, because you select the method and ask for the check. Completion is fine if you prefer to type it yourself. The deciding answers are the size of the change and the speed of the check.

2. **Chat question.** It's a question, not a change, and it involves no company information. Chat is the right surface for learning. Check the explanation against a trusted reference before you rely on it in the meeting.

3. **Planning.** The change is large, the team wants to review the design, and nothing exists yet to check against. The plan becomes the input to later work, and it's the artifact the team reviews. Nothing in this task should be written as code before the plan is approved.

4. **Agentic work, with checkpoints.** The change spans many files, it's well specified, and the test suite gives an objective check. The checkpoints matter. Ask the assistant to stop after the plan, after the rename, and after the test run, and review the diff at each one. The reason it's agentic and not a single inline edit is the number of files the change must reach.

5. **No AI surface until the data is classified and cleared.** The logs contain customer account numbers and a server name, and the agreement restricts sharing. The answer to question 4 is "sensitive", so the surface question comes second. Remove the identifiers, or ask first, following Chapter 2. A chat surface with a company account may be allowed after that, but a debugging session that needs the real logs is a question for your manager and the helpdesk, not for a tool.

**What the exercise shows.** Tasks 1 and 2 are the easy cases, where habit gives the right answer. Tasks 4 and 5 are the cases where habit fails. Task 4 needs a surface that can act across files, and task 5 needs no surface at all until the data question is settled. The fifth question, about data, is the one most people skip, and it decided task 5 before any other question was asked.
~~~

---
