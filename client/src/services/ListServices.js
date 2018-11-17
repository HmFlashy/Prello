import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { tokenHeader } from '../helpers/HeaderHelper'

export default {
    async updateListApi(listId, data) {
        try {
            const res = await axios.put(`${UrlConfig.API}/lists/${listId}`, data, tokenHeader());
            return res.data
        } catch (err) {
            console.log(err);
            throw err
        }
    },
    async addListApi(name, boardID, pos) {
        try {
            const res = await axios.post(`${UrlConfig.API}/lists`, {
                name: name,
                boardId: boardID,
                pos: pos
            }, tokenHeader());
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async moveListApi(listId, pos) {
        try {
            const res = await axios.put(`${UrlConfig.API}/lists/${listId}`, {
                pos
            }, tokenHeader());
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    async deleteListApi(listId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/lists/${listId}`, tokenHeader());
            return res.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}