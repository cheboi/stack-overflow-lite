const { Router } = require("express");

const voteRouter = Router();

const {
  updateVotes,
  upVote,
  downVote,
} = require("../controllers/votesController");
const { verifyToken } = require("../middleware/index");

voteRouter.post("/answer/upvote", upVote);
voteRouter.post("/answer/downvote", downVote);
voteRouter.post("/", updateVotes);

module.exports = { voteRouter };
