# Lesson 14-3 solution (Python): the stand-in reports done once the write has succeeded, and the loop stops on it.

sandbox = {"fines.txt": "cap 2000"}
step_limit = 10
step = 0
finished = False


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
        finished = True
        break
    call = tool if argument == "" else f"{tool} {argument}"
    if tool == "list_files":
        result = ", ".join(sandbox.keys())
    elif tool == "read_file":
        result = sandbox.get(argument, "missing")
    else:
        sandbox[argument] = "cap 1800"
        result = "ok"
    print(f"step {step}: {call} -> {result}")
if finished:
    print("stopped: model reported done")
else:
    print(f"stopped: step limit ({step_limit}) reached")
