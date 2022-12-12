const { Router } = require("express");

const voteRouter = Router();

const { updateVotes } = require("../controllers/votesController");
const { verifyToken } = require("../middleware/index");

voteRouter.post("/", updateVotes);

module.exports ={ voteRouter};
