document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        var li = document.createElement("li");
        li.innerHTML = `
            <span>${taskInput.value}</span>
            <button onclick="removeTask(this)">Remove</button>
        `;
        taskList.appendChild(li);

        saveTask(taskInput.value);
        taskInput.value = "";
    }
}

function removeTask(button) {
    var taskList = document.getElementById("taskList");
    var li = button.parentElement;
    taskList.removeChild(li);

    var tasks = getSavedTasks();
    var taskText = li.querySelector("span").innerText;
    var taskIndex = tasks.indexOf(taskText);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        saveTasksToStorage(tasks);
    }
}

function saveTask(task) {
    var tasks = getSavedTasks();
    tasks.push(task);
    saveTasksToStorage(tasks);
}

function getSavedTasks() {
    var savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var taskList = document.getElementById("taskList");
    var tasks = getSavedTasks();

    tasks.forEach(function (task) {
        var li = document.createElement("li");
        li.innerHTML = `
            <span>${task}</span>
            <button onclick="removeTask(this)">Remove</button>
        `;
        taskList.appendChild(li);
    });
}
