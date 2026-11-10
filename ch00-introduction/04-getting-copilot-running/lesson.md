# Getting Copilot Running

This step gets GitHub Copilot working in the editor you use. You can use Visual Studio 2026 or VS Code. Either is fine, and the course doesn't prefer one over the other.

Before you start, read the account rule carefully, because it applies to everything in this step. The rule comes from the [AI Acceptable Use Policy](https://workforcenow.adp.com/mascsr/wfncontenttools/file-management/file/JTJGc3RhdGljJTJGY2xpZW50cyUyRmNvbnRlbnQlMkZBSStBY2NlcHRhYmxlK1VzZStQb2xpY3kucGRmJTNGMTc3MTM0NzA4NjE4MQ==). **Work at DataBank happens only through company-provided accounts.** The free tier of GitHub Copilot is permitted for learning, and this course uses it for that purpose. Use it only with the sample code in this course, and never for DataBank work. Paid Copilot seats are assigned to developer roles, so if you have one, you can use it for work. If you don't, use a company-provided tool for work, as described in the next step.

> **Why this matters:** a free account is a personal account. Your employer doesn't manage it, and the company's data agreements don't cover it. The policy asks you not to use personal accounts for company-related work. Learning on sample code is a different thing, and that's why the free tier is fine here.

## Know what you're signing in to

Copilot is built into current versions of both editors. You don't need to install a separate extension in VS Code, and in Visual Studio 2026 it ships with the product. Both editors still need you to sign in with a GitHub account, and both need you to confirm that the feature is present. Don't assume. Check.

Menus and button names change between releases. If your screen doesn't match the steps below, look for the same things by name: the Copilot icon, the account settings, and the chat window.

## Visual Studio 2026

1. Open Visual Studio 2026. If you don't have it yet, install the version your team uses.
2. Confirm that Copilot is present. Go to **Extensions > Manage Extensions**, and search for "GitHub Copilot." If it appears as installed, you're done with this part. If it doesn't, install it. In some setups, it's easier to add the **GitHub Copilot** component through the Visual Studio Installer, under the Individual components tab.
3. Sign in. Go to **Tools > Options > GitHub > Accounts**, and add your GitHub account. Use the account the free tier or your company license is attached to. If your team uses GitHub Enterprise, use the sign-in your team already uses.
4. Open the Copilot chat window. It's usually in the **View** menu, or you can search for "Copilot" from the quick launch box at the top of the window.

## VS Code

1. Open VS Code. Check that you're on a current version. Go to **Help > About**. Copilot has been built in since version 1.116, so anything newer than that will have it.
2. Sign in. Look for the Accounts icon in the bottom-left corner of the window, or the Copilot icon in the status bar. Select it, and sign in with the GitHub account you want to use.
3. Open the Chat view. It's usually in the activity bar on the left, or you can open it from the Command Palette by searching for "Chat."

## Prove it works

Setup isn't finished until you've seen Copilot respond. Ask the chat window this question, which has nothing to do with company code:

```text
In one sentence, explain what a for loop does.
```

You should get a short, sensible answer. If you do, Copilot is working.

Then check the sign-in itself. In Visual Studio, look at **Tools > Options > GitHub > Accounts** and confirm your account is listed. In VS Code, check that the Accounts icon shows your name. Both checks matter, because a chat window can sometimes open without a working account behind it.

If something goes wrong, the usual causes are: the wrong account is signed in, the editor needs a restart after sign-in, or the Copilot component isn't installed. Try those in that order before asking for help.

## Try it

- Ask Copilot to explain a small piece of code from a public example, such as a short Python script you found in a tutorial. Read the answer and compare it with the code.
- Sign out, then sign back in. Notice how many steps it takes. You'll need that memory later, when someone asks you to set it up for a colleague.

---
