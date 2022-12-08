const express = require("express");
const { router } = require("./routes/questionRoute");
const { answerRoute } = require("./routes/answerRoute")
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/questions", router);
app.use("answers", answerRoute);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is Running on Port : ${process.env.PORT}`);
});
