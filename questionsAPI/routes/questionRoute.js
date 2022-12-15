const { Router } = require("express");
const { verifyToken } = require("../middleware/index");
const {
  getQuestions,
  updateQuestion,
  askQuestion,
  getQuestionById,
  deleteQuestion,
  searchQuesstion,
  getMostAnsweredQuestion,
  getUserQuestions,
} = require("../controllers/questionController"); 
const router = Router();

router.get("/", getQuestions);
router.post("", askQuestion);
router.put("/:id",updateQuestion);
router.get("/:id", getQuestionById);
router.delete("/:id", deleteQuestion);
router.get("/question/search/", searchQuesstion);
router.get("/question/mostanseredquestion/", getMostAnsweredQuestion);
router.get("/userquestions/:id", getUserQuestions);

module.exports = { router };
