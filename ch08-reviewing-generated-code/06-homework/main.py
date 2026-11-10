# Homework starter (Python): three generated functions and the harness that tests them against the spec.
# Run it, read each row, then review the functions. Don't fix anything yet.
import asyncio
import threading


def parse_retry_delays(text):
    try:
        return [int(part) for part in text.split(",")]
    except Exception:
        return []


async def age_service(user_id):
    await asyncio.sleep(0)
    return 42


async def get_user_age(user_id, cancel_event):
    return await age_service(user_id)  # the event is accepted and never checked


def apply_discount(price, percent):
    discounted = price - price * percent  # percent treated as a fraction
    return discounted * 1.0825            # tax hardcoded, floating point


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
