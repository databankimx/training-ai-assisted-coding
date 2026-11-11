# Lesson 14-4 solution (Python): the write goes through an approval gate. The person declines it here, so the file is unchanged and the run stops.

sandbox = {"fines.txt": "cap 2000"}
step_limit = 10
step = 0
stopped_at_gate = False


def propose(step_number):
    if step_number == 1:
        return ("list_files", "")
    if step_number == 2:
        return ("read_file", "fines.txt")
    if step_number == 3:
        return ("write_file", "fines.txt")
    return ("done", "")


# The approval gate. In a real agent this asks a person. Here the answer is fixed, so the example is repeatable.
def person_approves(call):
    return False


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
    elif not person_approves(call):
        result = "needs approval, not written"
        stopped_at_gate = True
    else:
        sandbox[argument] = "cap 1800"
        result = "ok"
    print(f"step {step}: {call} -> {result}")
    if stopped_at_gate:
        print("stopped: write needs approval")
        break
