const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5500;

app.use(cors());

const TodoItemRoute = require("./routes/routeItems");

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use("/", TodoItemRoute);

app.listen(PORT, () => console.log("Server connected"));
