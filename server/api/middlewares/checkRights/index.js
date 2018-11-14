const TeamsController = require('../../controllers/TeamsController');
const UserController = require('../../controllers/UserController');
const BoardController = require('../../controllers/BoardsController');
const CardsController = require('../../controllers/CardsController');
const ListsController = require('../../controllers/ListsController');

inBoard = (userId, board, team) => {
    return board.visibility === "Public" ? true : board.members.some(member => member.member._id.toString() === userId.toString())
}

isBoardAdmin = (userId, board, team) => {
    return board.visibility === "Public" ? true : board.members.some(member => member.member._id.toString() === userId.toString() && member.role === "Admin")
}

inTeam = (userId, board, team) => {
    return team.members.some(member => member.member._id.toString() === userId.toString())
}

isTeamAdmin = (userId, board, team) => {
    return team.members.some(member => member.member._id.toString() === userId.toString() && member.role === "Admin")
}

const funcs = {
    "in:Board": inBoard,
    "status:Board:Admin": isBoardAdmin,
    "in:Team": inTeam,
    "status:Team:Admin": isTeamAdmin
}

checkRightsFromBoard = (toCheck, idIsInBody = false) => async (req, res, next) => {
    boardId = idIsInBody ? req.body.boardId : req.params.boardId
    const board = await BoardController.getBoardById(boardId).catch(err => res.status(400).send("Board not found"))
    checkRights(toCheck, req.user._id, board) ? next() : res.status(401).send("Unauthorized")
}

checkRightsFromCard = (toCheck, idIsInBody = false) => async (req, res, next) => {
    cardId = idIsInBody ? req.body.cardId : req.params.cardId
    const card = await CardsController.getCardById(cardId).catch(err => res.status(400).send("Card not found"))
    const board = await BoardController.getBoardById(card.board).catch(err => res.status(400).send("Board not found"))
    checkRights(toCheck, req.user._id, board) ? next() : res.status(401).send("Unauthorized")
}

checkRightsFromList = (toCheck, idIsInBody = false) => async (req, res, next) => {
    listId = idIsInBody ? req.body.listId : req.params.listId
    const list = await ListsController.getById(listId).catch(err => res.status(400).send("List not found"))
    const board = await BoardController.getBoardById(list.board).catch(err => res.status(400).send("Board not found"))
    checkRights(toCheck, req.user._id, board) ? next() : res.status(401).send("Unauthorized")
}

checkRightsFromTeam = (toCheck, idIsInBody = false) => async (req, res, next) => {
    teamId = idIsInBody ? req.body.teamId : req.params.teamId
    const team = await TeamsController.getTeamById(teamId).catch(err => res.status(400).send("Team not found"))
    checkRights(toCheck, req.user._id, null, team) ? next() : res.status(401).send("Unauthorized")
}

checkRights = (toCheck, userId, board, team) => {
    for (const atom of toCheck) {
        if (!funcs[atom])
            console.log(`Unknow right to check ${atom}`)
        if (funcs[atom] && !funcs[atom](userId, board, team))
            return false
    }
    return true
}

module.exports = {
    checkRightsFromBoard,
    checkRightsFromCard,
    checkRightsFromList,
    checkRightsFromTeam
};