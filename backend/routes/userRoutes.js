const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const {
  signupUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const { verifyToken } = require("../Middleware/verifyToken");

const userRoutes = Router();

userRoutes.post("/signup", [
  check("username")
    .isLength({ min: 3 })
    .withMessage("the name must have minimum length of 3")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("invalid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("your password should have min and max length between 8-15")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one sepcial character"),
],
(req, res, next) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);

  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    next();
  }
},signupUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/:id", verifyToken, getUser);

module.exports = {
  userRoutes,
};
