import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { tokenHeader } from '../config/HeaderHelper'

export default {
    async fetchCard(cardId) {
        try{
            const res = await axios.get(`${UrlConfig.API}/cards/${cardId}`, tokenHeader)
            return res.data
        } catch (e) {
            console.log(e)
            throw e
        }    
    },
    async updateCardNameApi(cardId, name) {
        try {
            const res = await axios.put(`${UrlConfig.API}/cards/${cardId}`, {
                name: name
            }, tokenHeader)
            return res.data
        } catch(error) {
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
        } catch(error) {
            throw error
        }
    }
}