# How the Model Works (and Why It Gets Things Wrong)

Chapter 0 gave you the short version: an assistant predicts text, so it can sound certain when it's wrong. This chapter takes that idea apart. You'll see what a token is, why a long conversation can lose its early parts, why a confident invented method name is so common, why the assistant doesn't know about the library version you're using, and why neat formatting proves nothing.

You don't need any mathematics for this chapter. You need to be willing to look at a few examples slowly, and to check claims against sources you trust. Both are habits you'll use for the rest of your career.

## Why theory, and why now

You could skip this chapter and still use an assistant. Many people do, and most of the time it works. The trouble is the time it doesn't. When the assistant gives you a method that doesn't exist, or a confident answer about a library version from two years ago, you'll be far more likely to catch it if you know why that kind of mistake happens.

Each step here answers one "why" question, with an example you can follow and a short "Try it" that makes you check something yourself.

## What you'll do

1. **Tokens and context.** What the assistant actually reads, and why a long conversation can lose its beginning.
2. **Hallucination.** Why the assistant invents plausible method names, and what the invented ones look like.
3. **Training cutoffs.** Why the assistant doesn't know your library version, and how to find out what it does know.
4. **Formatting is not evidence.** Why neat code and confident comments prove nothing about whether the code is correct.

The homework is a hunt: you'll receive generated code, list every claim it makes about an API, and check each claim against documentation. The summary has three quizzes.

---
