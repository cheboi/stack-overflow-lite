const { Router } = require("express");
const {
  signupUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const { verifyToken } = require("../Middleware/verifyToken");

const userRoutes = Router();

userRoutes.post("/signup", signupUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/:id", verifyToken, getUser);

module.exports = {
  userRoutes,
};
