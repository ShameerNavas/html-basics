// Simple console-based to-do list manager
// Functions: addTask(taskName), completeTask(index), deleteTask(index), listTasks()
// Optional localStorage persistence when running in a browser

const TASKS_KEY = 'todo_tasks';

let tasks = [];

function _syncWindowTasks() {
  try {
    if (typeof window !== 'undefined' && window) {
      window.tasks = tasks;
    }
  } catch (e) {
    // ignore
  }
}

function saveTasks() {
  try {
    if (typeof localStorage !== 'undefined' && localStorage) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
  } catch (e) {
    // localStorage might not be available (e.g., Node). Ignore silently.
  }
  _syncWindowTasks();
}

function loadTasks() {
  try {
    if (typeof localStorage !== 'undefined' && localStorage) {
      const raw = localStorage.getItem(TASKS_KEY);
      tasks = raw ? JSON.parse(raw) : [];
      return;
    }
  } catch (e) {
    // ignore
  }
  // Fallback for non-browser environments
  tasks = tasks || [];
  _syncWindowTasks();
}

function addTask(taskName) {
  if (!taskName || String(taskName).trim() === '') {
    console.log('addTask: taskName is required');
    return;
  }
  const task = { name: String(taskName), done: false };
  tasks.push(task);
  saveTasks();
  _syncWindowTasks();
  console.log(`Added task #${tasks.length - 1}: "${task.name}"`);
}

function completeTask(index) {
  const i = Number(index);
  if (!Number.isInteger(i) || i < 0 || i >= tasks.length) {
    console.log(`completeTask: invalid index ${index}`);
    return;
  }
  // Toggle done state so the same function can also "undo" a completion from the UI
  tasks[i].done = !tasks[i].done;
  saveTasks();
  _syncWindowTasks();
  console.log(`Task #${i} ${tasks[i].done ? 'marked as completed' : 'marked as not completed'}: "${tasks[i].name}"`);
}

function listPending() {
  if (!tasks || tasks.length === 0) {
    console.log('No tasks found.');
    return;
  }
  const pending = tasks.map((t, i) => ({ t, i })).filter(x => !x.t.done);
  if (pending.length === 0) {
    console.log('No pending (not completed) tasks.');
    return;
  }
  console.log('Pending tasks:');
  pending.forEach(({ t, i }) => console.log(`#${i} [ ] ${t.name}`));
}

function deleteTask(index) {
  const i = Number(index);
  if (!Number.isInteger(i) || i < 0 || i >= tasks.length) {
    console.log(`deleteTask: invalid index ${index}`);
    return;
  }
  const removed = tasks.splice(i, 1)[0];
  saveTasks();
  _syncWindowTasks();
  console.log(`Deleted task #${i}: "${removed.name}"`);
}

function listTasks() {
  if (!tasks || tasks.length === 0) {
    console.log('No tasks found.');
    return;
  }
  console.log('Current tasks:');
  tasks.forEach((t, i) => {
    const mark = t.done ? '[x]' : '[ ]';
    console.log(`#${i} ${mark} ${t.name}`);
  });
}

// Export functions for Node usage (optional)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { addTask, completeTask, deleteTask, listTasks, listPending, loadTasks, saveTasks, tasks };
}

// Demo when run directly with Node: adds two tasks, lists, completes first, deletes second, lists again.
if (typeof require !== 'undefined' && require.main === module) {
  loadTasks();
  console.log('\n--- To-do list demo (console) ---');
  console.log('Starting tasks:');
  listTasks();

  console.log('\nAdding tasks...');
  addTask('Buy milk');
  addTask('Write code');

  console.log('\nAfter adding:');
  listTasks();

  console.log('\nCompleting task #0...');
  completeTask(0);
  console.log('\nAfter completing:');
  listTasks();

  console.log('\nDeleting task #1...');
  deleteTask(1);
  console.log('\nAfter deleting:');
  listTasks();

  console.log('\n--- Demo finished ---\n');
}
