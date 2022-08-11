require("dotenv").config({ path: "../.env" });

const express = require("express");
const app = express();
const PORT = process.env.PORT;

const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(express.json());

let db;
let dbConnectionStr = process.env.DB_STRING;
let dbName = "todo";

MongoClient.connect(dbConnectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  console.log(`Connect to ${dbName} Database`);
  db = client.db(dbName);
});

app.get("./", async (request, response) => {
  const itemData = await db.collection("todos").find().toArray();
  const itemsLeft = await db
    .collection("todos")
    .countDocuments({ completed: false });
  response.render("../.index.html", { items: todoItems, left: itemsLeft });
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
