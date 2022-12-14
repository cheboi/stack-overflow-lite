const { Router } = require("express");
const {
  addAnswer,
  getAnswer,
  editAnswer,
  markAsPreferedAnswer,
  getAnswers
} = require("../controllers/answerController.js");
const answerRoute = Router();

answerRoute.post("", addAnswer);
answerRoute.get("", getAnswers);
answerRoute.post("/:question_id", getAnswer);
answerRoute.put("/:id", editAnswer);
answerRoute.put("/prefered/:id", markAsPreferedAnswer);

module.exports = { answerRoute };
