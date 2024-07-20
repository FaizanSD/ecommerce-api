require("dotenv").config();
// importing required packages
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/mongoose");

// initializing express
const app = express();

// using body parser to parse over the request body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// using routes
app.use("/products", require("./routes/products"));

const PORT = process.env.PORT || 3000;
// starting the server
app.listen(PORT, function () {
  console.log("server is running on port:", PORT);
});
