const Board = require("../models/index").Board;
const User = require("../models/index").User;
const Team = require("../models/index").Team;
const Category = require("../models/index").Category;
const ListsController = require("./ListsController")
const throwError = require("../helper/RequestHelper").throwError;
const mongoose = require("mongoose");

const getBoardById = async (boardId) => {
    try {
        const board = await Board.findById(boardId).populate(
            [{
                path: "lists",
                select: ["_id", "name", "creator", "isArchived", "listInformation",
                    "activities", "pos"],
                populate: {
                    path: "cards",
                    select: ["_id", "name", "dueDate", "dueDateCompleted",
                        "isArchived", "labels", "members", "pos", "cardInformation",
                        "creator", "watchers", "pos", "activities"],
                    populate: ["labels",
                        {
                            path: "members",
                            select: ["_id", "name", "email", "fullName", "initials", "username", "bio"]
                        }
                    ]
                }
            },
                {
                    path: "members.member",
                    select: ["_id", "name", "email", "fullName", "initials", "username",
                        "organization", "teams", , "bio"],
                    populate: {
                        path: "teams.team",
                        select: ["_id", "name"]
                    }
                },
                {
                    path: "teams",
                    select: ["_id", "name", "members"],
                    populate: {
                        path: "members.member",
                        select: ["_id", "role", "name", "email", "fullName", "initials", "username",
                            "organization", "teams", "bio"],
                    }
                }, {
                path: "owner",
                select: ["_id"]
            }, {
                path: "activities"
            },
                {
                    path: "labels"
                },
                {
                    path: "polls",
                    populate: {
                        path: "card",
                        select: ["_id", "name"]
                    }
                },
                {
                    path: "polls",
                    populate: {
                        path: "options.voters",
                        select: ["_id", "fullName"]
                    }
                },

            ]);
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return board
    } catch (error) {
        throw error
    }
};

const getBoardForExport = async (boardId) => {
    try {
        const board = await Board.findById(boardId).populate(
            [{
                path: "lists",
                select: ["_id", "name", "isArchived", "pos", "board"],
                populate: {
                    path: "cards",
                    select: ["_id", "desc", "attachments", "checklists", "comments", "name", "dueDate",
                        "dueDateCompleted",
                        "isArchived", "members", "list"],
                    populate: {
                        path: "labels",
                        select: ["_id", "name", "color"]
                    }
                }
            },
                {
                    path: "members.member",
                    select: ["_id", "name", "email", "fullName", "initials", "username",
                        "organization", "teams", , "bio"],
                    populate: {
                        path: "teams.team",
                        select: ["_id", "name"]
                    }
                },
                {
                    path: "teams",
                    select: ["_id", "name", "members"],
                    populate: {
                        path: "members.member",
                        select: ["_id", "role", "name", "email", "fullName", "initials", "username",
                            "organization", "teams", "bio"],
                    }
                }, {
                path: "owner",
                select: ["_id"]
            }, {
                path: "activities"
            },
                {
                    path: "labels"
                }
            ]);
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return board
    } catch (error) {
        throw error
    }
};

const getBoards = async (user) => {
    try {
        const boards = await Board.find({"members.member": {$in: [user._id]}}).select({
            _id: 1, name: 1, boardInformation: 1, starred: 1, teams: 1, visibility: 1
        });
        return boards
    } catch (error) {
        throw error
    }
};

const getBoardsInfo = async (boardId) => {
    try {
        const boards = await Board.find({_id: boardId}).populate([{
            path: "lists",
            select: ["name"],
            populate: {
                path: "cards",
                select: ["pos"],
            }
        }]).select(["_id", "name"]);
        if (boards && boards[0]) {
            return {
                _id: boards[0]._id,
                name: boards[0].name,
                lists: boards[0].lists.map(list => {
                    return {
                        name: list.name,
                        _id: list._id,
                        cards: list.cards.map(card => card.pos)
                    }
                })
            }
        }
        return boards
    } catch (error) {
        throw error
    }
};

const addBoard = async (name, visibility, teamId, userId, categoryId) => {
    let newBoard = null;
    let user = null;
    let team = null;
    try {
        user = await User.findById(userId);
        if (!user) {
            throwError(404, `The user ${userId} was not found`)
        }
        const category = await Category.findById(categoryId);
        if (categoryId) {
            if (!category) throwError(404, `The category ${categoryId} was not found`);
            if (!user.categories.find(userCategory => userCategory._id.toString() === category._id.toString())) {
                throwError(400, `The category ${categoryId} doesn't belong to the user`)
            }
        }

        if (teamId) {
            team = await Team.findById(teamId);
            if (!team) {
                throwError(404, `The team ${teamId} was not found`)
            }
            const board = await Board.create({
                name: name,
                visibility: visibility,
                owner: user._id,
                members: [{member: user._id, role: "Admin"}]
            });
            newBoard = await addBoardTeam(board._id, teamId);
        } else {
            newBoard = await Board.create({
                name: name,
                visibility: visibility,
                owner: user._id,
                members: [{member: user._id, role: "Admin"}]
            });
        }
        await User.updateOne({_id: user._id}, {
            $push: {
                boards: {
                    board: newBoard._id,
                    role: "Admin",
                    category: category
                }
            }
        });
        return newBoard;
    } catch (error) {
        try {
            if (team) await team.save();
            if (user) await user.save();
            if (newBoard) await newBoard.remove();
        } catch (error) {
            console.log("DB corrupted !!!");
            throw error;
        }
        throw error
    }
};

