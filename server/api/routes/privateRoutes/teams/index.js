const express = require('express');

const router = express.Router();

router.post('/', require('./addTeam'));
router.delete('/:teamId', require('./deleteTeam'));
router.put('/:teamId/boards/:boardId', require('./addTeamBoard'));
router.delete('/:teamId/boards/:boardId', require('./deleteTeamBoard'));
router.get('/:teamId', require('./getTeamById'));

module.exports = router;
