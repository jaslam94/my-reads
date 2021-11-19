const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

dotenv.config({ path: "./config/config.env" });

const auth = require("./routes/auth");
const books = require("./routes/books");
const users = require("./routes/users");

const app = express();

app.use("/api/v1/auth", auth);
app.use("/api/v1/books", books);
app.use("/api/v1/users", users);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold
  )
);