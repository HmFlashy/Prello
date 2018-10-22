const db = require('../models');
const mongoose = require('mongoose');

module.exports = {
    async getTeamById(id) {
        try {
            const team = await db.Team.findById(id).populate({
                path: 'users'
                }
              });
            return team
        } catch(error) {
            throw error
        }
    },
    async getTeams() {
        try {
            const teams = await db.Team.find({})
            return teams
        } catch(error) {
            throw error
        }
    }
}
