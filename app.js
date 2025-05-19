const inputBox = document.querySelector("#inputBox");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");

let editTodo = null;

// Function to add to do
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something in your to do");
    return false;
  }

  if (addBtn.value === "Edit") {
    // Passing the original text to editLocalTodos function before edit it in the todoList
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inputText;
    editLocalTodos(inputText);
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    //   created p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    //   created edit button tag (Edit)

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "edit");

    li.appendChild(editBtn);

    //   created delete button tag (Remove)
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "delete");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    //   empty input value after added
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
};
// Function to update [edit/delete] to do

const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;
  }
};

// Function to save local todo 
const saveLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to get  local todo 

const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      //   created p tag
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      //   created edit button tag (Edit)

      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("btn", "edit");

      li.appendChild(editBtn);

      //   created delete button tag (Remove)
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      deleteBtn.classList.add("btn", "delete");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
};

// Function to delete local todo 

const deleteLocalTodos = (todo)=>{
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    } 

    let todoText =  todo.children[0].innerHTML;
 let todoIndex = todos.indexOf(todoText)
todos.splice(todoIndex, 1);
localStorage.setItem('todos', JSON.stringify(todos))

//  Array function slice / splice 

 console.log(todoIndex);

}

const editLocalTodos = (todo)=>{
let todos = JSON.parse(localStorage.getItem("todos"))
let todoIndex = todos.indexOf(todo);
todos[todoIndex] = inputBox.value;
localStorage.setItem("todos", JSON.stringify(todos))
}


document.addEventListener('DOMContentLoaded', getLocalTodos);

addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
