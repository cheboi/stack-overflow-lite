const mssql = require("mssql");
const { v4 } = require("uuid");
const sqlConfig = require("../Config/index");

const { exec, query } = require("../DatabaseHelpers/dbhelper.js");

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
    const id = v4();
    const { title, description, user_email, date_asked } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("title", mssql.VarChar, title)
      .input("description", mssql.VarChar, description)
      .input("user_email", mssql.VarChar, user_email)
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
    const question = await (await exec("getQuestionsById", { id })).recordset;
    if (question.length) {
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
    const question = await (await exec("getQuestion", { id })).recordset;

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

const findQuestions = async (req, res) => {
  try {
    const { value } = req.query;
    const questions = await (
      await exec("uspSearchQuestion", { value })
    ).recordset;

    if (questions.length > 0) {
      return res.status(200).json({
        data: questions,
      });
    } else {
      return res.status(404).json({
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const getMostAnsweredQuestion = async (req, res) => {
  try {
    const { range } = req.query;

    const questions = await (
      await exec("uspMostAnsweredQuestion", { range })
    ).recordset;

    if (questions.length > 0) {
      return res.status(200).json({
        msg: "Questions fetched successfully",
        data: questions,
      });
    } else {
      return res.status(404).json({
        msg: "Low range",
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

const getUserQuestions = async (req, res) => {
  try {
    const { currentUser } = req.user;

    const questions = await (await execute('uspFindUserQuestions', { user_email: currentUser })).recordset;

    if (questions.length > 0) {
      return res.status(200).json({
        msg: 'Questions fetched successfully',
        data: questions
      })
    } else {
      return res.status(404).json({
        data: []
      })
    }
  } catch (error) {
    return res.status(500).json({
      msg: error
    })
  }
};

module.exports = {
  getQuestions,
  updateQuestion,
  askQuestion,
  getQuestionById,
  deleteQuestion,
  findQuestions,
  getMostAnsweredQuestion,
  getUserQuestions
};
