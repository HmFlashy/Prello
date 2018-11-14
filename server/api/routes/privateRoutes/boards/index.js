const express = require('express');
const checkRightsFromBoard = require('../../../middlewares/checkRights').checkRightsFromBoard
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

router.get("/:boardId/export", checkRightsFromBoard(["in:Board"]), require('./getBoardForExport'));
router.get("/:boardId/info", checkRightsFromBoard(["in:Board"]), require('./getBoardsInfo'));
router.get("/:boardId", checkRightsFromBoard(["in:Board"]), require('./getBoardById'));
router.get("/", require('./getBoards'));
router.post("/", require('./addBoard'));
router.put("/:boardId/members", checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./addBoardMember'));
router.put("/:boardId/teams", checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./addBoardTeam'));
router.delete("/:boardId/teams", checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./deleteBoardTeam'));
router.put("/:boardId", checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./updateBoard'));
router.delete('/:boardId', checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./deleteBoard'));
router.post('/:boardId/labels', checkRightsFromBoard(["in:Board"]), require('../labels/Board/createLabel'));
router.delete('/:boardId/labels/:labelId', checkRightsFromBoard(["in:Board"]), require('../labels/Board/deleteLabel'));
router.put('/:boardId/labels/:labelId', checkRightsFromBoard(["in:Board"]), require('../labels/Board/updateLabel'));
router.get('/:boardId/labels/:labelId', checkRightsFromBoard(["in:Board"]), require('../labels/Board/getLabelById'));
router.get('/:boardId/members/:query', checkRightsFromBoard(["in:Board"]), require('./getMembersSearched'))



module.exports = router;
