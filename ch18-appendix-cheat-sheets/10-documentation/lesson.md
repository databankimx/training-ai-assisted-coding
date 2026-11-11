# Cheat Sheet: Documentation

*From Chapter 12. Use for any generated comment, README, or docstring.*

## A documentation prompt has four parts

1. **Reader.** Who reads it, what they know, and what they need to do.
2. **Source.** The spec, the tests, a decision record, or a known list of behaviors. Not the code alone.
3. **Claims.** A short list of what the document must state.
4. **Form.** The team's format: XML comment, docstring, JSDoc.

## Each sentence is a claim

- Turn the sentence into an input and an expected behavior.
- Run it. Mark it supported or unsupported.
- For an unsupported sentence, decide which side the spec supports, then correct the document or the code.

## Watch for

- Sentences that describe a fallback the code doesn't have ("returns zero for negative input").
- Thresholds stated without the side of the boundary ("up to 5000" or "over 5000").
- Examples that drifted after a change.

## Common mistake

Correcting the document to match a defect. A defect written down as the design is harder to find later.
