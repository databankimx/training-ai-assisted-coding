# Lesson 8-3 starter (Python): three common failure modes, each run as a case.
# Run it, and compare each line with the expected output. Don't fix anything yet.
import asyncio
import threading


def parse_count(text):
    try:
        return int(text)
    except Exception:
        return 0


async def get_value():
    await asyncio.sleep(0)
    return 42


async def run_steps(cancel_event):
    steps = 0
    for _ in range(3):  # the event is never checked
        await asyncio.sleep(0)
        steps += 1
    return steps


async def main():
    print(f"parse abc: {parse_count('abc')}")
    try:
        value = asyncio.run(get_value())  # nested run inside a running loop
        print(f"value: {value}")
    except RuntimeError as error:
        print(f"value: error ({error})")
    cancel = threading.Event()
    cancel.set()
    steps = await run_steps(cancel)
    print(f"steps after cancel: {steps}")


asyncio.run(main())
