const { Router } = require("express");

const {
  updateVotes,
} = require("../controllers/votesController");
const { verifyToken } = require("../middleware/index");


const voteRouter = Router();

voteRouter.post("/",updateVotes);

module.exports = { voteRouter };
