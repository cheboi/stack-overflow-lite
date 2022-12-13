const { v4 } = require("uuid");

const { exec } = require("../DatabaseHelpers/dbhelper.js");

const upVote = async (req, res) => {
  const { answer_id } = req.body;

  try {
    const votes = await exec("uspGetVotes", { answer_id });
    let value = votes.length > 0 ? votes[0].votes : 0;

    let Value = +value + 1;
    console.log(Value);
    await exec("uspInsertOrUpdateVotes", { answer_id, votes: Value });
    res.status(200).json({ message: "Just voted" });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const downVote = async (req, res) => {
  const { answer_id } = req.body;
  const id = v4();
  try {
    const votes = await exec("uspGetVotes", { answer_id });

    let vote_value = votes.length > 0 ? votes[0].votes : 0;

    let new_value = +vote_value - 1;
    console.log(new_value);
    await exec("uspInsertOrUpdateVotes", { id, answer_id, votes: new_value });
    res.status(200).json({ message: "Down  vote" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateVotes = async (req, res) => {
  try {
    const { user_email, answer_id, totalVotes } = req.body;

    const id = v4();

    await exec("uspVotesCount", {
      id,
      user_email,
      answer_id,
      totalVotes,
    });

    return res.status(200).json({
      msg: "voted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  updateVotes,
  upVote,
  downVote,
};
