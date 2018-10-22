const teamsController = require('../../controllers/TeamsController')

module.exports = async (req, res) => {
    const teamId = req.params.teamId;
    try {
        const team = await teamsController.getTeamById(teamId)
        return res.status(200).json(team)
    } catch(error) {
        res.status(500).json(error.message)
    }
}
