const express = require('express');

const router = express.Router();

router.post('/', require('./addTeam'));
router.delete('/:teamId', require('./deleteTeam'));
router.post('/:teamId/boards/:boardId', require('./addTeamBoard'));
router.delete('/:teamId/boards/:boardId', require('./deleteTeamBoard'));
router.post('/:teamId/members/:memberId', require('./addTeamMember'));
router.put('/:teamId/members/:memberId', require('./updateTeamMember'));
router.put('/:teamId', require('./updateTeam'));
router.delete('/:teamId/members/:memberId', require('./deleteTeamMember'));
router.get('/:teamId', require('./getTeamById'));

module.exports = router;
