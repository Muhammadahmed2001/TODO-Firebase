let todoBtn = document.getElementById("todo-btn");
let todoList = document.getElementById("todo-list");
let todoInput = document.getElementById("todoInput");
let deleteBtn = document.getElementById("delete-all");

let addTodo = () => {
  todoList.innerHTML =
    `
    <li class="li-item">
    ${todoInput.value}
    <button class="edit_btn">Edit</button>
    <button onclick="deleteTodo()">delete</button>
  </li>
        ` + todoList.innerHTML;
  todoInput.value = "";
  addEventListener();
};
todoBtn && todoBtn.addEventListener("click", addTodo);

let addEventListener = () => {
  let edit_btn = document.querySelectorAll(".edit_btn");
  edit_btn.forEach((button, i) => {
    button.addEventListener("click", () => {
      console.log();
      editBtn(i);
    });
  });
};

const editBtn = (index) => {
  let userPromt = prompt("enter a update value", "hello");
  let li_item = document.querySelectorAll(".li-item");
  event.target.parentNode.firstChild.nodeValue = userPromt;
};

let deleteAll = () => {
  todoList.innerHTML = "";
};

deleteBtn && deleteBtn.addEventListener("click", deleteAll);

let deleteTodo = () => {
  event.target.parentNode.remove();
};
window.deleteTodo = deleteTodo;
