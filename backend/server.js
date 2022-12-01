const express = require("express");
const dotenv = require("dotenv");
const { userRoutes } = require("./Routes/userRoutes");

const app = express();
dotenv.config();
app.use(express.json());
app.use("/user", userRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is Running on Port : ${process.env.PORT}`);
});
