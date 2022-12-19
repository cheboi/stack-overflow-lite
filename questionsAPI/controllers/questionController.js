const mssql = require("mssql");
const moment = require("moment");
const { v4 } = require("uuid");
const sqlConfig = require("../Config/index");

const { exec, query } = require("../DatabaseHelpers/dbhelper.js");
const {getDays} = require("../DatabaseHelpers/timeHelper")

const getQuestions = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const response = await pool.request().execute("getQuestions");
    const questions = await response.recordset;
    if (questions.length) {
      return res.status(200).json(questions);
    } else {
      res.status(404).json({ message: "No questions for now" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const askQuestion = async (req, res) => {
  try {    
    const user_id =  req.headers["user_id"];
    const id = v4();
    const date_asked = moment().format("YYYY-MM-DD HH:mm:ss");
    const { title, description } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("title", mssql.VarChar, title)
      .input("description", mssql.VarChar, description)
      .input("user_id", mssql.VarChar, user_id)
      .input("date_asked", mssql.DateTime, date_asked)
      .execute("askQuestion");
    res.status(201).json({ message: "question Asked" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateQuestion = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, description } = req.body;

    const pool = await mssql.connect(sqlConfig);
    const question = await (
      await pool.request().input("id", mssql.VarChar, id).execute("getQuestion")
    ).recordset;
    if (question.length) {
      await pool
        .request()
        .input("id", mssql.VarChar, id)
        .input("title", mssql.VarChar, title)
        .input("description", mssql.VarChar, description)
        .execute("insertQuestion");
      res.status(200).json({ message: "question successfully  Updated!!" });
    } else {
      res.status(404).json({ message: `this question ${id} is not found` });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await (await exec("getQuestionById", { id })).recordset;
    if (question.length > 1) {
      res.status(200).json(question);
    } else {
      res
        .status(404)
        .json({ message: `question with id ${id} does not exist` });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await (await exec("getQuestionById", { id })).recordset;

    if (question.length) {
      query(`DELETE FROM questionsTable WHERE id ='${id}'`);
      res.status(200).json({ message: "Question Deleted!!" });
    } else {
      res
        .status(404)
        .json({ message: `Question with id ${id} does not exist` });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const searchQuesstion = async (req, res) => {
  try {
    const { value } = req.query;
    console.log(value);
    const questions =
      (await (await exec("uspsearchQuestion", { value })).recordsets) || [];

    const qn = await exec("uspsearchQuestion", { value });

    console.log(qn);

    if (questions.length) {
      return res.status(200).json({ questions });
    } else {
      return res.status(404).json({
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const getUserQuestions = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const response = await pool.request().execute("mostAnswerQuestion");
    const questions = await response.recordset;
    res.json(questions);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getMostAnsweredQuestion = async (req, res) => {
  // try {
  //   const { range } = req.query;
  //   const pool = await mssql.connect(sqlConfig);
  //   const response = await pool.request().execute("uspMostAnsweredQuestions");
  //   const questions = await response.recordset;
  //   res.json(questions);
  // } catch (error) {
  //   res.status(404).json({ error: error.message });
  // }

  try {
    const { range } = req.query;

    const questions = await (
      await execute("uspMostAnsweredQuestions", { range })
    ).recordset;

    if (questions.length > 0) {
      let qnFilter = questions.map((qn) => {
        return qn.id;
      });

      const allQuestions = await (await execute("getQuestions")).recordset;

      const filteredData = allQuestions.filter((question) =>
        qnFilter.includes(question.id)
      );

      return res.status(200).json({
        msg: "Questions fetched successfully",
        data: filteredData,
      });
    } else {
      return res.status(404).json({
        msg: "Your have more than those questions",
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const getRecentQuestions = async (req, res) => {
  try {
    const questions = await (await execute('uspGetMostRecentQuestions')).recordset;

    let data = getDays(questions);

    if (questions) {
      return res.status(200).json({
        msg: 'Questions fetched successfully',
        data
      })
    } else {
      return res.status(404).json({
        msg: 'Not questions were found'
      })
    }
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
}

module.exports = {
  getQuestions,
  updateQuestion,
  askQuestion,
  getQuestionById,
  deleteQuestion,
  searchQuesstion,
  getMostAnsweredQuestion,
  getUserQuestions,
  getRecentQuestions
};
