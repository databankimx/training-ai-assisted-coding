# Lesson 8-3 solution (Python): the same three cases, with the failures fixed.
import asyncio
import threading


def parse_count(text):
    try:
        return int(text)
    except ValueError as error:
        raise ValueError(f"not a number: {text}") from error


async def get_value():
    await asyncio.sleep(0)
    return 42


async def run_steps(cancel_event):
    steps = 0
    for _ in range(3):
        if cancel_event.is_set():
            break
        await asyncio.sleep(0)
        steps += 1
    return steps


async def main():
    try:
        print(f"parse abc: {parse_count('abc')}")
    except ValueError as error:
        print(f"parse abc: error ({error})")
    value = await get_value()
    print(f"value: {value}")
    cancel = threading.Event()
    cancel.set()
    steps = await run_steps(cancel)
    print(f"steps after cancel: {steps}")


asyncio.run(main())
