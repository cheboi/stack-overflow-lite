const { Router } = require("express");
const {
  addAnswer,
  getAnswer,
  editAnswer,
  markAsPreferedAnswer,
  getAnswers,
  downUpVote
} = require("../controllers/answerController.js");
const answerRoute = Router();

answerRoute.post("", addAnswer);
answerRoute.get("/question/:id", getAnswers);
answerRoute.post("/:question_id", getAnswer);
answerRoute.put("/:id", editAnswer);
answerRoute.put("/prefered/:id", markAsPreferedAnswer);
answerRoute.post("/vote/:answer_id", downUpVote);

module.exports = { answerRoute };
