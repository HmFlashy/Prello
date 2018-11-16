const express = require('express');
const checkRightsFromTeam = require('../../../middlewares/checkRights').checkRightsFromTeam
const checkRightsFromBoard = require('../../../middlewares/checkRights').checkRightsFromBoard
checkRightsFromCard(["in:Board"])
const router = express.Router();

router.post('/', require('./addTeam'));
router.delete('/:teamId', checkRightsFromTeam(["in:Team", "status:Team:Admin"]), require('./deleteTeam'));
router.post('/:teamId/boards/:boardId', checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./addTeamBoard'));
router.delete('/:teamId/boards/:boardId', checkRightsFromBoard(["in:Board", "status:Board:Admin"]), require('./deleteTeamBoard'));
router.post('/:teamId/members/:memberId', checkRightsFromTeam(["in:Team", "status:Team:Admin"]), require('./addTeamMember'));
router.put('/:teamId/members/:memberId', checkRightsFromTeam(["in:Team", "status:Team:Admin"]), require('./updateTeamMember'));
router.put('/:teamId', checkRightsFromTeam(["in:Team", "status:Team:Admin"]), require('./updateTeam'));
router.delete('/:teamId/members/:memberId', checkRightsFromTeam(["in:Team", "status:Team:Admin"]), require('./deleteTeamMember'));
router.get('/:teamId', checkRightsFromTeam(["in:Team"]), require('./getTeamById'));

module.exports = router;
