import React, { useEffect } from "react";
import Todo from "./components/Todo";
import "./App.css";

// import Todo from "Todo.js";

const URL = process.env.REACT_APP_URL;

console.log(URL);

async function getTodo() {
  let response = await fetch("/api/addTodo");
  let data = await response;
  console.log(data);
  return data;
}

const App = () => {
  useEffect(() => {
    getTodo(URL);
  }, []);

  return (
    <div className="App">
      <h1>Todo List: </h1>
      <Todo />

      <h2>Add A Todo:</h2>

      <form action="/addTodo" method="POST">
        <input type="text" placeholder="Thing To Do" name="todoItem" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default App;
