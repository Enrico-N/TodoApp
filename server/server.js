require("dotenv").config;

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on`, 5000);
});
