require("dotenv").config({ path: "../.env" });

//IMPORTS
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(express.json());

//MONGODB DATABASE
let db;
let dbConnectionStr = process.env.DB_STRING;
let dbName = "todo";

// const connect = async () => {
//   if (!dbConnectionStr) {
//     throw new Error(
//       "Environment Variable MONGO_CONNECTION_STRING must be setup to use API"
//     );
//   }

//   return promisify(
//     MongoClient.connect(dbConnectionStr, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//   );
// };

//CONNECTION TO MONGODB DATABASE

getConnection = async () => {
  try {
    const client = await MongoClient.connect(dbConnectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to ${dbName} Database`);
    db = await client.db(dbName);
  } catch (error) {
    console.error(`Failed to Connect to ${dbName} Database because ${error}`);
  }
};

//PULL DATA FROM MONGODB TO DISPLAY ON CLIENT

app.get("/", async (request, response, next) => {
  try {
    const todoItem = await db.collection("todos").find().toArray();
    const itemsLeft = await db
      .collection("todos")
      .countDocuments({ completed: false });

    return response.json({ items: todoItem, left: itemsLeft });
    // response.render("./", { items: todoItem, left: itemsLeft });
  } catch (error) {
    console.error(error);
  }
});

app.get("/addTodo", async (request, response, next) => {
  try {
    await db
      .collection("todos")
      .insertOne({ thing: request.body.todoItem, completed: false })(
      (result) => {
        console.log("Todo Added");
        response.redirect("/");
      }
    );
  } catch {
    (error) => console.error(error);
  }
});

getConnection();

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on`, `${PORT}`);
});
