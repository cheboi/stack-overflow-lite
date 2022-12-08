const sqlConfig = require("../config/index");
const mssql = require("mssql");
const uuid = require("uuid");
const moment = require('moment');
require("dotenv").config();
// const { exec, query } = require("../DatabaseHelpers/dbhelper");

const addAnswer = async (req, res) => {
  try {
    const user_email = req.headers["user_id"];
    const date_answered = moment().format("YYYY-MM-DD HH:mm:ss");
    const upvote = 0;
    const downvote = 0;
    const id = uuid.v4();
    const { question_id, answer,} = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("id",mssql.VarChar, id)
      .input("user_email", mssql.VarChar,user_email)
      .input("question_id", mssql.VarChar, question_id)
      .input("answer", mssql.VarChar,answer)
      .input("upvote", mssql.Int,upvote)
      .input("downvote", mssql.Int, downvote)
      .input("date_answered", mssql.DateTime,date_answered)
      .execute("uspInsertUpdateAnswer");

    res.status(201).json({ message: "Question Inserted to database" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// const getAnswer = async (req, res) => {
//   try {
//     const {question_id}=req.params
//     const pool = await mssql.connect(sqlConfig);
//     const response = await pool.request()
//     .input("question_id",mssql.VarChar(100), question_id)
//     .execute("getAnswer");
//     const answers = await response.recordset;
//     res.json(answers);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };

module.exports={
    addAnswer
}