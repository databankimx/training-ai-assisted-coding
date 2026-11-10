# Homework: Sorting Real-Looking Work

This homework is a second, longer sort, with items you haven't seen. Use the four categories from the first step, and use the three questions from the grey-areas step whenever an item isn't obvious.

Write your answers in a file called `homework-classify.txt` in your practice folder. For each item, write the category, and one sentence of reasoning that names the detail that decided it. A category with no reason is not an answer.

## The items

1. A question about how to write a unit test for a function that loops over a list.
2. Log lines from a company test environment. The server is called `test-app-01`, and the log has no customer data, but it shows the order in which an internal service calls its dependencies.
3. The public pricing page of a software vendor, copied into a note for a comparison.
4. An invoice template with placeholders such as `[CUSTOMER NAME]` and `[AMOUNT]`, and no real values.
5. An email from a client asking for an update on their project, signed with the client contact's name.
6. Your own notes on how the team's coding standards could be improved. The notes name no one, but the standards are an internal document that hasn't been published.
7. An exception stack trace from a public open-source framework. The file paths include your Windows username.
8. A diagram of a generic three-tier web application, drawn for a training slide.
9. An API key you used to test a sample app, which is still in the sample's configuration file.
10. A press release that DataBank published on its public website last quarter.

## What to hand in

Your file should have ten lines, one for each item, in order. Then add a short paragraph that answers two questions. Which item did you find hardest, and why? Which of your answers would change if the detail you relied on turned out to be wrong?

---

~~~spoiler
Answer key. Check your reasons against the detail given, not just the category.

1. **Allowed.** A general testing question, with no company data.
2. **Allowed after removing details.** Remove the server name and any internal service names. The shape of the calls is still a system detail, so if you can't describe the problem without it, ask first.
3. **Allowed.** It's public information from a vendor's own website.
4. **Allowed.** It contains only placeholders, so there's nothing to protect.
5. **Not allowed.** It's a client's communication with a named contact, and it describes the client's project.
6. **Ask first.** The standards are internal and unpublished. The notes naming no one doesn't make them public.
7. **Allowed after removing details.** Remove the username from the file paths. The trace itself is from public code.
8. **Allowed.** A generic diagram that isn't drawn from any real system.
9. **Not allowed.** It's a credential, and the sample app's configuration must be cleaned up before anything else. Report it if the key is real.
10. **Allowed.** It has already been published, which is the clearance the policy asks for.

For item 9, the answer also has an action. A key that has been pasted anywhere outside the company's systems is an incident, so report it as the last step described.
~~~

---
