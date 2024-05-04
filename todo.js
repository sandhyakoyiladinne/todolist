const todoinput = document.getElementById("todo-input");
const addbtn = document.getElementById("addbtn");
const todoList = document.querySelector(".todo-list");

addbtn.addEventListener('click', addData);
let todos = loadTodos();

function addData() {
    const uniqueId = Math.floor(Math.random() * 99999);
    const todoText = todoinput.value.trim();

    if (todoText !== '') {
        const newTodo = {
            id: uniqueId,
            text: todoText,
            done: false
        };
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoinput.value = '';
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todosString = localStorage.getItem('todos');
    return todosString ? JSON.parse(todosString) : [];
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        
        // Checkbox for marking task as done
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.done;
        checkbox.addEventListener('change', () => {
            toggleTodo(todo.id);
        });
        todoItem.appendChild(checkbox);
        
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.addEventListener('click', () => {
            deleteTodo(todo.id);
        });
        todoItem.appendChild(deleteButton);
        
        const textSpan = document.createElement('span');
        textSpan.textContent = todo.text;
        todoItem.appendChild(textSpan);
        
        todoItem.setAttribute('data-id', todo.id);
        
        if (todo.done) {
            todoItem.classList.add('done'); // Apply 'done' class for strike-through effect
        }
        
        todoList.appendChild(todoItem);
    });
}


function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

renderTodos();
