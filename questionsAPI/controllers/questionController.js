const mssql = require("mssql");
const { v4 } = require("uuid");
const sqlConfig = require("../Config/index");

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
    const { title, description } = req.body;
    const pool = await mssql.connect(sqlConfig);
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("title", mssql.VarChar, title)
      .input("description", mssql.VarChar, description)
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
      await pool.request().input("id", mssql.VarChar, id).execute("getP")
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
      res.status(404).json({ message: `thi question ${id} is not found` });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getQuestions,
  updateQuestion,
  askQuestion,
};