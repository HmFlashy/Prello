const boardsController = require('../../controllers/BoardsController');
const throwError = require('../../helper/RequestHelper').throwError;

module.exports = async (req, res) => {
    try {
        const boards = await boardsController.getBoards();
        return res.status(200).json(boards)
    } catch(error) {
        console.log(error)
        if(error.code){
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}