const { Router } = require("express");
const { verifyToken } = require("../middleware/index");
const {
  getQuestions,
  updateQuestion,
  askQuestion,
  getQuestionById,
  deleteQuestion,
  findQuestions,
  getMostAnsweredQuestion,
  getUserQuestions,
} = require("../controllers/questionController");
const router = Router();

router.get("/", getQuestions);
router.post("",verifyToken, askQuestion);
router.put("/:id",verifyToken, updateQuestion);
router.get("/:id", getQuestionById);
router.delete("/:id",verifyToken, deleteQuestion);
router.get("/question/search", findQuestions);
router.get("/question/mostanseredquestion", getMostAnsweredQuestion);
router.get("/userquestions", verifyToken, getUserQuestions);


module.exports = { router };
