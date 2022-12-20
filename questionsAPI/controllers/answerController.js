const sqlConfig = require("../config/index");
const mssql = require("mssql");
const jwt_decode = require('jwt-decode');
const uuid = require("uuid");
const moment = require("moment");
require("dotenv").config();
const { exec } = require("../DatabaseHelpers/dbhelper") ;
const addAnswer = async (req, res) => {
  try {
    // const user_email = req.headers["user_id"];
    const date_answered = moment().format("YYYY-MM-DD HH:mm:ss");
    const id = uuid.v4();
    const { user_id, question_id, answer } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("user_id", mssql.VarChar, user_id)
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
    const user_id = req.headers["user_id"];
    const { id } = req.params;
    const { answer, question_id, upvote, downvote, date_answered } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("id", mssql.VarChar(50), id)
      .input("user_id", user_id)
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
    const { id, prefered } = req.body;
    await (
      await exec("markAsPrefered", { id, prefered })
    ).recordset;
    res.json({ message: "answer prefered" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAnswers = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await (await exec("uspGetAnswers", { id })).recordsets;
    let answers=response[0]
    for (let i of response[0]){
      i.count=0
      let upvote=0
      let downvote=0
      for(let j of response[1]){
        if(i.answer_id===j.answer_id && j.Vote===true){
          upvote+=1
        }
        else if(i.answer_id===j.answer_id && j.Vote===false){
          downvote+=1
        }
        else{
          i.count=0

        }
        i.count=upvote-downvote
      }

    }
    res.json(answers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const downUpVote = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded=jwt_decode(token);
    const user_id=decoded.user_id
    const { answer_id,Vote } = req.body;
    await (
      await exec("inserUpdateVote", {
        user_id,
        answer_id,
        Vote,
      })
    ).recordset;

    res.status(201).json({ message: "Your vote counted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  addAnswer,
  editAnswer,
  getAnswer,
  markAsPreferedAnswer,
  getAnswers,
  downUpVote
};
