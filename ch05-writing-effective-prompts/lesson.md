# Writing Effective Prompts

Of everything you control when you work with an assistant, the prompt is the largest single lever. The same assistant, on the same day, with the same code, can return something useful or something you'd throw away, and the difference is usually the words you chose before you pressed Enter.

This chapter treats a prompt as a specification. That idea sounds grand, and it's practical. A specification says what goes in, what comes out, what counts as wrong, and what must not change. A prompt that says the same things gets a result you can check. A prompt that doesn't gets a result you have to guess about.

## Why a prompt is a specification

When you ask a colleague for a function, you don't say "write something that finds the biggest number." You say what type the numbers are, what to do with an empty list, whether negative numbers are possible, and which library version you're on. A colleague who isn't told these things will guess, and the guess will be reasonable and sometimes wrong.

The assistant guesses too, and it guesses without telling you. Every detail you leave out becomes a default the assistant chooses for you, and Chapter 3 showed that its defaults come from the most common code it has seen, not from your project.

## What you'll do

1. **A prompt is a spec.** The parts a good prompt carries, and what each one prevents.
2. **Weak and strong prompts.** The same task, asked two ways, and what came back.
3. **Constraints as protection.** How to say what the assistant must not do, against its defaults.
4. **The follow-up cycle.** When to refine, and when to stop refining and start again.
5. **Prompts for tests and documentation.** A preview of how the same habits carry over, developed further later in the course.

The homework is a three-round exercise on a single function, with all three prompts and their outputs kept. The summary has three quizzes.

---
