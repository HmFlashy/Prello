const express = require('express');

const router = express.Router();

router.post('/teams', require('../teams/addTeam'));
router.delete('/teams/:teamId', require('../teams/deleteTeam'));
router.put('/:teamId/boards/:boardId', require('../teams/addTeamBoard'));
router.delete('/:teamId/boards/:boardId', require('../teams/deleteTeamBoard'));
router.get('/:teamId', require('./getTeamById'));

module.exports = router;
