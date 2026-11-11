# Defining Tools

A tool is the agent's hands. Whatever the model proposes, the tool is what touches the file, the network, or the database. That makes the tool the real boundary of the agent, and the place where a careless definition does the most damage.

A tool definition has four parts: a name, its inputs, what it does, and what it refuses to do. The first two are what the model sees. The last two are what you must enforce in the code, because the model can't be relied on to stay within them.

## A good definition, and a loose one

Here are two definitions of the same tool, written the way a model would see them.

> **Loose:**
> `write_file(path, content)`: writes a file.
>
> **Defined:**
> `write_file(path, text)`: replaces the entire contents of one file inside the `config/` folder. The path must be a relative path with no `..` segments. The text must be at most 4 kilobytes. Creating a new file is not allowed; the file must already exist. Returns `ok`, or an error that names the rule that was broken.

The loose version leaves the boundary open. The model may write to any path, including `../../etc/...`, a file that doesn't exist yet, or a file several megabytes long. The defined version states the scope, the limits, and the error behavior. Every one of those statements is a check the tool has to make.

## Three things a tool must check

**The path.** A relative path that stays inside an allowed folder. A path containing `..` can escape the folder, and a path that starts with a drive letter can point anywhere. Check the resolved location, not the text.

**The size.** A limit on what the tool will write or return. Without a limit, one bad proposal can fill a disk or a context window.

**The kind of action.** Whether the tool may create, overwrite, or delete. A tool that only reads should not have a write path at all. The smallest tool that does the job is the safest one.

> **Example of a check.** A tool that writes config files can resolve the requested path against the `config/` folder, and refuse the write if the resolved path is outside that folder. The check is four lines of code. The model's wish to write somewhere else doesn't matter, because the tool doesn't run the write.

## Name the tools the way a reviewer would read them

The model chooses a tool from its name and description, and a reviewer reads the same list. A name should say what the tool does and what it touches.

> **Vague names:** `run`, `do`, `update`.
>
> **Clear names:** `read_config_value`, `set_config_value`, `list_config_keys`.

A set of clear names also shows the reviewer what the agent can do, at a glance. If you see `delete_database` in a tool list, that's a question before the agent runs, not after.

## Give the agent fewer tools

Each tool adds a way for the agent to act, and so a way to act wrongly. A common mistake is to give an agent a general tool, such as "run any shell command", because it's convenient. The tool then becomes the whole boundary, and nothing narrower stands between the model and the machine.

> **Broad:** `run_command(text)`: runs a shell command.
>
> **Narrow:** `list_files(folder)`, `read_file(path)`, and `write_config_value(key, value)`.

The narrow set can do less, and each action has its own checks. Start with the fewest tools the task needs, and add one only when a stop shows the task can't be done without it.

> **Aside: why the tool is the boundary and not the prompt.**
> A prompt asks the model not to do something. A tool makes the thing impossible to do through that tool. The model can ignore a prompt, and it can't call a function that doesn't exist. Rules written only in the prompt are suggestions, and rules enforced in the tool are limits. Chapter 13, step 5 covered the same point for injected text: the defense that holds is structural.

## Try it

Choose an action you'd like an agent to perform, such as reading a setting or writing a report. Write its definition in the four parts: name, inputs, what it does, and what it refuses. List the three checks the tool makes on its own inputs. Then write one broad tool you would not give the agent, and say which narrower tools would replace it. Save your definitions in a file called `tools.md` in your practice folder.

---
