import React, { useState, useEffect } from "react";

// const Link = () => {
//   const { linkToken, dispatch } = useContext(Context);

//   const onSuccess = React.useCallback(
//     (public_token: string) => {
//       // send public_token to server
//       const setToken = async () => {
//         const response = await fetch("/api/set_access_token", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
//           },
//           body: `public_token=${public_token}`,
//         });

const Todo = () => {
  const [data, setData] = useState({});
  // const [loading, setLoading] = useState(false);

  const URL = "http://localhost:5000/";

  async function displayTodo() {
    fetch(URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  // async function addTodo() {
  //   fetch(URL + "addTodo", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(),
  //   })
  //     .then((response) => response)
  //     .then((data) => setData(data));
  //   console.log(data);
  // }

  useEffect(() => {
    displayTodo();
  }, []);

  // const todoList = data.items.map((todo) => (
  //   <div key={todo.id}>
  //     <li>{todo.thing}</li>
  //     <li>{todo.completed}</li>
  //   </div>
  // ));

  return (
    <div className="Todo">
      <h1>Todo List:</h1>
      <p>Things to do:</p>
      <div>
        {data.items && data.items.length > 0
          ? data.items.map((todo) => {
              return <div key={todo.thing}>{todo.thing}</div>;
            })
          : "Loading..."}
      </div>

      {/* <ul>{todoList}</ul> */}

      <p>Items Left: {data.left}</p>

      <h2>Add A Todo:</h2>
      <form action="/addTodo" method="POST">
        <input type="text" placeholder="Thing To Do" name="todoItem" />
        <input type="submit" />
      </form>
    </div>
  );
};
export default Todo;
