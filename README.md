<<<<<<< HEAD
# Simple Console To-Do List

This is a very small JavaScript to-do list manager that runs in the console. It stores tasks in an in-memory array and optionally persists them to `localStorage` when used in a browser.

Files:
- `todo.js` — main script with functions: `addTask`, `completeTask`, `deleteTask`, `listTasks`, `loadTasks`, `saveTasks`.
- `todo.js` — main script with functions: `addTask`, `completeTask` (toggles done state), `deleteTask`, `listTasks`, `listPending`, `loadTasks`, `saveTasks`.

Usage (Node):
1. Run the demo that executes when `todo.js` is run directly:

```powershell
node c:\Users\91773\Desktop\trialtodolist\todo.js
```

You will see a demo sequence that adds two tasks, lists tasks, completes the first task, deletes the second, and lists again.

Usage (in an interactive Node REPL):
```js
const todo = require('./todo.js');

todo.loadTasks();
todo.addTask('Example task');
todo.listTasks();
// todo.completeTask(0);
// todo.deleteTask(0);
```

Other helpful functions:
- `todo.completeTask(index)` now toggles the task's done state (so calling it twice will undo the completion).
- `todo.listPending()` prints only tasks that are not yet completed.

Usage (browser console):
1. Include `todo.js` in a web page with a `<script>` tag.
2. In the browser console, call functions directly (they will use `localStorage` automatically to persist tasks):

```html
<script src="todo.js"></script>
<script>
  // If the functions are not global (depending on bundling), attach them to window in the file.
  // Then in console:
  loadTasks();
  addTask('Browser task');
  listTasks();
</script>
```

Notes:
- Indexes are zero-based (the first task is index 0).
- The code checks for `localStorage` and silently ignores persistence if not available (for example when running with Node).
- The demo run when calling `node todo.js` demonstrates the functions.

Feel free to adapt this file to add interactive CLI input, file-based persistence for Node, or a small web UI.
=======
# html-basics
HTML concepts and structure 
>>>>>>> 9f778b6152d3ec37a6dece3de2a80530aec6e01b
