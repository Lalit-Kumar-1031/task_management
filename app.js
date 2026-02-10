const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/userRouter");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo Connected ");
  })
  .catch((err) => {
    console.log(`Failed to connect Mongo DB${err}`);
  });

module.exports = app;
