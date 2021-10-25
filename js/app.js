const body = document.body;
const input = document.querySelector("input[type=text]");
const overlay = document.querySelector(".overlay");

const todosList = document.querySelector(".todos-list");
const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input[type=text]");
// 2)*se parsea el array para pasar lo guardado en localst como json a obj js
// (en caso de que haya notas en el local,sino queda un array simple)
const todos = [] || JSON.parse(localStorage.getItem("todos"));

// se crea objeto nota
function createTodo(e) {
  e.preventDefault();
  const todoContent = todoInput.value;
  const todo = {
    content: todoContent,
  };
  todos.push(todo);
  blockTodoList(todos);
  storeTodos(todos);
  todoForm.reset();
}
// se crea el template de la nota a guardar recorriendo array con .map
//  **A)se agrega "data-id i" para identificar dinamicamente cada nota creada con su respectivo boton
function blockTodoList() {
  todosList.innerHTML = todos.map((todo, i) => {
    return `<p data-id= "${i}" class="todo">${todo.content}
    <button class="btn btn-success complete">✅</button>
    <button class="btn btn-danger remove">𝐗</button>
    </p>`;
  });
}
// 1)* guardada nota en LocalStorage,para eso se transforma el objet js en Json data
// Para luego parsear el array inicial "todos"
function storeTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
// funcion removiendo nota
// ** B) se utiliza "data" para dar con el id
function removeTodo(e) {
  if (e.target.matches(".remove")) {
    //   console.dir(e.target);
    const identificador = e.target.parentNode.dataset.id;
    todos.splice(identificador, 1);
    blockTodoList(todos);
    storeTodos(todos);
  }
}
// funcion de Hecho
function done(e) {
  if (e.target.matches(".complete")) {
    const identificador = e.target.parentNode;
    identificador.classList.toggle("completed");
  }
}

// FUNCIONALDADES A LOS BOTONES
todoForm.addEventListener("submit", createTodo);
todosList.addEventListener("click", removeTodo);
todosList.addEventListener("click", done);

// funciones
function showFloater() {
  body.classList.add("show-floater");
}
// enfoque y desefoque de la nota
function closeFloater() {
  if (body.classList.contains("show-floater"))
    body.classList.remove("show-floater");
}

// eventos de enfoque y desenfoque de Nota
input.addEventListener("focusin", showFloater);
overlay.addEventListener("click", closeFloater);
