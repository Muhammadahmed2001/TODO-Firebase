import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  collection,
  addDoc,
  getFirestore,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbiomcJMnlH9b0zyHQFiUCJl08J_i6u6g",
  authDomain: "todo-firebase-9f350.firebaseapp.com",
  projectId: "todo-firebase-9f350",
  storageBucket: "todo-firebase-9f350.appspot.com",
  messagingSenderId: "595012601643",
  appId: "1:595012601643:web:b368293310ff439b6a676e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let todoBtn = document.getElementById("todo-btn");
let todoList = document.getElementById("todo-list");
let todoInput = document.getElementById("todoInput");
let deleteBtn = document.getElementById("delete-all");
let time = moment().format(`l LT`);
let todoIds = []
// console.log(time)

let getTodo = () => {
  onSnapshot(collection(db, "todos"), (data) => {
    data.docChanges().forEach((todo) => {
      // console.log("data======>", todo);
      if (todo.type === "removed") {
        let dtodo = document.getElementById(todo.doc.id);
        if(dtodo){

          dtodo.remove();
        }
      } else if (todo.type === "added") {
        todoIds.push(todo.doc.id)
        // console.log(typeof(todo.doc.data().value))
    
          todoList.innerHTML =
          `
          <li id="${todo.doc.id}" class="li-item">
          <input class="li-input" type="text" value="${
            todo.doc.data().value
          }" disabled >
          <p>${todo.doc.data().time}</p>
          <button onclick="editBtn('${todo.doc.id}')">Edit</button>
          <button onclick="deleteTodo('${todo.doc.id}')">delete</button>
          </li>
          ` + todoList.innerHTML;
       
          
      }
    });
  });
};
getTodo();

let addTodo = async () => {
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      value: todoInput.value,
      time: time,
    });
    console.log("Document written with ID: ", docRef.id);
    console.log(err);
  } catch (err) {}

  todoInput.value = "";

  // todoList.innerHTML =
  //   `
  //   <li class="li-item">
  //   <input class="li-input" type="text" value="${todoInput.value}" disabled >
  //   <button id="edit_btn">Edit</button>
  //   <button onclick="deleteTodo()">delete</button>
  // </li>
  //       ` + todoList.innerHTML;
  // addEventListener();
};
todoBtn && todoBtn.addEventListener("click", addTodo);

// let editBtn = document.getElementById("edit_btn");
let edit = false;
let editBtn = async (id) => {
  // console.log(event.target.parentNode.childNodes[1].value);
  if (edit) {
    // console.log(event.target);
    event.target.parentNode.childNodes[1].disabled = true;
    event.target.parentNode.childNodes[1].blur();
    event.target.childNodes[0].nodeValue = "Edit";
    // console.log(event.target.parentNode.childNodes[1].value);
    await updateDoc(doc(db, "todos", id), {
      value: event.target.parentNode.childNodes[1].value,
      
    });
    // todoInput.value = event.target.parentNode.childNodes[1].value
    
    edit = false;
  } else {
    // console.log(event.target);
    event.target.parentNode.childNodes[1].disabled = false;
    event.target.parentNode.childNodes[1].focus();
    event.target.childNodes[0].nodeValue = "Update";
    // console.log(event.target.parentNode.childNodes[1].value);
    edit = true;
  }
};

// const editBtn = (index) => {
  //   let userPromt = prompt("enter a update value", "hello");
  //   let li_item = document.querySelectorAll(".li-item");
  //   event.target.parentNode.firstChild.nodeValue = userPromt;
  // };
  
  let deleteAll = async () => {
    // console.log(todoIds)
    todoList.innerHTML = "";
    let arr = []
   for(var i = 0; i<todoIds.length;i++){
    arr.push(await deleteDoc(doc(db, "todos", todoIds[i])))
   }
   Promise.all(arr)
   .then((res)=>{
    console.log("All data has been deleted")

   })
   .catch(err =>{
    console.log(err)
   })
       
    };
    
  
  
  deleteBtn && deleteBtn.addEventListener("click", deleteAll);
  
let deleteTodo = async (id) => {
  await deleteDoc(doc(db, "todos", id));
  console.log("Todo delete");
  // event.target.parentNode.remove();
};
window.deleteTodo = deleteTodo;
window.editBtn = editBtn;
