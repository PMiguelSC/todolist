function getTasksFromStorage() {
    var tasks = localStorage.getItem("tasks");
  
    if (tasks) {
      return JSON.parse(tasks);
    } else {
      return [];
    }
  }
  

  function updateTasksInStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  

  function loadTasks() {
    var checklist = document.getElementById("checklist");
    var tasks = getTasksFromStorage();
  
    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];
  
      var li = document.createElement("li");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.onclick = function() {
        toggleCheck(this);
      };
  
      var text = document.createTextNode(task.description);
  
      li.appendChild(checkbox);
      li.appendChild(text);
      checklist.appendChild(li);
    }
  }
  

  function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskDescription = taskInput.value;
  
    if (taskDescription.trim() !== "") {
      var checklist = document.getElementById("checklist");
  
      var task = {
        description: taskDescription,
        completed: false
      };
  
      var li = document.createElement("li");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.onclick = function() {
        toggleCheck(this);
      };
  
      var text = document.createTextNode(task.description);
  
      li.appendChild(checkbox);
      li.appendChild(text);
      checklist.appendChild(li);
  
      var tasks = getTasksFromStorage();
      tasks.push(task);
      updateTasksInStorage(tasks);
  
      taskInput.value = "";
    }
  }
  

  function toggleCheck(checkbox) {
    var listItem = checkbox.parentNode;
    var tasks = getTasksFromStorage();
    var taskIndex = Array.prototype.indexOf.call(listItem.parentNode.children, listItem);
  
    if (checkbox.checked) {
      listItem.classList.add("completed");
      tasks[taskIndex].completed = true;
    } else {
      listItem.classList.remove("completed");
      tasks[taskIndex].completed = false;
    }
  
    updateTasksInStorage(tasks);
  }
  

  function deleteCompletedTasks() {
    var completedTasks = document.getElementsByClassName("completed");
    var tasks = getTasksFromStorage();
  
    while (completedTasks.length > 0) {
      var listItem = completedTasks[0];
      var taskIndex = Array.prototype.indexOf.call(listItem.parentNode.children, listItem);
      listItem.parentNode.removeChild(listItem);
      tasks.splice(taskIndex, 1);
    }
  
    updateTasksInStorage(tasks);
  }
  

  loadTasks();
  