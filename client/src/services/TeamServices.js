import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { tokenHeader } from '../helpers/HeaderHelper'

export default {
    async addUsersToTeam(teamId, users) {
        try {
            return await users.forEach(user => axios.post(`${UrlConfig.API}/teams/${teamId}/members/${user._id}`, null, tokenHeader()))
        } catch(error) {
            console.log(error)
            throw error
        }
    },
    async getTeam(teamId) {
        try {
            const res = await axios.get(`${UrlConfig.API}/teams/${teamId}`, tokenHeader());
            return res.data
        } catch (error) {
            console.log(error)
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
            console.log(error)
            throw error
        }
    },
    async deleteTeam(teamId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/teams/${teamId}`, tokenHeader());
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async deleteMember(teamId, memberId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/teams/${teamId}/members/${memberId}`, tokenHeader());
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async updateMember(teamId, memberId, role) {
        try {
            const res = await axios.put(`${UrlConfig.API}/teams/${teamId}/members/${memberId}`, {role}, tokenHeader());
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}