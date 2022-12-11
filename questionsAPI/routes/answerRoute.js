const { Router } = require("express");
const { addAnswer, getAnswer, updateAnswer } = require("../controllers/answerController.js");
const answerRoute = Router();


answerRoute.post("", addAnswer);
answerRoute.post('/:question_id', getAnswer);
// answerRoute.put('/:id', updateAnswer);

module.exports = { answerRoute };
