require("dotenv").config();

const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");

const { exec } = require("../DatabaseHelpers/dbhelper");

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
  const { email, password } = req.body;
  const user = await exec("getUser", { email });

  const correct = await bcrypt.compare(password, user[0].password);
  if (correct) {
    let { id, email, username } = user[0];

    let payload = { id, email, username };
    let token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: "100min",
    });
    res.status(200).json({ token });
  } else {
    res.status(400).json({ error: "The password is not correct" });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
