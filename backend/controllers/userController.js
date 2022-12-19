const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    const { email, password } = req.body;
    console.log(password)
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
      }
       else {
        return res.status(400).json({ message: "User Not Found" });
      }
    }
     else{
      return res.status(400).json({
        message: "User not found"
      })
     }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
};
