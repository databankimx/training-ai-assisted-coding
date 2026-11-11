# Cheat Sheet: Surfaces and Choosing the Surface

*From Chapter 4. Use before writing a prompt.*

## The five surfaces

| Surface | Sees | Changes | Use for |
|---|---|---|---|
| Completion | Lines around the cursor | Suggests the next lines | Small, predictable typing |
| Inline edit | The selection and nearby code | One proposed change | A single visible change |
| Chat question | What you paste | Nothing in your files | Learning, comparing, explaining |
| Planning | The goal and constraints | Nothing yet | A reviewable design before code |
| Agentic work | Files, commands, tests | Several changes in a row | Well-specified work with checkpoints |

## Questions to ask first

1. How sensitive are the data and the code? Ask this first. It can rule out a surface before any other question matters. (Chapter 2 if unsure.)
2. How big is the change: one line, one function, several files, or a feature?
3. Can I see all the code it affects?
4. How will I check the result, and how fast?
5. How easy is it to undo?

## Check before you accept

- Is this a coding assistant, which changes my code, or a platform, which runs inside my product? A platform is a development project.
- Did I answer the five questions before opening the tool?

## Common mistake

Choosing by habit. The tool you use most is not the surface the task needs.
