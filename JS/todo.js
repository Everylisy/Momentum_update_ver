const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";
let toDos = [];

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


function deleteToDo(event) {
    const deleteLi = event.target.parentElement;
    deleteLi.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(deleteLi.id));
    saveTodos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;

    const span = document.createElement("span");
    span.innerText = newTodo.text;

    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);

    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
};


function handleToDoSumbmit(e) {
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObject = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObject);
    paintToDo(newTodoObject);
    saveTodos();
};

toDoForm.addEventListener("submit", handleToDoSumbmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos) {
    const parsedToDos = JSON.parse(savedTodos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

