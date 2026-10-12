const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">✖</button>
      </div>
    `;

    list.appendChild(li);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  tasks.push({ text: input.value, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
});

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();
