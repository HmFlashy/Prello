import axios from 'axios'
import UrlConfig from '../config/UrlConfig'

export default {
    async getCardByIdApi(cardId) {
        try{
            const res = await axios.get(`${UrlConfig.API}/cards/${cardId}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
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
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
            return res.data
        } catch(error) {
            throw error
        }
    } 
}