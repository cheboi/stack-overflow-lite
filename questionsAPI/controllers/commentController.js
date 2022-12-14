const sqlConfig = require("../Config/index");
const mssql = require("mssql");
const moment = require("moment");
const uuid = require("uuid");
require("dotenv").config();

const addComment = async (req, res) => {
  try {
    // const user_email = req.headers["user_email"];
    const id = uuid.v4();
    const date_commented = moment().format("YYYY-MM-DD HH:mm:ss");
    const { comment, user_email, answer_id } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("id", id)
      .input("comment", comment)
      .input("user_email", user_email)
      .input("answer_id", answer_id)
      .input("date_commented", date_commented)
      .execute("insertUpdateComment");

    res.status(200).json({ message: "commented on  an answer" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getComment = async (req, res) => {
  try {
    const { answer_id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const response = await pool
      .request()
      .input("answer_id", mssql.VarChar(100), answer_id)
      .execute("getComments");
    const comments  = await response.recordset;
    res.json(comments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const updateComment = async (req, res) => {
  try {
    // const user_email = req.headers["user_email"];

    const { answer_id } = req.params;
    const { id } = req.params;
    const {user_email,  comment } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("comment", comment)
      .input("user_email", user_email)
      .input("answer_id", mssql.VarChar(100), answer_id)

      .execute("insertUpdateComment");
    res.status(201).json({ message: "Answer updated" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const removeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const comment = await (
      await pool.request().input("id", id).execute("getComment")
    ).recordset;

    if (comment.length) {
      await pool.request().input("id", id).execute("deleteComment");
      res.status(200).json({ message: "Comment is Deleted!!" });
    } else {
      res.status(404).json({ message: `Comment with id ${id} does not exist` });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  addComment,
  getComment,
  updateComment,
  removeComment,
};
