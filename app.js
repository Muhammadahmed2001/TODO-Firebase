let todoBtn = document.getElementById("todo-btn");
let todoList = document.getElementById("todo-list");
let todoInput = document.getElementById("todoInput")




let addTodo = ()=>{
    todoList.innerHTML = `
    <li>
    ${todoInput.value}
    <button>update</button>
    <button onclick="deleteTodo()">delete</button>
  </li>
        ` + todoList.innerHTML 
        todoInput.value = ""
}

todoBtn && todoBtn.addEventListener("click",addTodo);

let deleteTodo = ()=>{
  event.target.parentNode.remove()
}
window.deleteTodo = deleteTodo;








