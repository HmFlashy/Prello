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
router.delete('/:boardId', require('./deleteBoard'));
router.post('/:boardId/labels', require('../labels/Board/createLabel'));
router.delete('/:boardId/labels/:labelId', require('../labels/Board/deleteLabel'));
router.put('/:boardId/labels/:labelId', require('../labels/Board/updateLabel'));
router.get('/:boardId/labels/:labelId', require('../labels/Board/getLabelById'));



module.exports = router;
