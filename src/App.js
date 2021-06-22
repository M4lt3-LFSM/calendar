import React from "react";
import "./App.css";
export const App = () => {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Geschirrspüler aufräumen", done: false },
    { id: 2, text: "Wäsche waschen", done: false },
    { id: 3, text: "Zimmer aufräumen", done: false },
  ]);

  return (
    <div className="App">
      <h1>To-Do-List</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
};

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    // confused by this code? Here's what it says:
    // if a todo's id is equal to the one we clicked on,
    // just update that todo's done value to its opposite,
    // otherwise, do nothing (return it)
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done,
          }
        : t
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : "",
          }}
          key={todo.id}
        >
          {todo.text}
          <DeleteTodo todos={todos} todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

const AddTodo = ({ setTodos }) => {
  const inputRef = React.useRef();
  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(event.target.elements.addTodo.value);
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: 4,
      text,
      done: false,
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    });
  };

  return (
    <form onSubmit={handleAddTodo}>
      <input name="addTodo" placeholder="Add Todo" />
      <button type="submit">Submit</button>
    </form>
  );
};

const DeleteTodo = ({ todos, setTodos, todo }) => {
  return (
    <button
      onClick={() => {
        setTodos(todos.filter((x) => x.id !== todo.id));
      }}
    >
      X
    </button>
  );
};
