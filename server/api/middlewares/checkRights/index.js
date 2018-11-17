const TeamsController = require("../../controllers/TeamsController");
const BoardController = require("../../controllers/BoardsController");
const CardsController = require("../../controllers/CardsController");
const ListsController = require("../../controllers/ListsController");
const throwError = require("../../helper/RequestHelper").throwError;
const logger = require("../../../logger")

const inBoard = (userId, board, team, method) => {
    if (method === "GET" && board.visibility === "Public")
        return true
    else
        return board.members.some(member => member.member._id.toString() === userId.toString())
}

const isBoardAdmin = (userId, board, team) => {
    return board.members.some(member => member.member._id.toString() === userId.toString() && member.role === "Admin")
}

const inTeam = (userId, board, team) => {
    return team.members.some(member => member.member._id.toString() === userId.toString())
}

const isTeamAdmin = (userId, board, team) => {
    return team.members.some(member => member.member._id.toString() === userId.toString() && member.role === "Admin")
}

const funcs = {
    "in:Board": inBoard,
    "status:Board:Admin": isBoardAdmin,
    "in:Team": inTeam,
    "status:Team:Admin": isTeamAdmin
}

const checkRightsFromBoard = (toCheck, idIsInBody = false) => async (req, res, next) => {
    try {
        const boardId = idIsInBody ? req.body.boardId : req.params.boardId
        if (!boardId) {
            throwError(400, "Missing boardId parameter")
        } else if (!boardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The boardId ${boardId} is malformed`)
        }
        const board = await BoardController.getBoardById(boardId).catch(err => throwError(404, "Board not found"))
        checkRights(toCheck, req.user._id, board, null, req.method) ? next() : throwError(403, "Unauthorized")
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}

const checkRightsFromCard = (toCheck, idIsInBody = false) => async (req, res, next) => {
    try {
        const cardId = idIsInBody ? req.body.cardId : req.params.cardId
        if (!cardId) {
            throwError(400, "Missing cardId parameter")
        } else if (!cardId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The cardId ${cardId} is malformed`)
        }
        const card = await CardsController.getCardById(cardId).catch(err => throwError(404, "Card not found"))
        const board = await BoardController.getBoardById(card.board).catch(err => throwError(404, "Board not found"))
        checkRights(toCheck, req.user._id, board, null, req.method) ? next() : throwError(403, "Unauthorized")
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}

const checkRightsFromList = (toCheck, idIsInBody = false) => async (req, res, next) => {
    try {
        const listId = idIsInBody ? req.body.listId : req.params.listId
        if (!listId) {
            throwError(400, "Missing listId parameter")
        } else if (!listId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The listId ${listId} is malformed`)
        }
        const list = await ListsController.getById(listId).catch(err => throwError(404, "List not found"))
        const board = await BoardController.getBoardById(list.board).catch(err => throwError(404, "Board not found"))
        checkRights(toCheck, req.user._id, board, null, req.method) ? next() : throwError(403, "Unauthorized")
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}

const checkRightsFromTeam = (toCheck, idIsInBody = false) => async (req, res, next) => {
    try {
        const teamId = idIsInBody ? req.body.teamId : req.params.teamId
        if (!teamId.match(/^[0-9a-fA-F]{24}$/)) {
            throwError(400, `The teamId ${teamId} is malformed`)
        }
        const team = await TeamsController.getTeamById(teamId).catch(err => throwError(404, "Team not found"))
        checkRights(toCheck, req.user._id, null, team, req.method) ? next() : throwError(403, "Unauthorized")
    } catch (error) {
        logger.error(error.message)
        if (error.code) {
            return res.status(error.code).json(error.message)
        } else {
            return res.sendStatus(500);
        }
    }
}

const checkRights = (toCheck, userId, board, team, method) => {
    for (const atom of toCheck) {
        if (!funcs[atom])
            logger.error(`Unknow right to check ${atom}`)
        if (funcs[atom] && !funcs[atom](userId, board, team, method))
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