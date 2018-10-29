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
    }
}