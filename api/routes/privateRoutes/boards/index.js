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

router.get("/:boardId/info", require('./getBoardsInfo'));
router.get("/:boardId", require('./getBoardById'));
router.get("/", require('./getBoards'));
router.post("/", require('./addBoard'));
router.put("/:boardId/members", require('./addBoardMember'));
router.put("/:boardId/teams", require('./addBoardTeam'));
router.put("/:boardId", require('./updateBoard'));


module.exports = router;
