# Homework solution (Python): the agent with the spec's step limit, log format, and approval gate.

sandbox = {"notes.txt": "keep this", "temp.txt": "scratch"}
step_limit = 5
step = 0
stopped_at_gate = False


def propose(step_number):
    if step_number == 1:
        return ("list_files", "")
    if step_number == 2:
        return ("read_file", "notes.txt")
    return ("delete_file", "temp.txt")


# The approval gate for deletes. A person answers it. Here the answer is fixed, so the example is repeatable.
def person_approves(call):
    return False


while step < step_limit:
    step += 1
    tool, argument = propose(step)
    call = tool if argument == "" else f"{tool} {argument}"
    if tool == "list_files":
        result = ", ".join(sandbox.keys())
    elif tool == "read_file":
        result = sandbox.get(argument, "missing")
    elif not person_approves(call):
        result = "needs approval, not deleted"
        stopped_at_gate = True
    else:
        result = "deleted" if sandbox.pop(argument, None) is not None else "missing"
    print(f"[{step}] {call} -> {result}")
    if stopped_at_gate:
        print("stopped: delete needs approval")
        break
