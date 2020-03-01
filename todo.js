const todoForm = document.querySelector('.todo-input-form'),
todoInput = todoForm.querySelector('input'),
todoList = document.querySelector('.todo--shown');

const TODOS_LS = 'todos';
let todos = [];

function deleteTodos(event){
    const btn = event.target;
    const div = btn.parentNode;
    todoList.removeChild(div);
    const cleanTodos = todos.filter(function(todo){
        return todo.id !== parseInt(div.id); //Cause todo.id is integer but div.id is string.
    });
    todos = cleanTodos;
    saveTodos();
}

function saveTodos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(todos)); //Turn todos into string.
}

//Paint the todo on the page.
function paintTodos(text){
    const li = document.createElement("li"); //Create li element on html.
    const delBtn = document.createElement("button"); //Create delete button.
    delBtn.innerHTML = "X"; //Place 'X' on the button.
    delBtn.className ="btn";
    delBtn.addEventListener('click',deleteTodos); //If user click the delBtn, then execute the function named deleteTodos.
    const div = document.createElement("div");
    const newId = todos.length+ 1;
    div.innerText = text; 
    li.appendChild(div);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);
    const todoObj = {
        text: text,
        id : newId
    };
    todos.push(todoObj);
    saveTodos();
}

function handleSubmit(){
    event.preventDefault();
    const currentVal = todoInput.value; //assign value of input at the currentVal.
    paintTodos(currentVal); //Paint the currentVal on the web.
    todoInput.value = ""; //Make input text empty.
}

function loadTodos(){
    const loadedTodo = localStorage.getItem(TODOS_LS);
    if(loadedTodo !== null){
        const parsedTodos = JSON.parse(loadedTodo);
        parsedTodos.forEach(function(todo){
            paintTodos(todo.text);
        })
    }
}

function init(){
    loadTodos();
    todoForm.addEventListener('submit',handleSubmit);
}

init();