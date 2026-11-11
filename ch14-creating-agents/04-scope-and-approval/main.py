# Lesson 14-4 starter (Python): the same agent loop, with a write that goes through without any approval.
# Run it, read the log, then compare with the expected output. Don't fix anything yet.

sandbox = {"fines.txt": "cap 2000"}
step_limit = 10
step = 0


def propose(step_number):
    if step_number == 1:
        return ("list_files", "")
    if step_number == 2:
        return ("read_file", "fines.txt")
    if step_number == 3:
        return ("write_file", "fines.txt")
    return ("done", "")


while step < step_limit:
    step += 1
    tool, argument = propose(step)
    if tool == "done":
        print(f"step {step}: done")
        print("stopped: model reported done")
        break
    call = tool if argument == "" else f"{tool} {argument}"
    if tool == "list_files":
        result = ", ".join(sandbox.keys())
    elif tool == "read_file":
        result = sandbox.get(argument, "missing")
    else:
        # No check here: the write happens whatever the model proposed.
        sandbox[argument] = "cap 1800"
        result = "ok (no approval asked)"
    print(f"step {step}: {call} -> {result}")
