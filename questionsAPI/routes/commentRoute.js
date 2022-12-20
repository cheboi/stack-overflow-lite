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
commentRoute.post("",verifyToken,  addComment);
commentRoute.put("/:id", verifyToken, updateComment);
commentRoute.get("/:answer_id",getComment);
commentRoute.delete("/:id", verifyToken, removeComment);

module.exports = { commentRoute };
