const express = require('express');
const checkRightsFromTeam = require('../../../middlewares/checkRights').checkRightsFromTeam
const checkRightsFromBoard = require('../../../middlewares/checkRights').checkRightsFromBoard
const { teamsValidator } = require('../../../validations/privateRoutes');
const checkRequest = require('../../../middlewares/CheckRequest')
const router = express.Router();

router.post('/', teamsValidator.addTeamValidator, checkRequest, require('./addTeam'));
router.delete('/:teamId', teamsValidator.deleteTeamValidator, checkRequest, checkRightsFromTeam(["in:Team", "status:Team:Admin"]), require('./deleteTeam'));
router.post('/:teamId/boards/:boardId', teamsValidator.addBoardTeamValidator, checkRequest, checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./addTeamBoard'));
router.delete('/:teamId/boards/:boardId', teamsValidator.deleteBoardTeamValidator, checkRequest, checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./deleteTeamBoard'));
router.post('/:teamId/members/:memberId', teamsValidator.addMemberTeamValidator, checkRequest, checkRightsFromTeam(["in:Team", "status:Team:Admin"]), require('./addTeamMember'));
router.put('/:teamId/members/:memberId', teamsValidator.deleteMemberTeamValidator, checkRequest, checkRightsFromTeam(["in:Team", "status:Team:Admin"]), require('./updateTeamMember'));
router.put('/:teamId', teamsValidator.updateTeamValidator, checkRequest, checkRightsFromTeam(["in:Team", "status:Team:Admin"]), require('./updateTeam'));
router.delete('/:teamId/members/:memberId', teamsValidator.deleteMemberTeamValidator, checkRequest, require('./deleteTeamMember'));
router.get('/:teamId', teamsValidator.getByIdTeamValidator, checkRequest, checkRightsFromTeam(["in:Team"]), require('./getTeamById'));

module.exports = router;
