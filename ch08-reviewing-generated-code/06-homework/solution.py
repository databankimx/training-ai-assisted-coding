# Homework solution (Python): the three functions with the defects fixed, run by the same harness.
import asyncio
import threading


def parse_retry_delays(text):
    delays = []
    for part in text.split(","):
        part = part.strip()
        try:
            delays.append(int(part))
        except ValueError as error:
            raise ValueError(f"not a number: {part!r}") from error
    return delays


async def age_service(user_id):
    await asyncio.sleep(0)
    return 42


async def get_user_age(user_id, cancel_event):
    if cancel_event.is_set():
        raise RuntimeError("cancelled")
    return await age_service(user_id)


def apply_discount(price, percent):
    if not 0 <= percent <= 100:
        raise ValueError("percent must be between 0 and 100")
    return price - price * percent // 100


def show(action):
    try:
        return " ".join(str(item) for item in action())
    except Exception:
        return "error"


async def main():
    print(f'retry "100, 200, 400": {show(lambda: parse_retry_delays("100, 200, 400"))}')
    print(f'retry "100, abc": {show(lambda: parse_retry_delays("100, abc"))}')
    print(f'retry "100, 200,": {show(lambda: parse_retry_delays("100, 200,"))}')

    print(f"user age normal: {await get_user_age(1, threading.Event())}")
    cancelled = threading.Event()
    cancelled.set()
    try:
        print(f"user age cancelled: {await get_user_age(1, cancelled)}")
    except Exception:
        print("user age cancelled: cancelled")

    print(f"discount 1000 at 10: {apply_discount(1000, 10)}")
    print(f"discount 1000 at 0: {apply_discount(1000, 0)}")
    print(f"discount 1000 at 100: {apply_discount(1000, 100)}")


asyncio.run(main())
