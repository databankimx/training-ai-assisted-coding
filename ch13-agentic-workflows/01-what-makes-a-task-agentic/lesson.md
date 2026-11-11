# What Makes a Task Agentic

Not every task is worth giving to an agent. An agent is a good choice when the work is large enough that stopping for every step is slow, when the steps are well understood, and when you can check the result afterwards. It's a poor choice when the task is ambiguous, when it touches things you can't easily undo, or when you can't tell a good result from a bad one.

This step gives you four questions to ask before you choose an agent. A task that passes all four is a candidate. A task that fails any one of them should be done with a narrower surface, or by a person.

## The four questions

**1. Is the scope bounded?** An agent needs to know which files, modules, and behaviors are in play. "Rename this property everywhere it's used in the Orders module" is bounded. "Modernize the codebase" is not, because the agent will decide what modernizing means.

**2. Can the result be checked by something other than the agent?** A test suite, a build, a set of acceptance examples, and a reviewer who reads the diff all count. If the only check is the agent saying it succeeded, the task is not ready for an agent.

**3. Can it be stopped and resumed at clear points?** An agent that runs to the end without a stop gives you one large change to review. A task with natural checkpoints gives you several small ones, and each small one is easier to judge.

**4. Can it be undone?** A change to a branch is easy to reject. A change that sends email, deploys a service, or deletes data is not. Agents should work where a bad result costs a revert, not a recovery.

> **Aside: why the checks matter more than the cleverness.**
> An agent's output is only as trustworthy as the way you verify it. A capable agent with weak checks can produce a convincing, wrong result, and a modest agent with strong checks produces results you can rely on. The first question to ask about an agentic task is not "how smart is the agent?" It's "how would I know if it were wrong?"

## Examples

> **Suits an agent:** Rename the `ShippingCost` property to `ShippingCents` across the Orders module, update every caller in that module, run its tests, and report which tests fail. The scope is bounded, the test suite checks the result, the change can be split into a plan, an edit, and a test run, and a branch can be discarded.
>
> **Does not suit an agent:** Make the checkout faster. The scope is unbounded, nothing defines faster, the result is hard to check, and the changes may touch payment behavior that needs a specialist.
>
> **Does not suit an agent yet:** Migrate the reporting database. The task may be bounded, but a migration can't be undone in place, and the checks depend on data nobody has described. Write the spec and the rollback plan first, then decide.

## Try it

Choose three tasks from your recent work. For each, answer the four questions in one sentence. Give each task a verdict: agent, narrower surface, or a person. For each task you rule out, write the one question it failed and what would have to change for it to pass. Save your answers in a file called `agent-fit.txt` in your practice folder.

---
