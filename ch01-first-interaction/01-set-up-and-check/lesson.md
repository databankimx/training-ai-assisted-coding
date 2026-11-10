# Set Up and Check Your Tools

Before you write any code with an assistant, make sure the assistant is ready to help. This step takes about fifteen minutes, and most of it is checking things you already set up in Chapter 0. If something is missing, fix it now, because a broken setup looks exactly like a bad answer, and you'll waste time blaming the wrong thing.

## Check your account

Work through this list. Each item takes a few seconds.

1. **Open your editor.** Visual Studio 2026 or VS Code, whichever you use.
2. **Check the account.** Make sure the GitHub account shown in the editor is the one you intend to use. For company work, that's a company-provided account. For practice on sample code, the free tier is fine.
3. **Check the chat window opens.** Open the Copilot chat, and make sure it accepts a question.
4. **Check inline suggestions are on.** Type a few characters of a comment, such as `// add two numbers`, and wait. Grey text should appear. If it doesn't, check the Copilot status in the editor's status bar or settings, and confirm the feature isn't turned off for your language.

If you use a different company-approved tool, the list is the same. Check the account, check the chat window, and check that it answers a question. The steps differ between tools, but the checks don't.

> **Why this matters:** an assistant that isn't signed in can fail in ways that look like a bad answer. It might show no suggestions, a generic error, or an answer from an old session. Confirm the setup first, so that a problem later is a problem with the answer.

## Make your practice folder

Create one folder for this course's practice files. We suggest:

```text
C:\Development\ai-practice
```

Inside it, make one subfolder per chapter, so you end up with a folder called `ch01` for this chapter. Put every file you write in this course in these folders. Your files stay yours, and you can compare your version with the runner's version at any time.

Keep the practice folder outside any repository you use for work. The examples in this course are invented, but your work code isn't, and you should never mix the two.

## Send one test request

Ask your assistant a question that has nothing to do with company code. Use this one, or one of your own that has the same shape:

```text
In two sentences, explain what a function is to someone who has never written code.
```

You should get a clear answer within a few seconds. Read it. Does it make sense? Does it match what you already know? You're not grading the assistant yet. You're checking that the connection works and that you can read what comes back.

## Try it

1. Create `C:\Development\ai-practice\ch01`.
2. Send the test request above, and save the answer as a text file called `test-answer.txt` in that folder.
3. Change the test request so it asks for three sentences instead of two. Send it again, and compare the two answers. Did the assistant follow the new instruction? Note the answer in a second text file called `test-answer-2.txt`.

These two files are the start of your practice record. You'll add to it in each step.

---
