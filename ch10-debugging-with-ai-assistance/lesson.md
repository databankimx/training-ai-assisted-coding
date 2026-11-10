# Debugging with AI Assistance

Debugging is where an assistant is most tempting and most dangerous. Something is broken, you're under pressure, and a confident suggestion arrives in seconds. The suggestion often looks right, and sometimes it is. When it isn't, you've made the code harder to understand while believing you've fixed it.

This chapter treats a debugging session as an experiment. You state what you observe, form a hypothesis, test it, and only then accept a change. The assistant is a useful source of hypotheses. It is not a source of evidence.

## What you'll do

1. **Describing a bug.** What a useful report contains, and what it leaves out.
2. **Pasting the actual output.** Why the exact error and output matter more than your summary of them.
3. **Reading the hypothesis before accepting the fix.** How to test a proposed fix against cases before it goes in.
4. **When the fix is wrong.** Why a fix that works for the reported case often misses an invariant the code relies on.

The homework is a seeded bug with a misleading symptom. You debug it with an assistant, record every hypothesis and its result, and write the root cause. The summary has three quizzes.

The steps that teach reading output use the same small harness as the testing chapter, so the results are visible in the runner.

---
