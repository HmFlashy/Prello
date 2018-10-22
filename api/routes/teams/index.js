const express = require('express');

const router = express.Router();

router.get("/:teamId", require('./getTeamById'))
router.get("/", require('./getTeams'))

module.exports = router;
