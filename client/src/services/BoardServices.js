import axios from 'axios'
import UrlConfig from '../config/UrlConfig'
import { tokenHeader } from '../config/HeaderHelper'

export default {
    async fetchBoard(boardId) {
        try{
            const res = await axios.get(`${UrlConfig.API}/boards/${boardId}`, tokenHeader)
            return res.data
        } catch (e) {
            console.log(e)
            throw e
        }    
    },
    async fetchBoards() {
        try{
            const res = await axios.get(`${UrlConfig.API}/boards`, tokenHeader)
            return res.data
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}