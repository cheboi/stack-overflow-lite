const { Router } = require("express");
const { verifyToken } = require("../middleware/index");
const {
    addComment,
    getComment,
    updateComment,
    removeComment,
} = require("../controllers/commentController");
const commentRoute = Router();

// commentRoute.get("/", getComments);
commentRoute.post("/comment", addComment);
commentRoute.put("/:id", updateComment);
commentRoute.get("/:answer_id", verifyToken, getComment);
commentRoute.delete("/:id", removeComment);

module.exports = { commentRoute };
