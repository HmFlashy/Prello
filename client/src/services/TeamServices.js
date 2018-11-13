import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { tokenHeader } from '../helpers/HeaderHelper'

export default {
    async addUsersToTeam(teamId, users) {
        try {
            const res = await axios.put(`${UrlConfig.API}/teams/${teamId}`, {
                users: users
            }, tokenHeader())
            return res.data
        } catch(error) {
            throw error
        }
    },
    async getTeam(teamId) {
        try {
            const res = await axios.get(`${UrlConfig.API}/teams/${teamId}`, tokenHeader());
            return res.data
        } catch (error) {
            throw error
        }
    },
    async addTeam(name, creatorId) {
        try {
            const res = await axios.post(`${UrlConfig.API}/teams/`, {
                name: name,
                creator: creatorId
            },
                tokenHeader());
            return res.data
        } catch (error) {
            throw error
        }
    },
    async deleteTeam(teamId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/teams/${teamId}`, tokenHeader());
            return res.data
        } catch (error) {
            throw error
        }
    }
}