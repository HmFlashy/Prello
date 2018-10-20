import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { tokenHeader } from '../config/HeaderHelper'

export default {
    async fetchBoard(boardId) {
        try{
            console.log(tokenHeader)
            const res = await axios.get(`${UrlConfig.API}/boards/${boardId}`, tokenHeader)
            return res.data
        } catch (e) {
            console.log(e)
            throw e
        }    
    }
}