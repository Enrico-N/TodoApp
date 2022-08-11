require("dotenv").config;

const PORT = 5000;
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(express.json());

let db;
let dbConnectionStr =
  "mongodb+srv://user_name:pass_word@cluster0.v2wdcft.mongodb.net/?retryWrites=true&w=majority";
let dbName = "todo";

MongoClient.connect(dbConnectionStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  console.log(`Connect to ${dbName} Database`);
  db = client.db(dbName);
});

app.get("./", async (request, response) => {
  const data = await request.json();
  console.log(data);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on`, 5000);
});
