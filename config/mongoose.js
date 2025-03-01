require("dotenv").config();
const mongoose = require("mongoose");

// connecting mongoose to its default server and ecommerceDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
