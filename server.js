const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const auth = require("./routes/auth");
const books = require("./routes/books");
const users = require("./routes/users");

const app = express();

app.use(express.json());

var corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

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
