const { Router } = require("express");
const {
    addComment,
    getComment,
    updateComment,
    removeComment,
} = require("../controllers/commentController");
const commentRoute = Router();

// commentRoute.get("/", getComments);
commentRoute.post("", addComment);
commentRoute.put("/:id", updateComment);
commentRoute.get("/:id", getComment);
commentRoute.delete("/:id", removeComment);

module.exports = { commentRoute };
