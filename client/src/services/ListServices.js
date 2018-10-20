import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { tokenHeader } from '../config/HeaderHelper'

export default {
    async updateListNameApi(listId, newName) {
        try {
            const res = await axios.put(`${UrlConfig.API}/lists/${listId}`, {
                name: newName
            }, tokenHeader );
            return res.data
        } catch (err) {
            console.log(err);
            throw err
        }
    },
    async addListApi(name){
        try {
            const res = await axios.post(`${UrlConfig.API}/lists`, {
                name: name
            }, tokenHeader)
            return res.data
        } catch(error) {
            throw error
        }
    }
}