function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function toggleTask(taskId, isChecked) {
  // const csrftoken = getCookie("csrftoken");
  console.log(taskId, isChecked);
  fetch("/toggle-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: taskId || 0,
      completed: isChecked || false,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Task updated successfully");
      } else {
        console.error("Failed to update task");
      }
    });
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded');
  document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const task = document.getElementById('task').value;
    createTask(task);
  });
});

function createTask(task) {
  console.log(task);
  fetch("/create-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: task || "",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Task created successfully");
      } else {
        console.error("Failed to create task");
      }
    });
}
