const Team = require('../models/index').Team;
const throwError = require('../helper/RequestHelper').throwError;

const getTeamById = async (teamId) => {
    try {
        const team = await Team.findById(teamId).populate({
            path: "members.member",
            select: ["fullName", "username", "initials"]
        });
        if(!team){
            throwError(404, "Team not found")
        }
        return team;
    } catch (error) {
        throw error
    }
};

module.exports = {
    getTeamById
};