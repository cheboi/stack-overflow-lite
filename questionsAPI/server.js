const express = require("express");
const { router } = require("./routes/questionRoute");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(express.json());
app.use("/questions", router);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is Running on Port : ${process.env.PORT}`);
});
