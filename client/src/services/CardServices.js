import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { tokenHeader } from '../config/HeaderHelper'
import CheckList from '../components/App/Card/CardDetail/SubComponents/CheckList';

export default {
    async fetchCard(cardId) {
        try {
            const res = await axios.get(`${UrlConfig.API}/cards/${cardId}`, tokenHeader)
            return res.data
        } catch (e) {
            throw e
        }
    }, async updateCardApi(cardId, toUpdate) {
        try {
            const res = await axios.put(`${UrlConfig.API}/cards/${cardId}`, toUpdate, tokenHeader)
            return res.data
        } catch (error) {
            throw error
        }
    },
    async addCardApi(name, listId) {
        try {
            const res = await axios.post(`${UrlConfig.API}/cards`, {
                name: name,
                listId: listId
            }, tokenHeader)
            return res.data
        } catch (error) {
            throw error
        }
    }
    ,
    async createChecklist(cardId, data) {
        try {
            const res = await axios.post(`${UrlConfig.API}/cards/${cardId}/checklists`, {
                name: data.name
            }, tokenHeader)
            return res.data
        } catch (error) {
            throw error
        }
    },
    async deleteChecklist(cardId, checkListId) {
        try {
            const res = await axios.delete(`${UrlConfig.API}/cards/${cardId}/checklists/${checkListId}`, {
            }, tokenHeader)
            return res.data
        } catch (error) {
            throw error
        }
    },
    async updateChecklist(cardId, checkListId, data) {
        try {
            const res = await axios.put(`${UrlConfig.API}/cards/${cardId}/checklists/${checkListId}`, {
                name: data.name
            }, tokenHeader)
            return res.data
        } catch (error) {
            throw error
        }
    }
}