const updateBoard = async (boardId, data) => {
    try {
        return await Board.findOneAndUpdate({_id: boardId}, {$set: data}, {"new": true})
    } catch (error) {
        throw error
    }
}

const addLabel = async (boardId, label) => {
    try {
        await Board.findOneAndUpdate({_id: boardId},
            {$push: {labels: label}}, {"new": true})
    } catch (error) {
        throw error
    }
}
const removeLabel = async (boardId, labelId) => {
    try {
        const board = await Board.findOneAndUpdate({_id: boardId},
            {$pull: {labels: labelId}}, {"new": true})
        const boardLists = board.lists
        boardLists.forEach(boardList => ListsController.removeLabel(boardList._id, labelId))
    } catch (error) {
        throw error
    }
}

const addBoardMember = async (boardId, userId) => {
    try {
        if (await Board.findOne({$and: [{_id: boardId}, {"members.member": {$in: [userId]}}]})) {
            throwError(400, `The user ${userId} is already in the board`)
        }

        const user = await User.findOneAndUpdate({_id: userId}, {
            $push:
                {boards: {board: boardId, role: "Member"}}
        }, {new: true});
        if (!user) {
            throwError(404, `The user ${userId} was not found`)
        }

        const board = await Board.findOneAndUpdate({_id: boardId}, {
            $push: {
                members:
                    {member: user._id, role: "Member"}
            },
            $inc: {"boardInformation.nbMembers": 1}
        }, {new: true}).populate({
            path: "members.member",
            select: ["fullName", "username", "email", "_id", "bio"]
        });
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return board;
    } catch (error) {
        throw error
    }
};

const addBoardTeam = async (boardId, teamId) => {
    try {
        if (await Board.find({$and: [{"teams": {$in: [teamId]}}, {_id: boardId}]}).limit(1).length>0) {
            throwError(400, `The team already exists in the board`)
        }
        const team = await Team.findOneAndUpdate({_id: teamId}, {
            $push:
                {boards: boardId}
        }, {new: true});
        if (!team) {
            throwError(404, `The team ${teamId} was not found`)
        }

        const board = await Board.findById(boardId);
        if (!await Board.findById(boardId)) {
            throwError(404, `The board ${boardId} was not found`)
        }

        let array = []
        team.members.forEach(async teamMember => {
            if (!(board.members.map(boardMember => boardMember.member.toString()).includes(teamMember.member.toString()))) {
                array.push(User.findOneAndUpdate({$and: [{"_id": teamMember.member}, {"boards.board": {$nin: [boardId]}}]}, {
                    $push:
                        {boards: {board: boardId, role: "Member"}}
                }));
                array.push(Board.findOneAndUpdate({_id: boardId}, {
                    $push: {
                        members: {member: teamMember.member, role: "Member"}
                    },
                    $inc: {"boardInformation.nbMembers": 1}
                }))
            }
        });

        return await Promise.all(array).then(async () => {
                const boardUpdated = await
                    Board.findOneAndUpdate({_id: boardId}, {
                        $push: {
                            teams: team._id
                        }
                    }, {new: true}).populate([{
                        path: "teams",
                        select: ["_id", "name"]
                    },
                        {
                            path: "members.member",
                            select: ["_id", "fullName", "username", "bio", "initials"]
                        }]);
                return boardUpdated
            }
        ).catch(error => { throw error })
    } catch (error) {
        throw error
    }
};

const deleteBoardTeam = async (boardId, teamId) => {
    try {
        const team = await Team.findOneAndUpdate({_id: teamId}, {
            $pull:
                {boards: boardId}
        }, {new: true});
        if (!team) {
            throwError(404, `The team ${teamId} was not found`)
        }
        const board = await Board.findOneAndUpdate({_id: boardId}, {
            $pull: {
                teams: team._id
            }
        }, {new: true});
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return board;
    } catch (error) {
        throw error
    }
};

const deleteBoardMember= async (boardId, userId) => {
    try {
        const user = await User.findOneAndUpdate({_id: userId}, {
            $pull:
                {boards: {board: boardId}}
        }, {new: true});
        if (!user) {
            throwError(404, `The user ${userId} was not found`)
        }
        const board = await Board.findOneAndUpdate({_id: boardId}, {
            $pull: {
                members: {member: userId}
            }
        }, {new: true});
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        return board;
    } catch (error) {
        throw error
    }
};

const deleteBord = async (boardId) => {
    try {
        const board = await Board.findById(boardId);
        if (!board) {
            throwError(404, `The board ${boardId} was not found`)
        }
        // if (!board.isClosed) {
        //     throwError(400, `Can't delete a board not closed`)
        // }
        board.remove()

        return board;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getBoardById,
    getBoards,
    addBoard,
    addLabel,
    removeLabel,
    addBoardTeam,
    deleteBoardTeam,
    addBoardMember,
    deleteBord,
    updateBoard,
    getBoardsInfo,
    getBoardForExport,
    deleteBoardMember
};