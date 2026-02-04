// ui.js — small glue layer to render the existing todo data in the browser
(function () {
  function qs(sel) { return document.querySelector(sel); }

  function renderTasks() {
    const list = document.getElementById('tasksList');
    list.innerHTML = '';
    const source = window.tasks || [];
    if (!source || source.length === 0) {
      list.innerHTML = '<li class="empty">No tasks yet</li>';
      return;
    }
    source.forEach((t, i) => {
      const li = document.createElement('li');
      if (t.done) li.classList.add('done');

      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = t.name;

      const controls = document.createElement('div');
      controls.className = 'controls';

      const completeBtn = document.createElement('button');
      completeBtn.className = 'complete';
      completeBtn.dataset.index = i;
      completeBtn.textContent = t.done ? 'Undo' : 'Complete';

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete';
      deleteBtn.dataset.index = i;
      deleteBtn.textContent = 'Delete';

      controls.appendChild(completeBtn);
      controls.appendChild(deleteBtn);

      li.appendChild(name);
      li.appendChild(controls);
      list.appendChild(li);
    });
  }

  function attachHandlers() {
    const form = qs('#addForm');
    const input = qs('#newTask');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value && input.value.trim();
      if (!val) return;
      if (typeof addTask === 'function') {
        addTask(val);
      } else {
        // fallback if todo.js wasn't loaded as expected
        window.tasks = window.tasks || [];
        window.tasks.push({ name: val, done: false });
        if (typeof saveTasks === 'function') saveTasks();
      }
      input.value = '';
      renderTasks();
    });

    document.getElementById('tasksList').addEventListener('click', (e) => {
      const btn = e.target;
      if (!btn || !btn.dataset) return;
      const idx = Number(btn.dataset.index);
      if (btn.classList.contains('complete')) {
        if (typeof completeTask === 'function') completeTask(idx);
        else {
          window.tasks[idx].done = !window.tasks[idx].done;
          if (typeof saveTasks === 'function') saveTasks();
        }
        renderTasks();
      } else if (btn.classList.contains('delete')) {
        if (typeof deleteTask === 'function') deleteTask(idx);
        else {
          window.tasks.splice(idx, 1);
          if (typeof saveTasks === 'function') saveTasks();
        }
        renderTasks();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (typeof loadTasks === 'function') loadTasks();
    attachHandlers();
    renderTasks();
  });
})();
