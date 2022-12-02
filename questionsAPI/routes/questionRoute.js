const { Router } = require("express");
const {
    getQuestions,
    updateQuestion,
    askQuestion,
} = require("../controllers/questionController");
const router = Router();

router.get("/", getQuestions);
router.post("", askQuestion);
router.put("/:id", updateQuestion);

module.exports = { router };
