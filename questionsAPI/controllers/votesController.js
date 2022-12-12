const { v4 } = require("uuid");

const { exec } = require("../DatabaseHelpers/dbhelper.js");

const updateVotes = async (req, res) => {
  try {
    const { answer_id, totalVotes } = req.body;
    const { User } = req.user;

    const id = v4();

    await exec("uspVotesCount", {
      id,
      user_email: User,
      answer_id,
      totalVotes,
    });

    return res.status(200).json({
      msg: "voted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  updateVotes,
};
