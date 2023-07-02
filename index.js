const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8000;
const db = require("./config/database");
const swaggerConfig = require("./config/swagger");
app.use(cors());
app.use(express.json());

app.use("/user", require("./routes/user.route"));
swaggerConfig(app);
//use express router
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
