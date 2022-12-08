const { Router } = require("express");
const {
  getQuestions,
  updateQuestion,
  askQuestion,
  getQuestionById,
  deleteQuestion,
} = require("../controllers/questionController");
const router = Router();

router.get("/", getQuestions);
router.post("", askQuestion);
router.put("/:id",updateQuestion);
router.get("/:id", getQuestionById);
router.delete("/:id", deleteQuestion);

module.exports = { router };
