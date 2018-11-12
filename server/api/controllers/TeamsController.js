const Board = require("../models/index").Board;
const User = require("../models/index").User;
const Team = require("../models/index").Team;
const BoardsController = require('./BoardsController')
const UserController = require('./UserController')
const throwError = require("../helper/RequestHelper").throwError;
const mongoose = require("mongoose");

const addTeam = async (name, creatorId) => {

    try {
        const team = new Team({
            name: name,
            creator: creatorId
        });
        const savedTeam = await team.save()
        return savedTeam
    } catch (error) {
        throw error
    }
}

const deleteTeam = async (teamId) => {
    let session = null
    try {
        session = await mongoose.startSession()
        session.startTransaction();
        const team = await Team.findById(teamId)
        if(!team) {
            throwError(404, `The team ${teamId} was not found`)
        }
        // await BoardsController.removeTeam(teamId); 
        // await UserController.removeTeam(teamId);       
        await session.commitTransaction();
        session.endSession();
        return await team.remove();
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}


const addToArray = async (teamId, key, data) => {
    try {
        return await Team.findOneAndUpdate({ _id: teamId },
            { $push: { [key]: data } }, { "new": true })
    } catch (error) {
        throw error
    }
}

const removeToArray = async (teamId, key, data) => {
    try {
        console.log(data)
        return await Team.findOneAndUpdate({ _id: teamId },
            { $pull: { [key]: data } }, { "new": true })
    } catch (error) {
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
        throw error
    }
};
module.exports = {
    addTeam,
    deleteTeam,
    addToArray,
    removeToArray,
    getTeamById
};