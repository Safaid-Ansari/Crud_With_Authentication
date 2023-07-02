const mongoose = require("mongoose");
const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database ---->");
});

module.exports = db;
