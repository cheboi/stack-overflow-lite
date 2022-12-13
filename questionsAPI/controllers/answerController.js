const sqlConfig = require("../config/index");
const mssql = require("mssql");
const uuid = require("uuid");
const moment = require("moment");
require("dotenv").config();
// const { exec, query } = require("../DatabaseHelpers/dbhelper");

const addAnswer = async (req, res) => {
  try {
    // const user_email = req.headers["user_id"];
    const date_answered = moment().format("YYYY-MM-DD HH:mm:ss");
    const id = uuid.v4();
    const { user_email, question_id, answer } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("user_email", mssql.VarChar, user_email)
      .input("question_id", mssql.VarChar, question_id)
      .input("answer", mssql.VarChar, answer)
      .input("date_answered", mssql.DateTime, date_answered)
      .execute("uspInsertUpdateAnswer");

    res.status(201).json({ message: "Question Inserted to database" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAnswer = async (req, res) => {
  try {
    const { question_id } = req.params;
    const pool = await mssql.connect(sqlConfig);
    const response = await pool
      .request()
      .input("question_id", mssql.VarChar(50), question_id)
      .execute("getAnswer");
    const answers = await response.recordset;
    res.json(answers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const editAnswer = async (req, res) => {
  try {
    const user_email = req.headers["user_email"];
    const { id } = req.params;
    const { answer, question_id, upvote, downvote, date_answered } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("id", mssql.VarChar(50), id)
      .input("user_email", user_email)
      .input("question_id", question_id)
      .input("answer", answer)
      .input("upvote", upvote)
      .input("downvote", downvote)
      .input("date_answered", date_answered)
      .execute("insertUpdateAnswer");
    res.status(201).json({ message: "Answer updated" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const markAsPreferedAnswer = async (req, res) => {
  try {
    const {id}  = req.params;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("id", id)
      .execute("markAsPrefered");
    res.json({ message: "answer prefered" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAnswers= async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const response = await pool.request().execute("getAnswers");
    const qn = await response.recordset;
    if (qn.length) {
      return res.status(200).json(qn);
    } else {
      res.status(404).json({ message: "No Answerss for now" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }

  // try {
  //   const questions = await exec("getQuestions");
  //   if (questions.length) {
  //     return res.status(200).json(questions);
  //   } else {
  //     res.status(404).json({ message: "No questions for now" });
  //   }
  // } catch (error) {
  //   return res.status(404).json({ error: error.message });
  // }
};


module.exports = {
  addAnswer,
  editAnswer,
  getAnswer,
  markAsPreferedAnswer,
  getAnswers
};
