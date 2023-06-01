// Load tasks from localStorage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => {
  const li = createTaskElement(task.task, task.completed);
  taskList.appendChild(li);
});

document.getElementById('taskInput').addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    addTask();
  }
});

document.getElementById('addTask').addEventListener('click', addTask);

document.getElementById('clearAll').addEventListener('click', clearAll);

function createTaskElement(task, completed) {
  const li = document.createElement("li");
  const checkboxDiv = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const taskText = document.createElement("span");
  const deleteBtn = document.createElement("button");

  checkboxDiv.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.id = "taskCheckbox" + (taskList.children.length + 1);
  label.htmlFor = checkbox.id;
  taskText.classList.add("task-text");
  taskText.textContent = task;
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener('click', function() {
    taskList.removeChild(li);
    updateLocalStorage();
  });
  checkboxDiv.appendChild(checkbox);
  checkboxDiv.appendChild(label);
  li.appendChild(checkboxDiv);
  li.appendChild(taskText);
  li.appendChild(deleteBtn);

  if (completed) {
    checkbox.checked = true;
    li.classList.add('completed');
  }

  checkbox.addEventListener('change', function() {
    if (this.checked) {
      li.classList.add('completed');
    } else {
      li.classList.remove('completed');
    }
    updateLocalStorage();
  });

  return li;
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (taskInput.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  const li = createTaskElement(taskInput.value);
  taskList.appendChild(li);

  taskInput.value = "";

  updateLocalStorage();
}

function clearAll() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  localStorage.removeItem('tasks');
}

function updateLocalStorage() {
  const tasks = [];
  const taskElements = document.querySelectorAll('#taskList li');
  taskElements.forEach(taskElement => {
    const taskText = taskElement.querySelector('.task-text').textContent;
    const completed = taskElement.classList.contains('completed');
    tasks.push({ task: taskText, completed: completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create task elements from localStorage
if (tasks.length > 0) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = createTaskElement(task.task, task.completed);
    taskList.appendChild(li);
  });
}
