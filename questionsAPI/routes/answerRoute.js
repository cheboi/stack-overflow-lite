const { Router } = require("express");
const { verifyToken } = require("../middleware/index");

const {
  addAnswer,
  // getAnswer,
  editAnswer,
  markAsPreferedAnswer,
  getAnswers,
  downUpVote
} = require("../controllers/answerController.js");
const answerRoute = Router();

answerRoute.post("",verifyToken,  addAnswer);
answerRoute.get("/question/:id", getAnswers);
// answerRoute.post("/:question_id", getAnswer);
answerRoute.put("/:id",verifyToken, editAnswer);
answerRoute.put("/prefered/:id",verifyToken,  markAsPreferedAnswer);
answerRoute.post("/vote/:answer_id",downUpVote);

module.exports = { answerRoute };
