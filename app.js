let todoBtn = document.getElementById("todo-btn");
let todoList = document.getElementById("todo-list");
let todoInput = document.getElementById("todoInput");
let deleteBtn = document.getElementById("delete-all");

let addTodo = () => {
  todoList.innerHTML =
    `
    <li class="li-item">
    <input class="li-input" type="text" value="${todoInput.value}" disabled >
    <button id="edit_btn">Edit</button>
    <button onclick="deleteTodo()">delete</button>
  </li>
        ` + todoList.innerHTML;
  todoInput.value = "";
  addEventListener();
  
};
todoBtn && todoBtn.addEventListener("click", addTodo);
let edit = false
let addEventListener = () => {
  let edit_btn = document.getElementById("edit_btn");
  edit_btn.addEventListener("click", () => {
    console.log(event.target.parentNode.childNodes[1].value)
    if(edit){
      event.target.parentNode.childNodes[1].disabled = true
      event.target.parentNode.childNodes[1].blur()
      event.target.childNodes[0].nodeValue = "Edit"
      // todoInput.value = event.target.parentNode.childNodes[1].value
      
      console.log(event.target.parentNode.childNodes[1].value , todoInput.value);
      edit = false
    }else{
      event.target.parentNode.childNodes[1].disabled = false
      event.target.parentNode.childNodes[1].focus()
      event.target.childNodes[0].nodeValue = "Update"
      console.log(event.target.parentNode.childNodes[1].value);
      edit = true
    }
  });
};

// const editBtn = (index) => {
//   let userPromt = prompt("enter a update value", "hello");
//   let li_item = document.querySelectorAll(".li-item");
//   event.target.parentNode.firstChild.nodeValue = userPromt;
// };

let deleteAll = () => {
  todoList.innerHTML = "";
};

deleteBtn && deleteBtn.addEventListener("click", deleteAll);

let deleteTodo = () => {
  event.target.parentNode.remove();
};
window.deleteTodo = deleteTodo;
