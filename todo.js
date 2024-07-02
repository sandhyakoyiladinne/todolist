const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const templateItem = document.querySelector(".listHere");
const apiUrl = "https://todolistapi-ch51.onrender.com"; // Adjusted base URL
let editToDoId = null;

const handleAdd = async () => {
  const todoText = todoInput.value.trim();

  const payload = {
    title: todoText,
    completed: false,
  };

  if (todoText === "") {
    alert("Please enter something....");
    return;
  }

  if (editToDoId) {
    await updateToDo(editToDoId, payload);
    editToDoId = null;
    addBtn.textContent = "Add";
  } else {
    await addTodoItem(payload);
  }

  todoInput.value = "";
  await getTodos();
};

async function addTodoItem(payload) {
  try {
    const response = await fetch(apiUrl + "/todos", { // Corrected endpoint path
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Something went wrong..............");
    }
    alert("Given information is saved... Thank you...");
  } catch (error) {
    console.error("Error", error);
  }
}

async function updateToDo(id, payload) {
  try {
    const response = await fetch(`${apiUrl}/todos/${id}`, { // Corrected endpoint path
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Something went wrong..............");
    }
    alert("We updated the information....Thank you...");
  } catch (error) {
    console.error("Error", error);
  }
}

async function deleteToDo(id, todoItem) {
  try {
    const response = await fetch(`${apiUrl}/todos/${id}`, { // Corrected endpoint path
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Something went wrong..............");
    }
    alert("Delete the Row");
    todoItem.remove();
  } catch (error) {
    console.error("Error", error);
  }
}

async function getTodos() {
  try {
    const response = await fetch(apiUrl + "/todos", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Didn't information from the Database ..........");
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Unexpected response format");
    }
    
    todoList.innerHTML = "";
    data.forEach((todo) => addTodoToDOM(todo));
  } catch (error) {
    console.error("Error", error);
  }
}

const addTodoToDOM = (todo) => {
  const todoItem = templateItem.cloneNode(true);
  todoItem.style.display = "block"; // Make sure the cloned item is visible
  todoItem.innerHTML = `
    <span> ${todo.title} </span>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  `;
  todoList.appendChild(todoItem);

  const editBtn = todoItem.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => handleEdit(todo._id, todo.title));

  const deleteBtn = todoItem.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => handleDelete(todo._id, todoItem));
};

const handleDelete = async (id, todoItem) => {
  await deleteToDo(id, todoItem);
};

const handleEdit = (id, title) => {
  todoInput.value = title;
  editToDoId = id;
  addBtn.textContent = "Edit ToDO";
};

addBtn.addEventListener("click", handleAdd);
window.addEventListener("load", getTodos);
