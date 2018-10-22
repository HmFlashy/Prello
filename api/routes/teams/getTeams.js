const teamsController = require('../../controllers/TeamsController')

module.exports = async (req, res) => {
    try {
        const teams = await teamsController.getTeams()
        return res.status(200).json(teams)
    } catch(error) {
        res.status(500).json(error.message)
    }
}
