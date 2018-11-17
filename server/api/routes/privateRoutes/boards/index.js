const express = require('express');
const checkRequest = require('../../../middlewares/CheckRequest')
const checkRightsFromBoard = require('../../../middlewares/checkRights').checkRightsFromBoard
const router = express.Router();
const { pollValidator, boardsValidator, labelValidator } = require('../../../validations/privateRoutes');

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

router.get("/:boardId/export", boardsValidator.getForExportBoardValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('./getBoardForExport'));
router.get("/:boardId/info", boardsValidator.getInfoBoardValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('./getBoardsInfo'));
router.get("/:boardId", boardsValidator.getByIdBoardValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('./getBoardById'));
router.get("/", require('./getBoards'));
router.post("/", boardsValidator.addBoardValidator, checkRequest, require('./addBoard'));
router.put("/:boardId", boardsValidator.updateBoardValidator, checkRequest, checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./updateBoard'));
router.delete('/:boardId', boardsValidator.deleteBoardValidator, checkRequest, checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./deleteBoard'));

router.put("/:boardId/teams", boardsValidator.addTeamBoardValidator, checkRequest, checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./addBoardTeam'));
router.delete("/:boardId/teams", boardsValidator.deleteTeamBoardValidator, checkRequest, checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./deleteBoardTeam'));
router.get('/:boardId/teams/:query', boardsValidator.getTeamSearchedBoardValidator, checkRequest, require('./getTeamsSearched'));

router.post('/:boardId/labels', labelValidator.createLabelBoardValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('../labels/Board/createLabel'));
router.delete('/:boardId/labels/:labelId', labelValidator.deleteLabelBoardValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('../labels/Board/deleteLabel'));
router.put('/:boardId/labels/:labelId', labelValidator.updateLabelBoardValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('../labels/Board/updateLabel'));
router.get('/:boardId/labels/:labelId', labelValidator.getLabelByIdValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('../labels/Board/getLabelById'));

router.put("/:boardId/members", boardsValidator.addMemberBoardValidator, checkRequest, checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./addBoardMember'));
router.delete("/:boardId/members/:memberId", boardsValidator.deleteBoardMemberValidator, checkRequest, checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./deleteBoardMember'));
router.get('/:boardId/members/:query', boardsValidator.getMemberSearchedBoardValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('./getMembersSearched'));
router.put('/:boardId/members/:memberId', boardsValidator.updateRoleBoardMemberValidator, checkRequest, checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./updateRoleBoardMember'));

router.put('/:boardId/polls/:pollId/vote/:optionId', pollValidator.voteValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('../polls/vote'))
router.post('/:boardId/polls/:pollId/options', pollValidator.addOptionValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('../polls/addOption'))
router.put('/:boardId/polls/:pollId', pollValidator.updatePollValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('../polls/updatePoll'))
router.post('/:boardId/polls', pollValidator.addPollValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('../polls/addPoll'))
router.delete('/:boardId/polls/:pollId', pollValidator.deletePollValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('../polls/deletePoll'))
router.delete('/:boardId/polls/:pollId/options/:optionId', pollValidator.deletePollOptionValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('../polls/deletePollOption'))
router.put('/:boardId/polls/:pollId/options/:optionId', pollValidator.updatePollOptionValidator, checkRequest, checkRightsFromBoard(["in:Board"]), require('../polls/updatePollOption'))

module.exports = router;
