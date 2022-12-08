const { Router } = require("express");
const { addAnswer } = require("../controllers/answerController.js");
const answerRoute = Router();

answerRoute.post("", addAnswer);

module.exports = { answerRoute };
