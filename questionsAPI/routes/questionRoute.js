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
router.post("", verifyToken, askQuestion);
router.put("/:id", verifyToken,updateQuestion);
router.get("/:id", getQuestionById);
router.delete("/:id",verifyToken, deleteQuestion);
router.get("/question/search/", searchQuesstion);
router.get("/question/mostanseredquestion/",verifyToken, getMostAnsweredQuestion);
router.get("/userquestions/:id", verifyToken, getUserQuestions);

module.exports = { router };
