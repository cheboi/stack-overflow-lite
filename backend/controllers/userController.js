const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { v4 } = require("uuid");
const dotenv = require("dotenv");
const { exec, query } = require("../DatabaseHelpers/dbhelper.js");

// const {SECRET_KEY } = process.env;

dotenv.config();

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // const exists = await exec("getUser", { email });
    // console.log(exists);

    const id = v4();
    const hashedpassword = await bcrypt.hash(password, 8);
    const data = { id, username, email, password: hashedpassword };
    await exec("addUser", data);
    return res.status(201).json({ message: "sucess registed user" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const {  email, password } = req.body;

    const user = await (await exec("getUser", { email })).recordset[0];
    if (user) {
      // check password
      const checkPassword = await bcrypt.compare(password, user.password);
      console.log(checkPassword);
      if (checkPassword) {
        const { password, id, ...payload } = user;
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "120890890s",
        });
        return res.status(200).json({ message: "Logged in !!", token });
      } else {
        return res.status(400).json({ message: "User Not Found" });
      }
    } else {
      return res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decode = jwt_decode(token);
    const id = decode.id;
    const response = await (await exec("uspGetUser", { id })).recordsets;
    let user = { user: response[0] };
    let userQuestions = { userQuestions: response[1] };
    let userAnswers = { userAnswers: response[2] };
    let userComments = { userComments: response[3] };
    let profile = [user, userQuestions, userAnswers, userComments];
    res.json(profile);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const removeQuestion = async (req, res) => {
  try {
    const { question_id } = req.params;
    const exist = await (
      await exec("uspGetQuestion", { question_id })
    ).recordset;
    if (exist.length) {
      await (
        await exec("uspRemoveQuestion", { question_id })
      ).recordsets;
      res.json({ message: "Question remove successfull" });
    } else {
      res.json({ message: " Question already Removed " });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const removeAnswer = async (req, res) => {
  try {
    const { answer_id } = req.params;
    const exist = await (await exec("uspGetAnswer", { answer_id })).recordset;

    if (exist.length) {
      await (
        await exec("removeAnswer", { answer_id })
      ).recordset;
      res.json({ message: "Answer deleted successfull" });
    } else {
      res.json({ message: " Answer already deleted " });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const removeComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const exist = await (await exec("uspGetComment", { comment_id })).recordset;
    if (exist.length) {
      await (
        await exec("removeComment", { comment_id })
      ).recordset;
      res.json({ message: "Comment deleted successfull" });
    } else {
      res.json({ message: " Comment already deleted " });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getUser,
  removeQuestion,
  removeAnswer,
  removeComment,
};
