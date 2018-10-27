const express = require('express');

const router = express.Router();

/**
  *   @swagger
  *   components:
  *     schemas:
  *       Board:
  *         properties:
  *           _id:
  *             type: ObjectId
  *           name:
  *             type: string
  */

router.get("/:boardId", require('./getBoardById'));
router.get("/", require('./getBoards'));
router.post("/", require('./createBoard'));
router.put("/:boardId/members", require('./addBoardMember'));

module.exports = router;
