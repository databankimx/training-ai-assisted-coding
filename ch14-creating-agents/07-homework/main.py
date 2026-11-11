# Homework starter (Python): a small agent built from a spec, with three defects against the spec.
# The spec: step limit 5. Each log line is "[n] call -> result". A delete needs a person's approval, and the run stops when the approval is declined.
# Run it, compare each line with the spec, then fix the defects. Don't fix anything yet.

sandbox = {"notes.txt": "keep this", "temp.txt": "scratch"}
step_limit = 20  # defect: the spec says 5
step = 0


def propose(step_number):
    if step_number == 1:
        return ("list_files", "")
    if step_number == 2:
        return ("read_file", "notes.txt")
    return ("delete_file", "temp.txt")


while step < step_limit:
    step += 1
    tool, argument = propose(step)
    call = tool if argument == "" else f"{tool} {argument}"
    if tool == "list_files":
        result = ", ".join(sandbox.keys())
    elif tool == "read_file":
        result = sandbox.get(argument, "missing")
    else:
        # defect: the delete runs without asking a person
        result = "deleted (no approval asked)" if sandbox.pop(argument, None) is not None else "missing"
    print(f"step {step}: {call} -> {result}")  # defect: the log format is not the spec's
print(f"stopped: step limit ({step_limit}) reached")
