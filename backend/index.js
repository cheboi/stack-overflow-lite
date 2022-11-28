const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config()

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is Running on Port : ${process.env.PORT}`);
});