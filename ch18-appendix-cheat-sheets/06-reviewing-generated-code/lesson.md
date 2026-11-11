# Cheat Sheet: Reviewing Generated Code

*From Chapter 8. Use on every generated change, before it runs.*

## Read in this order

1. The public surface: signatures, parameters, return types, exceptions.
2. The data flow: where each input goes and where each output comes from.
3. The error paths: every catch, every failure return, every give-up.
4. The external calls: files, network, databases, anything that waits.
5. Naming, structure, and style last.

## Every concern is a claim

Write: **condition** (when), **behavior** (what happens), **rule** (what it breaks).

> When the file is missing, the method returns an empty map and raises nothing. The spec requires an error.

## The three kinds of bad call

- **Invented.** Not in the language under any version.
- **Removed.** Existed, and the target version no longer has it.
- **Version-dependent.** Correct, but only from some version onward.

Check each one in the reference for your target version. Treat a deprecation warning as a finding.

## Ask what the checks don't ask

- Which unit does the caller pass?
- Does the test check the requirement, or only what the author wrote?
- Who is allowed to see this?
- What does the spec leave open?

## Failure modes to look for

- Broad catches that turn errors into empty results or zeros.
- Blocking on async work, or forgetting to await.
- Cancellation accepted and never passed on.
- Credentials, addresses, or timeouts written into source.
- A factory or interface around a single check.

## Common mistake

Accepting code because it is tidy and its tests pass. Tests answer only the questions someone asked.
