# Cheat Sheet: Security and Compliance Review

*From Chapter 15. Use on any change that touches the five categories, or any change to data, access, or dependencies.*

## Route first

Security-sensitive code (authentication, authorization, cryptography, secrets, trust-boundary input) goes to a specialist. Route it before any test runs.

## Ask of each rule

- **Authorization.** Who may do this, against which record? Test the case where the caller is not the owner.
- **Input validation.** Is every value checked: range, sign, upper bound, format?
- **Secret exposure.** Does any secret reach a log, an error message, or a response?
- **Boundaries.** Read the rule word by word. "Older than 90" and "90 or more" are different. Test the boundary.
- **Dependencies.** Is the license on the allow list? If not, hold it for review. A suggestion is not an approval.

## Sort findings

Name each one: **category**, **line**, **rule broken**, **case that shows it**. A finding without a category is a finding not yet understood.

## Fix, then recheck

Fix one finding at a time, and run the cases after each fix.

## No exception

Generated changes pass review, standards checks, static analysis, dependency scanning, and tests. A green test run is one gate of several.

## Common mistake

Testing only the happy path. The owner check is missing from every test that uses the owner.
