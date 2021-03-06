const Board = require("../models/index").Board;
const User = require("../models/index").User;
const Team = require("../models/index").Team;
const UserController = require('./UserController')
const throwError = require("../helper/RequestHelper").throwError;
const logger = require("../../logger")

const addTeam = async (name, creatorId) => {

    try {
        const team = new Team({
            name: name,
            creator: creatorId,
        });
        const savedTeam = await team.save()
        const updatedTeam = await addMember(savedTeam._id, creatorId)
        const finalTeam = await updateTeamMember(updatedTeam._id, creatorId, 'Admin')
        return finalTeam
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const deleteTeam = async (teamId) => {
    try {
        const team = await Team.findById(teamId)
        if(!team) {
            throwError(404, `The team ${teamId} was not found`)
        }
        await team.boards.forEach(board => Board.findOneAndUpdate({ _id: board._id },
            { $pull: { teams: {team:teamId} } }, { "new": true }));   
        await team.members.forEach(member => UserController.deleteTeam(member.member, teamId))
        return await team.remove();
    } catch (error) {
        logger.error(error.message)
        throw error;
    }
}


const addMember = async (teamId, memberId) => {
    try {
        const team = await Team.findOneAndUpdate({ _id: teamId },
            { $push: { members: {member: memberId} } }, { "new": true })
        await User.findOneAndUpdate({ _id: memberId },
            { $push: { teams: {team:teamId} } }, { "new": true })
        return team
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const deleteMember = async (teamId, memberId) => {
    try {
        const team = await Team.findOneAndUpdate({ _id: teamId },
            { $pull: { members: {member: memberId} } }, { "new": true })
        await User.findOneAndUpdate({ _id: memberId },
            { $pull: { teams: {team:teamId} } }, { "new": true })
        return team
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const addBoard = async (teamId, boardId) => {
    try {
        const team = await Team.findOneAndUpdate({ _id: teamId },
            { $push: { boards: boardId} }, { "new": true })
        await Board.findOneAndUpdate({ _id: boardId },
            { $push: { teams: teamId } }, { "new": true })
        return team
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const deleteBoard = async (teamId, boardId) => {
    try {
        const team = await Team.findOneAndUpdate({ _id: teamId },
            { $pull: { boards: boardId} }, { "new": true })
        await Board.findOneAndUpdate({ _id: boardId },
            { $pull: { teams: teamId } }, { "new": true })
        return team
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const updateTeamMember = async (teamId, memberId, role) => {
    try {
        const team = await Team.findById({_id: teamId})
        let memberUpdated = await team.members.map(mem => mem.member.toString() === memberId? {member: mem.member, role} : {member: mem.member, role: mem.role})
        const finalTeam = await Team.findOneAndUpdate({_id: teamId}, { $set: { members: memberUpdated } }, { "new": true })
        const member = await User.findById({_id: memberId})
        let teamUpdated = await member.teams.map(tea => tea.team.toString() === teamId.toString()? {team: tea.team, role} : {team: tea.team, role: tea.role})
        await User.findOneAndUpdate({_id: memberId}, { $set: { teams: teamUpdated } }, { "new": true })
        return finalTeam
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}

const getTeamById = async (teamId) => {
    try {
        const team = await Team.findById(teamId).populate({
            path: "members.member",
            select: ["fullName", "username", "initials", "_id", "bio"]
        })
        if(!team){
            throwError(404, "Team not found")
        }
        return team;
    } catch (error) {
        logger.error(error.message)
        throw error
    }
};
const getTeamsBySearch = async (boardId, query) => {
    try {
        const board = await Board.findById(boardId);
        if (!board) {
            throwError(404, "Board not found")
        }
        const teams = await Team.find({
            $and: [
                {
                    "_id": {$nin: board.teams.map(boardTeam => boardTeam._id)}
                }, {"name": {$regex: `.*${query}*.`, $options: "i"}}

            ]
        }).sort({"name": 1}).limit(10);
        return teams
    } catch (error) {
        logger.error(error.message)
        throw error
    }
}



const updateTeam = async (teamId, data) => {
    try {
        return await Team.findOneAndUpdate({ _id: teamId }, { $set: data }, { "new": true })
    } catch (error) {
        logger.error(error.message)
        throw error
    }

}
module.exports = {
    addTeam,
    deleteTeam,
    addMember,
    deleteMember,
    addBoard,
    deleteBoard,
    updateTeamMember,
    getTeamById,
    updateTeam,
    getTeamsBySearch
};