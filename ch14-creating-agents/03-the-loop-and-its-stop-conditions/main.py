# Lesson 14-3 starter (Python): a small agent loop over an in-memory sandbox, driven by a scripted stand-in for the model.
# Run it, read the log, then compare with the expected output. Don't fix anything yet.

sandbox = {"fines.txt": "cap 2000"}
step_limit = 10
step = 0


# The stand-in for the model. It proposes one action per step.
# After the write, it keeps asking to read the file again, and it never says "done".
def propose(step_number):
    if step_number == 1:
        return ("list_files", "")
    if step_number == 2:
        return ("read_file", "fines.txt")
    if step_number == 3:
        return ("write_file", "fines.txt")
    return ("read_file", "fines.txt")


while step < step_limit:
    step += 1
    tool, argument = propose(step)
    call = tool if argument == "" else f"{tool} {argument}"
    if tool == "list_files":
        result = ", ".join(sandbox.keys())
    elif tool == "read_file":
        result = sandbox.get(argument, "missing")
    else:
        sandbox[argument] = "cap 1800"
        result = "ok"
    print(f"step {step}: {call} -> {result}")
print(f"stopped: step limit ({step_limit}) reached")
