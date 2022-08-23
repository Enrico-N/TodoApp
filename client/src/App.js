import React, { useEffect } from "react";
import Todo from "./components/Todo.js";
import "./App.css";

const URL = process.env.REACT_APP_URL;

console.log(URL);

async function getTodo() {
  try {
    let response = await fetch("http://localhost:5000/");
    let data = await response;
    return data;
  } catch (error) {
    console.error(error);
  }
}

const App = () => {
  // const [count, setCount] = useState(0);
  // const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="App">
      <Todo />
    </div>
  );
};

export default App;
