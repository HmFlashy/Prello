const TeamController = require('../../../controllers/TeamsController');

/**
 * @swagger
 * definition:
 *   NewList:
 *     properties:
 *       name:
 *         type: string
 *
 * paths:
 *   /boards/{boardId}/teams/{query}:
 *     get:
 *       tags:
 *         - Board
 *       description: Fetches all the teams containing the value inside their name and not already in the board
 *       summary: Fetches all the teams matching the search value
 *       responses:
 *         200:
 *           description: The corresponding teams
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#components/schemas/Team'
 *         500:
 *           description: Internal error
 */
module.exports = async (req, res) => {
    try {
        const boardId = req.params.boardId;
        if (!boardId) {
            throwError(400, "Missing boardId parameter")
        } else if (!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }
        const query = req.params.query;
        const teams = await TeamController.getTeamsBySearch(boardId, query);
        return res.status(200).json(teams)
    } catch(error) {
        console.log(error)
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}