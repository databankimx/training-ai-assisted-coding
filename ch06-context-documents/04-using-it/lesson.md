# Using a Context Document

A context document only helps if the assistant reads it, and reads it before the request that depends on it. That sounds obvious, and it's the step most often done badly. A document pasted at the bottom of a long message, after a request that already assumed its contents, is read too late to change the answer.

This step covers the ways to give a document to an assistant, how long it stays useful, and where to put it.

## Three ways to give it

**Pasting.** You copy the document's text into the conversation. It works with any tool and any surface, and it's the most reliable option when the tool has no file attachment. The cost is space: the document takes up part of the context window, as Chapter 3 described, so keep it short.

**Attaching.** Some tools let you attach a file. The tool may read the whole file, or it may read parts of it that seem relevant. Attaching is convenient, but you can't always tell which parts the assistant used, so check important answers against the document.

**Referencing from the repository.** Some tools can read a file in your project directly, when you name it or when it's in the folder you're working in. This is the closest to a standing context, but the tool's behavior varies, and it's worth testing once to see what the assistant actually reads.

Here is the same request given all three ways, so you can see the difference in the words you use.

> **Paste:**
> Here is the context document for the shipping estimator:
> [the document's text]
> Now add a method that returns the cost of an order in cents, including the surcharge for parcels over 10 kilograms.
>
> **Attach:**
> I've attached `shipping-context.md`. Read it first, then add a method that returns the cost of an order in cents, including the surcharge for parcels over 10 kilograms.
>
> **Reference:**
> Using the context in `docs/shipping-estimator.md`, add a method that returns the cost of an order in cents, including the surcharge for parcels over 10 kilograms.

The third version assumes the tool can read the file. If it can't, the assistant may invent the contents of the document, which is the worst outcome. Test it once before you rely on it.

## Put it before the request

The assistant reads the whole message, but its earlier parts shape how it reads the later ones. Put the document at the start of the conversation, and the request after it. A document placed after the request invites the assistant to answer the request first and treat the document as an afterthought.

> **Document after the request, read too late:**
> Add a surcharge for parcels over 10 kilograms to the shipping estimator.
> [the document's text]
>
> **Document before the request:**
> [the document's text]
> Add a surcharge for parcels over 10 kilograms to the shipping estimator.

## How long a document lasts

A document's influence lasts for one session, not for every session. A new conversation starts without it, unless the tool has been configured to carry it forward. The rule is simple: if you want the assistant to follow the document, give it the document at the start of each session where you need it.

That's tedious, which is why some teams keep the document in the repository and point the tool at it. The trade-off is between convenience and certainty. A pasted document is certain, because you can see what the assistant received. A referenced document is convenient, but you have to check what the tool read.

Here's a quick way to see the effect. Start two sessions, one with the document and one without, and ask both for the same method. Compare the two results against the document's rules.

> Session A, with the document:
> The output uses integer cents and the threshold in grams.
>
> Session B, without the document:
> The output uses floating-point dollars and the threshold in kilograms.

Session B isn't wrong for a generic shipping module. It's wrong for this one, and the document is the only thing that told the assistant so.

## Keep the document short enough to read

Every line of the document takes up space in the context window. A document of two pages is usually fine. A document of twenty pages competes with the request, and a long document can push the important parts out of the window in a long session.

Here are two versions of the same rule, one short and one long, with the same effect.

> Short: Money is integer cents, never floating-point.
>
> Long: Throughout this module, all monetary values, including every intermediate result of every calculation, must be represented as an integer count of the smallest currency unit, which in this case is the cent. Floating-point types, including float, double, and any decimal type used with a floating-point representation, must not be used for any monetary value at any stage of the computation.

The short version says the same thing with a tenth of the words. The assistant doesn't need the long version to follow the rule, and the long version makes the rule harder to spot in a long document.

> **Aside: why the position of the document matters.**
> The model reads the conversation in order, and what comes earlier sets the frame for what comes later. A document at the start is read as the frame. A document at the end is read as an addition to a frame that's already been set by the request. That's a property of how the model processes text, and it's the reason the placement advice is worth following even though it looks like a formatting detail.

## Try it

Take the shipping estimator document, and give it to your chosen tool three ways: by pasting, by attaching if the tool supports it, and by placing it after the request instead of before. Ask for the same method each time. Compare the three outputs, and note which one followed the document's rules most closely. Save your notes in a file called `placement.txt` in your practice folder.

---
