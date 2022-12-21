const express = require("express");
const { router } = require("./routes/questionRoute");
const { answerRoute } = require("./routes/answerRoute");
const { commentRoute } = require("./routes/commentRoute");
const {voteRouter }  = require("./routes/votesRoute");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/questions", router);
app.use("/answers", answerRoute);
app.use("/comment", commentRoute);
app.use("/votes", voteRouter)

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is Running on Port : ${process.env.PORT}`);
});
