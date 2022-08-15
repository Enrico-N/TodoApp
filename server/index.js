require("dotenv").config({ path: "./.env" });

//IMPORTS
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

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

//CONNECTION TO MONGODB DATABASE
MongoClient.connect(dbConnectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async (client) => {
  try {
    console.log(`Connect to ${dbName} Database`);
    db = await client.db(dbName);
  } catch (error) {
    console.error(error);
  }
};

app.get("./", async (request, response) => {
  const itemData = await db.collection("todos").find().toArray();
  const itemsLeft = await db
    .collection("todos")
    .countDocuments({ completed: false });
  // response.render("../../.index.html", { items: todoItems, left: itemsLeft });
  console.log(itemData);
});

app.post("/addTodo", (request, response) => {
  db.collection("todos")
    .insertOne({ thing: request.body.todoItem, completed: false })
    .then((result) => {
      console.log("Todo Added");
      response.redirect("/");
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on`, `${PORT}`);
});
